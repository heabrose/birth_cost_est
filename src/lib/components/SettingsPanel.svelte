<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { appState } from '$lib/store.svelte';
    
    let isOpen = $state(false);
</script>

<div class="bg-card-bg rounded shadow border border-border mb-6 overflow-hidden">
    <button class="w-full flex justify-between items-center p-4 md:px-6 cursor-pointer hover:bg-primary-light transition-colors duration-200 border-none bg-transparent font-sans" onclick={() => isOpen = !isOpen}>
        <h3 class="text-[1.1rem] flex items-center gap-2.5 m-0 font-serif font-semibold">
            <i class="fas fa-cog text-primary"></i> {$_('settings.title')}
        </h3>
        <i class="fas fa-chevron-down text-text-secondary text-[0.875rem] transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"></i>
    </button>
    <div class="overflow-hidden transition-all duration-300 ease-in-out px-4 md:px-6 {isOpen ? 'max-h-[500px] pb-6' : 'max-h-0'}">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div class="flex flex-col gap-1.5">
                <label for="settingInflation" class="text-[0.8125rem] font-medium text-text-secondary">{$_('settings.inflationRate')}</label>
                <div class="input-wrapper">
                    <input type="number" id="settingInflation" step="0.1" min="0" max="20" bind:value={appState.data.settings.inflationRate}>
                </div>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="settingIRR" class="text-[0.8125rem] font-medium text-text-secondary">{$_('settings.irr')}</label>
                <div class="input-wrapper">
                    <input type="number" id="settingIRR" step="0.1" min="0" max="30" bind:value={appState.data.settings.irr}>
                </div>
            </div>
            <div class="flex items-end pb-1">
                <label class="toggle-switch mr-2.5">
                    <input type="checkbox" bind:checked={appState.data.settings.includeMaster}>
                    <span class="toggle-slider"></span>
                </label>
                <span class="text-[0.875rem] font-medium">{$_('settings.includeMaster')}</span>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="settingWeddingAge" class="text-[0.8125rem] font-medium text-text-secondary">{$_('settings.weddingAge')}</label>
                <div class="input-wrapper">
                    <input type="number" id="settingWeddingAge" step="1" min="18" max="100" bind:value={appState.data.settings.weddingAge}>
                </div>
            </div>
        </div>
    </div>
</div>