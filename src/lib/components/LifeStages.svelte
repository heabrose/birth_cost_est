<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { appState } from '$lib/store.svelte';
    import type { LifeStage } from '$lib/store.svelte';

    const MONTHLY_CATEGORIES = [
        { key: 'essentials', i18nKey: 'lifeStages.monthlyEssentials', items: ['living', 'meals', 'clothing', 'medical'] },
        { key: 'devcare', i18nKey: 'lifeStages.monthlyDevCare', items: ['care', 'education', 'extraCurriculum'] },
        { key: 'lifestyle', i18nKey: 'lifeStages.monthlyLifestyle', items: ['entertainment'] }
    ];

    let expandedStages = $state([0]);
    
    function toggleAccordion(index: number) {
        if (expandedStages.includes(index)) {
            expandedStages = expandedStages.filter(i => i !== index);
        } else {
            expandedStages = [...expandedStages, index];
        }
    }
</script>

<section class="mb-10">
    <h2 class="font-serif text-[1.35rem] font-bold mb-1 flex items-center gap-2.5">
        <i class="fas fa-layer-group text-primary"></i> {$_('lifeStages.title')}
    </h2>
    <p class="text-[0.875rem] text-text-secondary mb-4">{$_('lifeStages.subtitle')}</p>
    
    <div class="flex flex-col gap-3">
        {#each appState.data.lifeStages as stage, index}
            {@const isExpanded = expandedStages.includes(index)}
            {@const isExcluded = stage.isOptional && !appState.data.settings.includeMaster}
            <div class="bg-card-bg rounded-lg shadow border border-border overflow-hidden transition-shadow duration-200 {isExpanded ? 'expanded' : ''} {isExcluded ? 'opacity-60' : ''} hover:shadow-lg">
                
                <button class="w-full flex items-center gap-3.5 px-6 py-4 cursor-pointer hover:bg-black/5 transition-colors border-none bg-transparent font-sans text-left" onclick={() => toggleAccordion(index)}>
                    <div class="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 text-[1rem]" style="background:{stage.color}15; color:{stage.color};">
                        <i class="fas {stage.icon}"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="font-serif text-[1.1rem] font-semibold flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full inline-block" style="background:{stage.color};"></span>
                            {appState.data.settings.language === 'zh' && stage.titleZh ? stage.titleZh : $_('stages.' + stage.stageId)}
                        </div>
                        <div class="text-[0.8125rem] text-text-secondary mt-0.5">{stage.ageRange}</div>
                    </div>
                    <i class="fas fa-chevron-down text-[0.875rem] text-text-secondary shrink-0 transition-transform duration-200 {isExpanded ? 'rotate-180' : ''}"></i>
                </button>
                
                {#if isExpanded}
                    <div class="px-6 pb-5">
                        {#if stage.isOptional}
                            <div class="flex items-center gap-2.5 py-3 text-[0.875rem] font-medium text-text-secondary border-b border-border mb-4">
                                <label class="toggle-switch">
                                    <input type="checkbox" bind:checked={appState.data.settings.includeMaster}>
                                    <span class="toggle-slider"></span>
                                </label>
                                <span>{$_('settings.includeMaster')}</span>
                            </div>
                        {/if}
                        
                        {#if stage.isOneOff && stage.oneOffCost}
                            <!-- One-off Cost (Marriage) -->
                            <div class="bg-accent-light border-2 border-dashed border-accent rounded-sm p-6 text-center mt-4">
                                <div class="text-[2rem] text-accent mb-3"><i class="fas fa-heart"></i></div>
                                <h4 class="font-serif text-[1.2rem] mb-4 text-text">{$_('lifeStages.weddingCost')}</h4>
                                <div class="flex items-center justify-center gap-4 flex-wrap {stage.oneOffCost.enabled ? '' : 'opacity-45'}">
                                    <label class="toggle-switch">
                                        <input type="checkbox" bind:checked={stage.oneOffCost.enabled}>
                                        <span class="toggle-slider"></span>
                                    </label>
                                    <span class="text-[1rem] font-semibold">{$_('lifeStages.weddingCost')}</span>
                                    <div class="input-wrapper">
                                        <span class="input-prefix">$</span>
                                        <input type="number" class="has-prefix w-[160px]" min="0" step="1000" bind:value={stage.oneOffCost.amount}>
                                    </div>
                                    <div class="input-wrapper">
                                        <input type="number" class="has-suffix text-center w-[120px]" min="-20" max="50" step="0.1" bind:value={stage.oneOffCost.yoyIncrease}>
                                        <span class="input-suffix">%</span>
                                    </div>
                                </div>
                            </div>
                        {:else if !isExcluded}
                            
                            <!-- Monthly Costs -->
                            {#each MONTHLY_CATEGORIES as category}
                                {@const items = category.items.filter(k => stage.monthlyCosts[k] !== undefined)}
                                {#if items.length > 0}
                                    <div class="mb-5 last:mb-0">
                                        <div class="flex items-center gap-2 mb-3 pb-2 border-b-2 border-border">
                                            <h4 class="font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.8px] text-text-secondary">{$_(category.i18nKey)}</h4>
                                        </div>
                                        {#each items as key}
                                            <div class="grid grid-cols-[44px_1fr_130px_80px] sm:grid-cols-[44px_1fr_130px_80px] items-center gap-2.5 py-2.5 border-b border-border/50 last:border-none transition-opacity duration-200 {stage.monthlyCosts[key].enabled ? '' : 'opacity-45 pointer-events-none'}">
                                                <label class="toggle-switch pointer-events-auto">
                                                    <input type="checkbox" bind:checked={stage.monthlyCosts[key].enabled}>
                                                    <span class="toggle-slider"></span>
                                                </label>
                                                <span class="text-[0.875rem] font-medium truncate">{$_('costItems.' + key)}</span>
                                                <div class="input-wrapper">
                                                    <span class="input-prefix" style="position:static; margin-right:4px;">$</span>
                                                    <input type="number" class="py-[7px] px-2.5 text-[0.875rem]" min="0" step="10" bind:value={stage.monthlyCosts[key].amount}>
                                                </div>
                                                <div class="input-wrapper">
                                                    <input type="number" class="py-[7px] px-2.5 text-[0.875rem] text-center" min="-20" max="50" step="0.1" bind:value={stage.monthlyCosts[key].yoyIncrease}>
                                                    <span class="input-suffix" style="position:static; margin-left:2px;">%</span>
                                                </div>
                                            </div>
                                        {/each}
                                    </div>
                                {/if}
                            {/each}

                            <!-- Yearly Costs -->
                            {@const yearlyItems = Object.keys(stage.yearlyCosts)}
                            {#if yearlyItems.length > 0}
                                <div class="mb-5 last:mb-0">
                                    <div class="flex items-center gap-2 mb-3 pb-2 border-b-2 border-border">
                                        <h4 class="font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.8px] text-text-secondary">{$_('lifeStages.yearlyOneOff')}</h4>
                                    </div>
                                    {#each yearlyItems as key}
                                        <div class="grid grid-cols-[44px_1fr_130px_80px] sm:grid-cols-[44px_1fr_130px_80px] items-center gap-2.5 py-2.5 border-b border-border/50 last:border-none transition-opacity duration-200 {stage.yearlyCosts[key].enabled ? '' : 'opacity-45 pointer-events-none'}">
                                            <label class="toggle-switch pointer-events-auto">
                                                <input type="checkbox" bind:checked={stage.yearlyCosts[key].enabled}>
                                                <span class="toggle-slider"></span>
                                            </label>
                                            <span class="text-[0.875rem] font-medium truncate">{$_('costItems.' + key)}</span>
                                            <div class="input-wrapper">
                                                <span class="input-prefix" style="position:static; margin-right:4px;">$</span>
                                                <input type="number" class="py-[7px] px-2.5 text-[0.875rem]" min="0" step="10" bind:value={stage.yearlyCosts[key].amount}>
                                            </div>
                                            <div class="input-wrapper">
                                                <input type="number" class="py-[7px] px-2.5 text-[0.875rem] text-center" min="-20" max="50" step="0.1" bind:value={stage.yearlyCosts[key].yoyIncrease}>
                                                <span class="input-suffix" style="position:static; margin-left:2px;">%</span>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            {/if}

                            {#if index < appState.data.lifeStages.length - 1}
                                <div class="mt-4 pt-4 border-t border-border">
                                    <button class="btn btn-primary" onclick={() => appState.populateYoYFromStage(index)}>
                                        <i class="fas fa-arrow-right"></i> {$_('lifeStages.populateBtn')}
                                    </button>
                                    <div class="text-[0.75rem] text-text-secondary mt-2 italic">
                                        <i class="fas fa-info-circle"></i> {$_('lifeStages.populateHint')}
                                    </div>
                                </div>
                            {/if}
                        {/if}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</section>