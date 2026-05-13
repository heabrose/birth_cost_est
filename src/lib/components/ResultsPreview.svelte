<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { appState } from '$lib/store.svelte';
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
    
    let chartCanvas: HTMLCanvasElement;
    let chart: Chart;
    let showTable = $state(false);
    
    // Watch projectionData changes and update chart
    let projectionData = $derived(appState.projectionData);

    $effect(() => {
        if (chartCanvas && projectionData.length > 0) {
            updateChart();
        }
    });

    function updateChart() {
        const labels = projectionData.map((p: any) => `Y${p.year}`);
        const essentials = projectionData.map((p: any) => p.breakdown.essentials);
        const devCare = projectionData.map((p: any) => p.breakdown.devCare);
        const lifestyle = projectionData.map((p: any) => p.breakdown.lifestyle);
        const oneOff = projectionData.map((p: any) => p.breakdown.oneOff);

        if (chart) {
            chart.data.labels = labels;
            chart.data.datasets[0].label = $_('results.chart.essentials');
            chart.data.datasets[1].label = $_('results.chart.devCare');
            chart.data.datasets[2].label = $_('results.chart.lifestyle');
            chart.data.datasets[3].label = $_('results.chart.oneOff');
            chart.data.datasets[0].data = essentials;
            chart.data.datasets[1].data = devCare;
            chart.data.datasets[2].data = lifestyle;
            chart.data.datasets[3].data = oneOff;
            chart.update();
        } else {
            chart = new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        { label: $_('results.chart.essentials'), data: essentials, backgroundColor: '#5B8C5A', borderRadius: 4 },
                        { label: $_('results.chart.devCare'), data: devCare, backgroundColor: '#6366F1', borderRadius: 4 },
                        { label: $_('results.chart.lifestyle'), data: lifestyle, backgroundColor: '#F59E0B', borderRadius: 4 },
                        { label: $_('results.chart.oneOff'), data: oneOff, backgroundColor: '#D4856A', borderRadius: 4 }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', labels: { usePointStyle: true, padding: 16 } },
                        tooltip: { backgroundColor: 'rgba(45,52,54,0.95)', padding: 12, cornerRadius: 8 }
                    },
                    scales: {
                        x: { stacked: true, grid: { display: false } },
                        y: { stacked: true, beginAtZero: true }
                    },
                    interaction: { mode: 'index', intersect: false }
                }
            });
        }
    }

    function formatCurrency(value: number) {
		if (isNaN(value) || value === null) return '$0';
		return '$' + Math.round(value).toLocaleString('en-US');
	}
</script>

<section class="mb-10">
    <h2 class="font-serif text-[1.35rem] font-bold mb-4 flex items-center gap-2.5">
        <i class="fas fa-chart-bar text-primary"></i> {$_('results.title')}
    </h2>

    <div class="bg-card-bg rounded shadow border border-border p-6 mb-6">
        <div class="h-[400px]">
            <canvas bind:this={chartCanvas}></canvas>
        </div>
    </div>

    <!-- Yearly Breakdown Preview -->
    <div class="bg-card-bg rounded shadow border border-border overflow-hidden">
        <button class="w-full flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-primary-light border-none bg-transparent font-sans text-left font-semibold" onclick={() => showTable = !showTable}>
            <span><i class="fas fa-table mr-2 text-text-secondary"></i> {$_('results.viewDetailedBreakdown')}</span>
            <i class="fas fa-chevron-down text-text-secondary transition-transform duration-200 {showTable ? 'rotate-180' : ''}"></i>
        </button>
        <div class="overflow-hidden transition-all duration-300 ease-in-out {showTable ? 'max-h-[800px] p-6 pt-0' : 'max-h-0'}">
            <div class="overflow-x-auto">
                <table class="w-full border-collapse text-[0.875rem]">
                    <thead>
                        <tr>
                            <th class="text-left py-2.5 px-3 font-semibold text-text-secondary border-b-2 border-border text-[0.75rem] uppercase tracking-[0.5px]">{$_('results.table.year')}</th>
                            <th class="text-left py-2.5 px-3 font-semibold text-text-secondary border-b-2 border-border text-[0.75rem] uppercase tracking-[0.5px]">{$_('results.table.age')}</th>
                            <th class="text-right py-2.5 px-3 font-semibold text-text-secondary border-b-2 border-border text-[0.75rem] uppercase tracking-[0.5px]">{$_('results.table.monthlyEssentials')}</th>
                            <th class="text-right py-2.5 px-3 font-semibold text-text-secondary border-b-2 border-border text-[0.75rem] uppercase tracking-[0.5px]">{$_('results.table.yearlyOneOff')}</th>
                            <th class="text-right py-2.5 px-3 font-semibold text-text-secondary border-b-2 border-border text-[0.75rem] uppercase tracking-[0.5px]">{$_('results.table.mortgage')}</th>
                            <th class="text-right py-2.5 px-3 font-semibold text-text-secondary border-b-2 border-border text-[0.75rem] uppercase tracking-[0.5px]">{$_('results.table.car')}</th>
                            <th class="text-right py-2.5 px-3 font-semibold text-text-secondary border-b-2 border-border text-[0.75rem] uppercase tracking-[0.5px]">{$_('results.table.totalAnnual')}</th>
                            <th class="text-right py-2.5 px-3 font-semibold text-text-secondary border-b-2 border-border text-[0.75rem] uppercase tracking-[0.5px]">{$_('results.table.cumulative')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each projectionData.slice(0, 6) as row}
                            <tr class="hover:bg-primary-light">
                                <td class="py-2.5 px-3 border-b border-border">{$_('results.table.year')} {row.year}</td>
                                <td class="py-2.5 px-3 border-b border-border">{row.age}</td>
                                <td class="py-2.5 px-3 border-b border-border text-right">{formatCurrency(row.breakdown.essentials)}</td>
                                <td class="py-2.5 px-3 border-b border-border text-right">{formatCurrency(row.yearlyOneOff)}</td>
                                <td class="py-2.5 px-3 border-b border-border text-right">{formatCurrency(row.mortgage)}</td>
                                <td class="py-2.5 px-3 border-b border-border text-right">{formatCurrency(row.car)}</td>
                                <td class="py-2.5 px-3 border-b border-border text-right font-semibold">{formatCurrency(row.totalAnnual)}</td>
                                <td class="py-2.5 px-3 border-b border-border text-right font-semibold text-primary">{formatCurrency(row.cumulative)}</td>
                            </tr>
                        {/each}
                        {#if projectionData.length > 0}
                            <tr class="font-bold bg-primary-light border-t-2 border-primary">
                                <td colspan="7" class="text-right py-2.5 px-3">{$_('results.table.cumulativeTotalShown')}</td>
                                <td class="text-right py-2.5 px-3">{formatCurrency(projectionData[Math.min(5, projectionData.length-1)].cumulative)}</td>
                            </tr>
                        {/if}
                    </tbody>
                </table>
            </div>
            <div class="text-center mt-4 flex flex-col gap-4 items-center">
                <p class="text-[0.8125rem] text-text-secondary m-0">{$_('results.table.showingFirst6Years')}</p>
                <a href="/projection" class="btn btn-primary">{$_('results.viewFullProjection')}</a>
            </div>
        </div>
    </div>
</section>