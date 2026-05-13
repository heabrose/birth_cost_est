<script lang="ts">
	import '../app.css';
	import { setupI18n, setLanguage } from '$lib/i18n';
	import { isLoading, _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { appState } from '$lib/store.svelte';
    import { page } from '$app/state';
	import { base } from '$app/paths';

    let { children } = $props();

    function formatCurrencyCompact(value: number) {		if (isNaN(value) || value === null) return '$0';
		const abs = Math.abs(value);
		if (abs >= 1e6) return '$' + (value / 1e6).toFixed(1) + 'M';
		if (abs >= 1e3) return '$' + (value / 1e3).toFixed(0) + 'K';
		return '$' + Math.round(value).toLocaleString();
	}
</script>

{#if $isLoading}
	<div class="flex items-center justify-center min-h-screen">
		Loading...
	</div>
{:else}
	<!-- Navigation Bar -->
	<nav class="bg-card-bg border-b border-border sticky top-0 z-[100] shadow-[0_1px_4px_rgba(0,0,0,0.04)] h-[52px]">
		<div class="max-w-[1200px] mx-auto px-5 flex items-center justify-between h-full">
			<div class="font-serif font-bold text-[1.1rem] text-text flex items-center gap-2">
				<i class="fas fa-baby text-primary"></i>
				<span>{$_('app.title')}</span>
			</div>
			<ul class="flex gap-1 list-none m-0 p-0">
				<li>
					<a href="{base}/" class="block px-4 py-2 rounded-sm text-[0.875rem] font-medium text-text-secondary transition-all duration-200 hover:bg-primary-light hover:text-primary {page.url.pathname === base + '/' || page.url.pathname === base ? 'bg-primary-light text-primary font-semibold' : ''}">
						<i class="fas fa-calculator"></i> {$_('nav.calculator')}
					</a>
				</li>
				<li>
					<a href="{base}/projection" class="block px-4 py-2 rounded-sm text-[0.875rem] font-medium text-text-secondary transition-all duration-200 hover:bg-primary-light hover:text-primary {page.url.pathname === base + '/projection' ? 'bg-primary-light text-primary font-semibold' : ''}">
						<i class="fas fa-chart-line"></i> {$_('nav.projection')} &rarr;
					</a>
				</li>
			</ul>
		</div>
	</nav>

	{@render children()}

	<!-- Sticky Summary Panel -->
	<div class="fixed bottom-0 left-0 right-0 bg-card-bg shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-90 border-t border-border">
		<div class="max-w-[1200px] mx-auto px-5 py-4 flex flex-col md:flex-row justify-between items-center min-h-[80px] gap-3 md:gap-0">
			<div class="flex gap-4 md:gap-8 items-center justify-center">
				<div class="flex flex-col">
					<span class="text-[0.75rem] text-text-secondary uppercase tracking-[0.5px] mb-0.5">{$_('sticky.totalEstimatedCost')}</span>
					<span class="font-serif text-[1.25rem] md:text-[1.5rem] font-bold text-text">
						{formatCurrencyCompact(appState.summary.totalCost)}
					</span>
				</div>
				<div class="flex flex-col">
					<span class="text-[0.75rem] text-text-secondary uppercase tracking-[0.5px] mb-0.5">{$_('sticky.requiredInitialInvestment')}</span>
					<span class="font-serif text-[1.25rem] md:text-[1.5rem] font-bold text-primary">
						{formatCurrencyCompact(appState.summary.requiredInvestment)}
					</span>
				</div>
			</div>
			<div class="flex gap-2.5 items-center justify-center">
				<a href="{base}/projection" class="btn btn-primary">
					<i class="fas fa-chart-line"></i> {$_('sticky.viewProjection')}
				</a>
				<button class="btn btn-secondary" onclick={() => appState.reset()}>
					<i class="fas fa-sync-alt"></i> {$_('sticky.recalculate')}
				</button>
			</div>
		</div>
	</div>
{/if}