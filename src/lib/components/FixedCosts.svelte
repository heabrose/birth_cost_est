<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { appState } from '$lib/store.svelte';
    import { formatCurrency } from '$lib';
    
    let home = $derived(appState.data.fixedCosts.homePurchase);
    let car = $derived(appState.data.fixedCosts.carPurchase);
    
    let monthlyMortgage = $derived.by(() => {
        if (!home.enabled) return 0;
        const loanAmount = home.purchasePrice * (1 - home.downPaymentPct / 100);
        return appState.calculateMortgage(loanAmount, home.interestRate, home.loanTermYears);
    });

    let netCarCost = $derived.by(() => {
        if (!car.enabled) return 0;
        return (car.purchasePrice - car.tradeInValue) + (car.monthlyRunningCosts * 12 * car.lifecycleYears);
    });
</script>

<section class="mb-8">
    <h2 class="font-serif text-[1.35rem] font-bold mb-1 flex items-center gap-2.5">
        <i class="fas fa-home text-primary"></i> {$_('fixedCosts.title')}
    </h2>
    <p class="text-[0.875rem] text-text-secondary mb-4">{$_('fixedCosts.subtitle')}</p>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <!-- Home Purchase -->
        <div class="card {home.enabled ? '' : 'disabled bg-[#f9f9f9]'}">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-serif text-[1.1rem] flex items-center gap-2.5 font-semibold m-0">
                    <i class="fas fa-home text-primary"></i> {$_('fixedCosts.homePurchase')}
                </h3>
                <label class="toggle-switch pointer-events-auto">
                    <input type="checkbox" bind:checked={home.enabled}>
                    <span class="toggle-slider"></span>
                </label>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="flex flex-col gap-1.5">
                    <label for="hpPrice" class="text-[0.8125rem] font-medium text-text-secondary">{$_('fixedCosts.purchasePrice')}</label>
                    <div class="input-wrapper">
                        <span class="input-prefix">$</span>
                        <input type="number" id="hpPrice" class="has-prefix" min="0" step="1000" disabled={!home.enabled} bind:value={home.purchasePrice}>
                    </div>
                </div>
                <div class="flex flex-col gap-1.5">
                    <label for="hpYear" class="text-[0.8125rem] font-medium text-text-secondary">{$_('fixedCosts.purchaseYear')}</label>
                    <div class="input-wrapper">
                        <input type="number" id="hpYear" class="has-suffix" min="0" max="100" step="1" disabled={!home.enabled} bind:value={home.purchaseYear}>
                        <span class="input-suffix">Yr</span>
                    </div>
                </div>
                <div class="flex flex-col gap-1.5">
                    <label for="hpDown" class="text-[0.8125rem] font-medium text-text-secondary">{$_('fixedCosts.downPayment')}</label>
                    <div class="input-wrapper">
                        <input type="number" id="hpDown" class="has-suffix" min="0" max="100" step="1" disabled={!home.enabled} bind:value={home.downPaymentPct}>
                        <span class="input-suffix">%</span>
                    </div>
                </div>
                <div class="flex flex-col gap-1.5">
                    <label for="hpRate" class="text-[0.8125rem] font-medium text-text-secondary">{$_('fixedCosts.interestRate')}</label>
                    <div class="input-wrapper">
                        <input type="number" id="hpRate" class="has-suffix" min="0" max="20" step="0.1" disabled={!home.enabled} bind:value={home.interestRate}>
                        <span class="input-suffix">%</span>
                    </div>
                </div>
                <div class="flex flex-col gap-1.5">
                    <label for="hpTerm" class="text-[0.8125rem] font-medium text-text-secondary">{$_('fixedCosts.loanTerm')}</label>
                    <div class="input-wrapper">
                        <input type="number" id="hpTerm" class="has-suffix" min="1" max="40" step="1" disabled={!home.enabled} bind:value={home.loanTermYears}>
                        <span class="input-suffix">yr</span>
                    </div>
                </div>
                <div class="col-span-1 sm:col-span-2 lg:col-span-1 bg-primary-light border border-primary/20 rounded-sm p-3">
                    <div class="text-[0.75rem] text-text-secondary uppercase tracking-[0.5px] mb-1">{$_('fixedCosts.estimatedMonthlyMortgage')}</div>
                    <div class="text-[1.25rem] font-bold text-primary font-serif">{formatCurrency(monthlyMortgage)}/mo</div>
                </div>
            </div>
        </div>

        <!-- Car Purchase -->
        <div class="card {car.enabled ? '' : 'disabled bg-[#f9f9f9]'}">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-serif text-[1.1rem] flex items-center gap-2.5 font-semibold m-0">
                    <i class="fas fa-car text-accent"></i> {$_('fixedCosts.carPurchase')}
                </h3>
                <label class="toggle-switch pointer-events-auto">
                    <input type="checkbox" bind:checked={car.enabled}>
                    <span class="toggle-slider"></span>
                </label>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                    <label for="cpPrice" class="text-[0.8125rem] font-medium text-text-secondary">{$_('fixedCosts.purchasePrice')}</label>
                    <div class="input-wrapper">
                        <span class="input-prefix">$</span>
                        <input type="number" id="cpPrice" class="has-prefix" min="0" step="1000" disabled={!car.enabled} bind:value={car.purchasePrice}>
                    </div>
                </div>
                <div class="flex flex-col gap-1.5">
                    <label for="cpTrade" class="text-[0.8125rem] font-medium text-text-secondary">{$_('fixedCosts.tradeInValue')}</label>
                    <div class="input-wrapper">
                        <span class="input-prefix">$</span>
                        <input type="number" id="cpTrade" class="has-prefix" min="0" step="500" disabled={!car.enabled} bind:value={car.tradeInValue}>
                    </div>
                </div>
                <div class="flex flex-col gap-1.5">
                    <label for="cpCycle" class="text-[0.8125rem] font-medium text-text-secondary">{$_('fixedCosts.replaceEvery')}</label>
                    <div class="input-wrapper">
                        <input type="number" id="cpCycle" class="has-suffix" min="1" max="30" step="1" disabled={!car.enabled} bind:value={car.lifecycleYears}>
                        <span class="input-suffix">yr</span>
                    </div>
                </div>
                <div class="flex flex-col gap-1.5">
                    <label for="cpRun" class="text-[0.8125rem] font-medium text-text-secondary">{$_('fixedCosts.monthlyRunningCosts')}</label>
                    <div class="input-wrapper">
                        <span class="input-prefix">$</span>
                        <input type="number" id="cpRun" class="has-prefix" min="0" step="50" disabled={!car.enabled} bind:value={car.monthlyRunningCosts}>
                    </div>
                </div>
                <div class="col-span-1 sm:col-span-2 bg-primary-light border border-primary/20 rounded-sm p-3">
                    <div class="text-[0.75rem] text-text-secondary uppercase tracking-[0.5px] mb-1">{$_('fixedCosts.netCostPerCycle')}</div>
                    <div class="text-[1.25rem] font-bold text-primary font-serif">{formatCurrency(netCarCost)}</div>
                </div>
            </div>
        </div>
    </div>
</section>