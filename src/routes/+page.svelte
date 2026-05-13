<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import ActionBar from '$lib/components/ActionBar.svelte';
    import SettingsPanel from '$lib/components/SettingsPanel.svelte';
    import FixedCosts from '$lib/components/FixedCosts.svelte';
    import LifeStages from '$lib/components/LifeStages.svelte';
    import ResultsPreview from '$lib/components/ResultsPreview.svelte';
    import { _ } from 'svelte-i18n';
</script>

<div class="max-w-[1200px] mx-auto px-5">
    <Header />
    <ActionBar />
    <SettingsPanel />
    <FixedCosts />
    <LifeStages />
    <ResultsPreview />
    <footer class="text-center py-8 text-[0.8125rem] text-text-secondary border-t border-border mt-5">
        <p>{$_('footer')}</p>
    </footer>
</div>