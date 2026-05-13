<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { appState } from '$lib/store.svelte';
    import { base } from '$app/paths';
    
    function formatCurrency(value: number) {
		if (isNaN(value) || value === null) return '$--';
		return '$' + Math.round(value).toLocaleString('en-US');
	}
    
    function formatPct(value: number) {
        if (isNaN(value) || value === null) return '--%';
        const sign = value > 0 ? '+' : '';
        return sign + value.toFixed(1) + '%';
    }

    let projectionData = $derived.by(() => {
        const data = appState.projectionData;
        let cumulative = 0;
        let prevTotal = 0;
        
        return data.map((row: any, index: number) => {
            cumulative += row.totalAnnual;
            let yoy = 0;
            if (index > 0 && prevTotal > 0) {
                yoy = ((row.totalAnnual - prevTotal) / prevTotal) * 100;
            }
            prevTotal = row.totalAnnual;
            return { ...row, yoy };
        });
    });

    let summary = $derived(appState.summary);
    
    let firstYear = $derived(projectionData.length > 0 ? projectionData[0].year : 0);
    let lastYear = $derived(projectionData.length > 0 ? projectionData[projectionData.length - 1].year : 0);
    
    let annualYears = $derived(projectionData.filter((r: any) => !r.isOneOff));
    let totalCost = $derived(projectionData.reduce((sum: number, r: any) => sum + r.totalAnnual, 0));
    let avgCost = $derived(annualYears.length > 0 ? totalCost / annualYears.length : 0);
    
    let peakVal = $derived(Math.max(...annualYears.map((r: any) => r.totalAnnual), 0));
    let peakYear = $derived(annualYears.find((r: any) => r.totalAnnual === peakVal)?.year || 0);

    function handleExport() {
        const dataStr = JSON.stringify(appState.data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'child-cost-calculator-export.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
</script>

<div class="max-w-[1200px] mx-auto px-5 pt-8 pb-10">
    <header class="mb-8">
        <h1 class="flex items-center gap-3 mb-2 font-serif font-bold">
            <i class="fas fa-table text-primary"></i>
            {$_('results.projection.title')}
        </h1>
        <p class="text-[0.9375rem] md:text-[1rem] text-text-secondary">{$_('results.projection.subtitle')}</p>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mt-7">
            <div class="bg-card-bg border border-border rounded-lg p-4 md:p-6 text-center shadow transition-all hover:-translate-y-[2px] hover:shadow-lg">
                <div class="font-sans text-[0.7rem] md:text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-text-secondary mb-2">{$_('results.projection.totalCost')}</div>
                <div class="font-serif text-[1.4rem] md:text-[1.75rem] font-bold text-text leading-[1.2]">{formatCurrency(summary.totalCost)}</div>
            </div>
            <div class="bg-card-bg border border-border rounded-lg p-4 md:p-6 text-center shadow transition-all hover:-translate-y-[2px] hover:shadow-lg">
                <div class="font-sans text-[0.7rem] md:text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-text-secondary mb-2">{$_('results.projection.initialInvestment')}</div>
                <div class="font-serif text-[1.4rem] md:text-[1.75rem] font-bold text-primary leading-[1.2]">{formatCurrency(summary.requiredInvestment)}</div>
            </div>
            <div class="bg-card-bg border border-border rounded-lg p-4 md:p-6 text-center shadow transition-all hover:-translate-y-[2px] hover:shadow-lg">
                <div class="font-sans text-[0.7rem] md:text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-text-secondary mb-2">{$_('results.projection.projectionYears')}</div>
                <div class="font-serif text-[1.4rem] md:text-[1.75rem] font-bold text-accent leading-[1.2]">{$_('results.table.year')} {firstYear} &mdash; {$_('results.table.year')} {lastYear}</div>
            </div>
        </div>
    </header>

    <!-- Action Bar -->
    <div class="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 my-6">
        <a href="{base}/" class="btn btn-secondary flex justify-center">
            <i class="fas fa-arrow-left"></i> {$_('results.projection.backToCalculator')}
        </a>
        <button class="btn btn-primary flex justify-center" onclick={handleExport}>
            <i class="fas fa-file-export"></i> {$_('actions.exportJson')}
        </button>
    </div>

    <!-- Settings Display -->
    <div class="bg-card-bg border border-border rounded-lg px-6 py-3.5 mb-6 flex flex-wrap gap-6 items-center shadow">
        <div class="flex items-center gap-2 text-[0.85rem] text-text-secondary">
            <i class="fas fa-chart-line text-primary w-4 text-center"></i>
            <span>{$_('results.projection.inflationRate')}:</span>
            <span class="font-semibold text-text ml-0.5">{appState.data.settings.inflationRate}%</span>
        </div>
        <div class="flex items-center gap-2 text-[0.85rem] text-text-secondary">
            <i class="fas fa-percentage text-primary w-4 text-center"></i>
            <span>{$_('results.projection.expectedReturn')}:</span>
            <span class="font-semibold text-text ml-0.5">{appState.data.settings.irr}%</span>
        </div>
        <div class="flex items-center gap-2 text-[0.85rem] text-text-secondary">
            <i class="fas fa-user-graduate text-primary w-4 text-center"></i>
            <span>{$_('results.projection.masterIncluded')}:</span>
            <span class="font-semibold text-text ml-0.5">{appState.data.settings.includeMaster ? 'Yes' : 'No'}</span>
        </div>
        <div class="flex items-center gap-2 text-[0.85rem] text-text-secondary">
            <i class="fas fa-sliders-h text-primary w-4 text-center"></i>
            <span>{$_('results.projection.profile')}:</span>
            <span class="font-semibold text-text ml-0.5 capitalize">{appState.data.settings.activeProfile || $_('results.projection.none')}</span>
        </div>
    </div>

    <!-- Main Projection Table -->
    <section class="bg-card-bg border border-border rounded-lg shadow overflow-hidden mb-8">
        <div class="overflow-x-auto max-h-[70vh] relative">
            <table class="w-full border-collapse text-[0.88rem] relative border-spacing-0">
                <thead>
                    <tr>
                        <th class="sticky top-0 z-10 bg-text text-white font-sans font-semibold text-[0.78rem] uppercase tracking-[0.05em] py-3.5 px-4 text-left border-b-2 border-border whitespace-nowrap">{$_('results.table.year')}</th>
                        <th class="sticky top-0 z-10 bg-text text-white font-sans font-semibold text-[0.78rem] uppercase tracking-[0.05em] py-3.5 px-4 text-left border-b-2 border-border whitespace-nowrap">{$_('results.table.age')}</th>
                        <th class="sticky top-0 z-10 bg-text text-white font-sans font-semibold text-[0.78rem] uppercase tracking-[0.05em] py-3.5 px-4 text-left border-b-2 border-border whitespace-nowrap">{$_('results.table.lifeStage')}</th>
                        <th class="sticky top-0 z-10 bg-text text-white font-sans font-semibold text-[0.78rem] uppercase tracking-[0.05em] py-3.5 px-4 text-right border-b-2 border-border whitespace-nowrap">{$_('results.table.monthlyEssentials')}</th>
                        <th class="sticky top-0 z-10 bg-text text-white font-sans font-semibold text-[0.78rem] uppercase tracking-[0.05em] py-3.5 px-4 text-right border-b-2 border-border whitespace-nowrap">{$_('results.table.monthlyDevCare')}</th>
                        <th class="sticky top-0 z-10 bg-text text-white font-sans font-semibold text-[0.78rem] uppercase tracking-[0.05em] py-3.5 px-4 text-right border-b-2 border-border whitespace-nowrap">{$_('results.table.monthlyLifestyle')}</th>
                        <th class="sticky top-0 z-10 bg-text text-white font-sans font-semibold text-[0.78rem] uppercase tracking-[0.05em] py-3.5 px-4 text-right border-b-2 border-border whitespace-nowrap">{$_('results.table.yearlyOneOff')}</th>
                        <th class="sticky top-0 z-10 bg-text text-white font-sans font-semibold text-[0.78rem] uppercase tracking-[0.05em] py-3.5 px-4 text-right border-b-2 border-border whitespace-nowrap">{$_('results.table.homeRelated')}</th>
                        <th class="sticky top-0 z-10 bg-text text-white font-sans font-semibold text-[0.78rem] uppercase tracking-[0.05em] py-3.5 px-4 text-right border-b-2 border-border whitespace-nowrap">{$_('results.table.car')}</th>
                        <th class="sticky top-0 z-10 bg-text text-white font-sans font-semibold text-[0.78rem] uppercase tracking-[0.05em] py-3.5 px-4 text-right border-b-2 border-border whitespace-nowrap">{$_('results.table.totalAnnual')}</th>
                        <th class="sticky top-0 z-10 bg-text text-white font-sans font-semibold text-[0.78rem] uppercase tracking-[0.05em] py-3.5 px-4 text-right border-b-2 border-border whitespace-nowrap">{$_('results.table.cumulative')}</th>
                        <th class="sticky top-0 z-10 bg-text text-white font-sans font-semibold text-[0.78rem] uppercase tracking-[0.05em] py-3.5 px-4 text-right border-b-2 border-border whitespace-nowrap">{$_('results.table.yoyChange')}</th>
                    </tr>
                </thead>
                <tbody>
                    {#each projectionData as row, i}
                        <tr class="transition-colors duration-150 {row.isOneOff ? 'bg-accent-light hover:bg-[#FCE8DF]' : 'even:bg-[#F8F7F4] odd:bg-card-bg hover:bg-primary-light'}">
                            <td class="py-3 px-4 border-b border-border text-left font-bold whitespace-nowrap {row.isOneOff ? 'border-t-2 border-t-accent font-semibold' : ''}">
                                {#if row.isOneOff}<i class="fas fa-ring mr-1.5" style="color:{row.stageColor};"></i>{/if}{row.year}
                            </td>
                            <td class="py-3 px-4 border-b border-border text-left text-text-secondary whitespace-nowrap {row.isOneOff ? 'border-t-2 border-t-accent font-semibold text-text' : ''}">{row.age}</td>
                            <td class="py-3 px-4 border-b border-border text-left whitespace-nowrap {row.isOneOff ? 'border-t-2 border-t-accent font-semibold' : ''}">
                                {#if row.isOneOff}
                                    <span class="inline-block px-2.5 py-0.5 rounded-pill bg-accent text-white text-[0.7rem] font-bold uppercase tracking-[0.05em]">{$_('results.table.oneOffLabel')}</span>
                                {:else}
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill text-[0.75rem] font-semibold whitespace-nowrap" style="background-color: {row.stageColor}18; color: {row.stageColor};">
                                        <i class="fas {row.stageIcon} text-[0.7rem]"></i> {appState.data.settings.language === 'zh' ? (appState.data.lifeStages.find((s: any) => s.title === row.lifeStage)?.titleZh || row.lifeStage) : row.lifeStage}
                                    </span>
                                {/if}
                            </td>
                            <td class="py-3 px-4 border-b border-border text-right text-text tabular-nums whitespace-nowrap {row.isOneOff ? 'border-t-2 border-t-accent font-semibold' : ''}">{formatCurrency(row.breakdown.essentials / 12)}</td>
                            <td class="py-3 px-4 border-b border-border text-right text-text tabular-nums whitespace-nowrap {row.isOneOff ? 'border-t-2 border-t-accent font-semibold' : ''}">{formatCurrency(row.breakdown.devCare / 12)}</td>
                            <td class="py-3 px-4 border-b border-border text-right text-text tabular-nums whitespace-nowrap {row.isOneOff ? 'border-t-2 border-t-accent font-semibold' : ''}">{formatCurrency(row.breakdown.lifestyle / 12)}</td>
                            <td class="py-3 px-4 border-b border-border text-right text-text tabular-nums whitespace-nowrap {row.isOneOff ? 'border-t-2 border-t-accent font-semibold' : ''}">{formatCurrency(row.breakdown.oneOff)}</td>
                            <td class="py-3 px-4 border-b border-border text-right text-text tabular-nums whitespace-nowrap {row.isOneOff ? 'border-t-2 border-t-accent font-semibold' : ''}">{formatCurrency(row.mortgage)}</td>
                            <td class="py-3 px-4 border-b border-border text-right text-text tabular-nums whitespace-nowrap {row.isOneOff ? 'border-t-2 border-t-accent font-semibold' : ''}">{formatCurrency(row.car)}</td>
                            <td class="py-3 px-4 border-b border-border text-right tabular-nums whitespace-nowrap font-bold text-[0.95rem] bg-primary/5 {row.isOneOff ? 'border-t-2 border-t-accent font-semibold' : ''}">{formatCurrency(row.totalAnnual)}</td>
                            <td class="py-3 px-4 border-b border-border text-right tabular-nums whitespace-nowrap text-text-secondary font-medium {row.isOneOff ? 'border-t-2 border-t-accent font-semibold' : ''}">{formatCurrency(row.cumulative)}</td>
                            <td class="py-3 px-4 border-b border-border text-right tabular-nums whitespace-nowrap font-semibold {row.yoy > 0.1 ? 'text-danger' : (row.yoy < -0.1 ? 'text-success' : 'text-text-secondary')} {row.isOneOff ? 'border-t-2 border-t-accent font-semibold' : ''}">
                                {i === 0 ? '--' : formatPct(row.yoy)}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    <!-- Summary Footer -->
    <section class="bg-card-bg border border-border rounded-lg p-8 shadow mb-8">
        <div class="font-serif text-[1.25rem] font-bold text-text mb-5 flex items-center gap-2.5">
            <i class="fas fa-chart-pie"></i> {$_('results.projection.summaryTitle')}
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
            <div class="text-center p-4 bg-bg rounded-sm border border-border">
                <div class="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-text-secondary mb-1.5">{$_('results.projection.yearsProjected')}</div>
                <div class="font-serif text-[1.35rem] font-bold text-text">{annualYears.length}</div>
            </div>
            <div class="text-center p-4 bg-bg rounded-sm border border-border">
                <div class="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-text-secondary mb-1.5">{$_('results.projection.totalCost')}</div>
                <div class="font-serif text-[1.35rem] font-bold text-primary">{formatCurrency(totalCost)}</div>
            </div>
            <div class="text-center p-4 bg-bg rounded-sm border border-border">
                <div class="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-text-secondary mb-1.5">{$_('results.projection.avgAnnualCost')}</div>
                <div class="font-serif text-[1.35rem] font-bold text-text">{formatCurrency(avgCost)}</div>
            </div>
            <div class="text-center p-4 bg-bg rounded-sm border border-border">
                <div class="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-text-secondary mb-1.5">{$_('results.projection.peakAnnualCost')}</div>
                <div class="font-serif text-[1.35rem] font-bold text-text">{formatCurrency(peakVal)} <span class="text-[0.8rem] font-sans font-normal">({$_('results.table.year')} {peakYear})</span></div>
            </div>
            <div class="text-center p-4 bg-bg rounded-sm border border-border">
                <div class="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-text-secondary mb-1.5">{$_('results.projection.npvAllCosts')}</div>
                <div class="font-serif text-[1.35rem] font-bold text-text">{formatCurrency(summary.requiredInvestment)}</div>
            </div>
        </div>
    </section>

    <footer class="text-center py-8 text-[0.85rem] text-text-secondary border-t border-border mt-5">
        <p>{$_('footer')}</p>
    </footer>
</div>