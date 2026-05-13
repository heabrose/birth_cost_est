<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { appState } from '$lib/store.svelte';

    function handleImport(e: Event) {
        const target = e.target as HTMLInputElement;
        if (!target.files || target.files.length === 0) return;
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                if (event.target?.result) {
                    const imported = JSON.parse(event.target.result as string);
                    appState.data = appState.mergeWithDefaults(imported);
                    alert("Imported successfully.");
                }
            } catch (err) {
                alert("Import failed: " + err);
            }
        };
        reader.readAsText(file);
        target.value = '';
    }

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

<div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 py-4 border-b border-border">
    <div class="flex flex-col sm:flex-row items-center gap-3">
        <span class="text-[0.8125rem] text-text-secondary font-medium shrink-0">{$_('actions.quickPresets')}</span>
        <div class="flex gap-2 flex-wrap justify-center">
            <button class="pill pill-frugal px-3 sm:px-4.5 {appState.data.settings.activeProfile === 'frugal' ? 'active' : ''}" onclick={() => appState.applyProfile('frugal')}>
                <i class="fas fa-leaf"></i> {$_('actions.frugal')}
            </button>
            <button class="pill pill-average px-3 sm:px-4.5 {appState.data.settings.activeProfile === 'average' ? 'active' : ''}" onclick={() => appState.applyProfile('average')}>
                <i class="fas fa-balance-scale"></i> {$_('actions.average')}
            </button>
            <button class="pill pill-premium px-3 sm:px-4.5 {appState.data.settings.activeProfile === 'premium' ? 'active' : ''}" onclick={() => appState.applyProfile('premium')}>
                <i class="fas fa-gem"></i> {$_('actions.premium')}
            </button>
        </div>
    </div>
    <div class="flex items-center gap-2.5 flex-wrap justify-center">
        <button class="btn btn-secondary btn-sm" onclick={handleExport}>
            <i class="fas fa-download"></i> {$_('actions.exportJson')}
        </button>
        <label class="btn btn-secondary btn-sm cursor-pointer">
            <i class="fas fa-upload"></i> {$_('actions.importJson')}
            <input type="file" accept=".json" class="hidden" onchange={handleImport}>
        </label>
        <button class="btn btn-muted btn-sm" onclick={() => { if(confirm($_('actions.resetAll'))) appState.reset(); }}>
            <i class="fas fa-rotate-left"></i> {$_('actions.resetAll')}
        </button>
    </div>
</div>