<script lang="ts">
	import '../app.css';
	import { setupI18n, setLanguage } from '$lib/i18n';
	import { isLoading, _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { appState } from '$lib/store.svelte';
    import { page } from '$app/state';
	import { base } from '$app/paths';

	import { browser } from '$app/environment';

	let forcedReady = $state(false);

	if (browser) {
	console.log('App mounting, calling setupI18n');
	setupI18n();
	// Fallback: if i18n takes too long, just show the app anyway
	setTimeout(() => {
	if ($isLoading) {
	console.warn('i18n is taking too long to load, forcing app ready');
	forcedReady = true;
	}
	}, 1500);
	}

	$effect(() => {
	console.log('i18n isLoading state:', $isLoading);
	});

	let { children } = $props();

	function formatCurrencyCompact(value: number) {
		if (isNaN(value) || value === null) return '$0';
		const abs = Math.abs(value);
		if (abs >= 1e6) return '$' + (value / 1e6).toFixed(1) + 'M';
		if (abs >= 1e3) return '$' + (value / 1e3).toFixed(0) + 'K';
		return '$' + Math.round(value).toLocaleString();
	}
</script>

{#if $isLoading && !forcedReady}
	<div class="flex items-center justify-center min-h-screen">
		<div class="text-center">
			<div class="mb-4"><i class="fas fa-baby fa-spin text-primary text-3xl"></i></div>
			<div class="text-text-secondary font-medium">Loading Calculator...</div>
		</div>
	</div>
{:else}
	<!-- Navigation Bar -->
	<nav class="bg-card-bg border-b border-border sticky top-0 z-[100] shadow-[0_1px_4px_rgba(0,0,0,0.04)] h-[52px]">
		<div class="max-w-[1200px] mx-auto px-4 md:px-5 flex items-center justify-between h-full">
			<div class="font-serif font-bold text-[1.05rem] md:text-[1.1rem] text-text flex items-center gap-2">
				<i class="fas fa-baby text-primary"></i>
				<span class="hidden sm:inline">{$_('app.title')}</span>
				<span class="sm:hidden">{$_('app.shortTitle') || 'Calculator'}</span>
			</div>
			<ul class="flex gap-1 list-none m-0 p-0">
				<li>
					<a href="{base}/" class="block px-2.5 py-2 md:px-4 rounded-sm text-[0.8rem] md:text-[0.875rem] font-medium text-text-secondary transition-all duration-200 hover:bg-primary-light hover:text-primary {page.url.pathname === base + '/' || page.url.pathname === base ? 'bg-primary-light text-primary font-semibold' : ''}">
						<i class="fas fa-calculator"></i> <span class="hidden md:inline">{$_('nav.calculator')}</span>
					</a>
				</li>
				<li>
					<a href="{base}/projection" class="block px-2.5 py-2 md:px-4 rounded-sm text-[0.8rem] md:text-[0.875rem] font-medium text-text-secondary transition-all duration-200 hover:bg-primary-light hover:text-primary {page.url.pathname === base + '/projection' ? 'bg-primary-light text-primary font-semibold' : ''}">
						<i class="fas fa-chart-line"></i> <span class="hidden md:inline">{$_('nav.projection')}</span>
						<span class="md:hidden">{$_('nav.projectionShort') || 'Projection'}</span>
					</a>
				</li>
			</ul>
		</div>
	</nav>

	{@render children()}

	<!-- Sticky Summary Panel -->
	<div class="fixed bottom-0 left-0 right-0 bg-card-bg shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-[90] border-t border-border">
		<div class="max-w-[1200px] mx-auto px-4 py-3 md:px-5 md:py-4 flex flex-col md:flex-row justify-between items-center min-h-[70px] md:min-h-[80px] gap-3 md:gap-0">
			<div class="flex gap-6 md:gap-8 items-center justify-center">
				<div class="flex flex-col">
					<span class="text-[0.65rem] md:text-[0.75rem] text-text-secondary uppercase tracking-[0.5px] mb-0.5">{$_('sticky.totalEstimatedCost')}</span>
					<span class="font-serif text-[1.15rem] md:text-[1.5rem] font-bold text-text">
						{formatCurrencyCompact(appState.summary.totalCost)}
					</span>
				</div>
				<div class="flex flex-col">
					<span class="text-[0.65rem] md:text-[0.75rem] text-text-secondary uppercase tracking-[0.5px] mb-0.5">{$_('sticky.requiredInitialInvestment')}</span>
					<span class="font-serif text-[1.15rem] md:text-[1.5rem] font-bold text-primary">
						{formatCurrencyCompact(appState.summary.requiredInvestment)}
					</span>
				</div>
			</div>
			<div class="flex gap-2 items-center justify-center w-full md:w-auto">
				<a href="{base}/projection" class="btn btn-primary btn-sm md:btn-md flex-1 md:flex-none">
					<i class="fas fa-chart-line"></i> {$_('sticky.viewProjection')}
				</a>
				<button class="btn btn-secondary btn-sm md:btn-md flex-1 md:flex-none" onclick={() => appState.reset()}>
					<i class="fas fa-sync-alt"></i> {$_('sticky.recalculate')}
				</button>
			</div>
		</div>
	</div>
{/if}