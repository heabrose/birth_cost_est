<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { setLanguage } from '$lib/i18n';
    import { appState } from '$lib/store.svelte';
</script>

<header class="text-center pt-10 pb-6">
    <h1 class="flex items-center justify-center gap-3 mb-2 font-serif text-[2.4rem] font-bold">
        <i class="fas fa-baby text-primary text-[2rem]"></i>
        {$_('app.title')}
    </h1>
    <p class="text-[1rem] text-text-secondary mb-4">{$_('app.subtitle')}</p>
    <div class="flex justify-center gap-2">
        <button class="pill btn-sm {appState.data.settings.language === 'en' ? 'active bg-primary text-white border-primary' : 'border-border text-text-secondary'}" onclick={() => { appState.data.settings.language = 'en'; setLanguage('en'); }}>EN</button>
        <button class="pill btn-sm {appState.data.settings.language === 'zh' ? 'active bg-primary text-white border-primary' : 'border-border text-text-secondary'}" onclick={() => { appState.data.settings.language = 'zh'; setLanguage('zh'); }}>繁體中文</button>
    </div>
</header>