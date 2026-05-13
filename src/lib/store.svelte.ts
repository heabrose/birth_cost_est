import { browser } from '$app/environment';

export type CostItem = {
    amount: number;
    enabled: boolean;
    yoyIncrease: number;
    label?: string;
};

export type LifeStage = {
    stageId: string;
    title: string;
    titleZh: string;
    icon: string;
    color: string;
    ageRange: string;
    durationYears: number;
    startYear: number;
    isOptional?: boolean;
    isOneOff?: boolean;
    monthlyCosts: Record<string, CostItem>;
    yearlyCosts: Record<string, CostItem>;
    oneOffCost?: CostItem;
};

export const DEFAULT_STATE = {
    settings: {
        inflationRate: 2.5,
        irr: 6.0,
        includeMaster: false,
        weddingAge: 28,
        activeProfile: null as string | null,
        language: 'en'
    },
    fixedCosts: {
        homePurchase: {
            enabled: true,
            purchasePrice: 1200000,
            downPaymentPct: 20,
            interestRate: 3.5,
            loanTermYears: 25,
            purchaseYear: 0
        },
        carPurchase: {
            enabled: true,
            purchasePrice: 35000,
            tradeInValue: 8000,
            lifecycleYears: 8,
            monthlyRunningCosts: 400
        }
    },
    lifeStages: [
        {
            stageId: 'pre_birth',
            title: 'Pre-birth',
            titleZh: '出生前',
            icon: 'fa-heartbeat',
            color: '#E11D48',
            ageRange: 'Year 0',
            durationYears: 1,
            startYear: 0,
            monthlyCosts: {
                living: { amount: 500, enabled: true, yoyIncrease: 2.0 },
                meals: { amount: 800, enabled: true, yoyIncrease: 2.5 },
                clothing: { amount: 300, enabled: true, yoyIncrease: 2.0 },
                medical: { amount: 2000, enabled: true, yoyIncrease: 3.0 },
                care: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                education: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                extraCurriculum: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                entertainment: { amount: 0, enabled: false, yoyIncrease: 2.0 }
            },
            yearlyCosts: {
                springTravel: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                summerTravel: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                winterTravel: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                summerCamps: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                schoolTrips: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                insurance: { amount: 5000, enabled: true, yoyIncrease: 3.0 }
            }
        },
        {
            stageId: 'infant_0_2',
            title: 'Infant',
            titleZh: '嬰兒期',
            icon: 'fa-baby',
            color: '#0EA5E9',
            ageRange: 'Ages 0-2',
            durationYears: 3,
            startYear: 1,
            monthlyCosts: {
                living: { amount: 1000, enabled: true, yoyIncrease: 2.0 },
                meals: { amount: 2000, enabled: true, yoyIncrease: 2.5 },
                clothing: { amount: 600, enabled: true, yoyIncrease: 2.0 },
                medical: { amount: 1500, enabled: true, yoyIncrease: 3.0 },
                care: { amount: 6000, enabled: true, yoyIncrease: 3.0 },
                education: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                extraCurriculum: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                entertainment: { amount: 200, enabled: true, yoyIncrease: 2.0 }
            },
            yearlyCosts: {
                springTravel: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                summerTravel: { amount: 8000, enabled: true, yoyIncrease: 2.5 },
                winterTravel: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                summerCamps: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                schoolTrips: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                insurance: { amount: 8000, enabled: true, yoyIncrease: 3.0 }
            }
        },
        {
            stageId: 'preschool_3_5',
            title: 'Pre-school',
            titleZh: '學前',
            icon: 'fa-shapes',
            color: '#F59E0B',
            ageRange: 'Ages 3-5',
            durationYears: 3,
            startYear: 4,
            monthlyCosts: {
                living: { amount: 1200, enabled: true, yoyIncrease: 2.0 },
                meals: { amount: 2500, enabled: true, yoyIncrease: 2.5 },
                clothing: { amount: 700, enabled: true, yoyIncrease: 2.0 },
                medical: { amount: 800, enabled: true, yoyIncrease: 3.0 },
                care: { amount: 5000, enabled: true, yoyIncrease: 3.0 },
                education: { amount: 3000, enabled: true, yoyIncrease: 3.0 },
                extraCurriculum: { amount: 1500, enabled: true, yoyIncrease: 2.5 },
                entertainment: { amount: 400, enabled: true, yoyIncrease: 2.0 }
            },
            yearlyCosts: {
                springTravel: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                summerTravel: { amount: 12000, enabled: true, yoyIncrease: 2.5 },
                winterTravel: { amount: 3000, enabled: true, yoyIncrease: 2.0 },
                summerCamps: { amount: 5000, enabled: true, yoyIncrease: 2.5 },
                schoolTrips: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                insurance: { amount: 10000, enabled: true, yoyIncrease: 3.0 }
            }
        },
        {
            stageId: 'primary_6_11',
            title: 'Primary School',
            titleZh: '小學',
            icon: 'fa-book',
            color: '#5B8C5A',
            ageRange: 'Ages 6-11',
            durationYears: 6,
            startYear: 7,
            monthlyCosts: {
                living: { amount: 1500, enabled: true, yoyIncrease: 2.0 },
                meals: { amount: 3000, enabled: true, yoyIncrease: 2.5 },
                clothing: { amount: 800, enabled: true, yoyIncrease: 2.0 },
                medical: { amount: 500, enabled: true, yoyIncrease: 3.0 },
                care: { amount: 2000, enabled: true, yoyIncrease: 3.0 },
                education: { amount: 4000, enabled: true, yoyIncrease: 3.0 },
                extraCurriculum: { amount: 3000, enabled: true, yoyIncrease: 2.5 },
                entertainment: { amount: 600, enabled: true, yoyIncrease: 2.0 }
            },
            yearlyCosts: {
                springTravel: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                summerTravel: { amount: 15000, enabled: true, yoyIncrease: 2.5 },
                winterTravel: { amount: 5000, enabled: true, yoyIncrease: 2.0 },
                summerCamps: { amount: 8000, enabled: true, yoyIncrease: 2.5 },
                schoolTrips: { amount: 3000, enabled: true, yoyIncrease: 2.0 },
                insurance: { amount: 12000, enabled: true, yoyIncrease: 3.0 }
            }
        },
        {
            stageId: 'secondary_12_15',
            title: 'Secondary School',
            titleZh: '中學',
            icon: 'fa-graduation-cap',
            color: '#6366F1',
            ageRange: 'Ages 12-15',
            durationYears: 4,
            startYear: 13,
            monthlyCosts: {
                living: { amount: 1500, enabled: true, yoyIncrease: 2.0 },
                meals: { amount: 3500, enabled: true, yoyIncrease: 2.5 },
                clothing: { amount: 1000, enabled: true, yoyIncrease: 2.0 },
                medical: { amount: 400, enabled: true, yoyIncrease: 3.0 },
                care: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                education: { amount: 5000, enabled: true, yoyIncrease: 3.0 },
                extraCurriculum: { amount: 4000, enabled: true, yoyIncrease: 2.5 },
                entertainment: { amount: 800, enabled: true, yoyIncrease: 2.0 }
            },
            yearlyCosts: {
                springTravel: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                summerTravel: { amount: 18000, enabled: true, yoyIncrease: 2.5 },
                winterTravel: { amount: 8000, enabled: true, yoyIncrease: 2.0 },
                summerCamps: { amount: 5000, enabled: true, yoyIncrease: 2.5 },
                schoolTrips: { amount: 5000, enabled: true, yoyIncrease: 2.0 },
                insurance: { amount: 10000, enabled: true, yoyIncrease: 3.0 }
            }
        },
        {
            stageId: 'highschool_16_17',
            title: 'High School',
            titleZh: '高中',
            icon: 'fa-school',
            color: '#8B5CF6',
            ageRange: 'Ages 16-17',
            durationYears: 2,
            startYear: 17,
            monthlyCosts: {
                living: { amount: 2000, enabled: true, yoyIncrease: 2.0 },
                meals: { amount: 4000, enabled: true, yoyIncrease: 2.5 },
                clothing: { amount: 1200, enabled: true, yoyIncrease: 2.0 },
                medical: { amount: 300, enabled: true, yoyIncrease: 3.0 },
                care: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                education: { amount: 6000, enabled: true, yoyIncrease: 3.0 },
                extraCurriculum: { amount: 3000, enabled: true, yoyIncrease: 2.5 },
                entertainment: { amount: 1000, enabled: true, yoyIncrease: 2.0 }
            },
            yearlyCosts: {
                springTravel: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                summerTravel: { amount: 20000, enabled: true, yoyIncrease: 2.5 },
                winterTravel: { amount: 10000, enabled: true, yoyIncrease: 2.0 },
                summerCamps: { amount: 0, enabled: false, yoyIncrease: 2.5 },
                schoolTrips: { amount: 8000, enabled: true, yoyIncrease: 2.0 },
                insurance: { amount: 8000, enabled: true, yoyIncrease: 3.0 }
            }
        },
        {
            stageId: 'bachelor_18_21',
            title: 'Bachelor',
            titleZh: '大學',
            icon: 'fa-university',
            color: '#059669',
            ageRange: 'Ages 18-21',
            durationYears: 4,
            startYear: 19,
            monthlyCosts: {
                living: { amount: 3000, enabled: true, yoyIncrease: 2.0 },
                meals: { amount: 4000, enabled: true, yoyIncrease: 2.5 },
                clothing: { amount: 1500, enabled: true, yoyIncrease: 2.0 },
                medical: { amount: 200, enabled: true, yoyIncrease: 3.0 },
                care: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                education: { amount: 8000, enabled: true, yoyIncrease: 4.0 },
                extraCurriculum: { amount: 2000, enabled: true, yoyIncrease: 2.5 },
                entertainment: { amount: 1500, enabled: true, yoyIncrease: 2.0 }
            },
            yearlyCosts: {
                springTravel: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                summerTravel: { amount: 15000, enabled: true, yoyIncrease: 2.5 },
                winterTravel: { amount: 12000, enabled: true, yoyIncrease: 2.0 },
                summerCamps: { amount: 0, enabled: false, yoyIncrease: 2.5 },
                schoolTrips: { amount: 10000, enabled: true, yoyIncrease: 2.0 },
                insurance: { amount: 5000, enabled: true, yoyIncrease: 3.0 }
            }
        },
        {
            stageId: 'master_22_24',
            title: 'Master',
            titleZh: '碩士',
            icon: 'fa-user-graduate',
            color: '#0D9488',
            ageRange: 'Ages 22-24',
            durationYears: 3,
            startYear: 23,
            isOptional: true,
            monthlyCosts: {
                living: { amount: 3500, enabled: true, yoyIncrease: 2.0 },
                meals: { amount: 4500, enabled: true, yoyIncrease: 2.5 },
                clothing: { amount: 1500, enabled: true, yoyIncrease: 2.0 },
                medical: { amount: 200, enabled: true, yoyIncrease: 3.0 },
                care: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                education: { amount: 10000, enabled: true, yoyIncrease: 4.0 },
                extraCurriculum: { amount: 1000, enabled: false, yoyIncrease: 2.5 },
                entertainment: { amount: 1500, enabled: true, yoyIncrease: 2.0 }
            },
            yearlyCosts: {
                springTravel: { amount: 0, enabled: false, yoyIncrease: 2.0 },
                summerTravel: { amount: 12000, enabled: true, yoyIncrease: 2.5 },
                winterTravel: { amount: 10000, enabled: true, yoyIncrease: 2.0 },
                summerCamps: { amount: 0, enabled: false, yoyIncrease: 2.5 },
                schoolTrips: { amount: 5000, enabled: true, yoyIncrease: 2.0 },
                insurance: { amount: 5000, enabled: true, yoyIncrease: 3.0 }
            }
        },
        {
            stageId: 'marriage',
            title: 'Marriage',
            titleZh: '婚禮',
            icon: 'fa-ring',
            color: '#EC4899',
            ageRange: 'One-off Event',
            durationYears: 1,
            startYear: 29,
            isOneOff: true,
            monthlyCosts: {
                living: { amount: 0, enabled: false, yoyIncrease: 0 },
                meals: { amount: 0, enabled: false, yoyIncrease: 0 },
                clothing: { amount: 0, enabled: false, yoyIncrease: 0 },
                medical: { amount: 0, enabled: false, yoyIncrease: 0 },
                care: { amount: 0, enabled: false, yoyIncrease: 0 },
                education: { amount: 0, enabled: false, yoyIncrease: 0 },
                extraCurriculum: { amount: 0, enabled: false, yoyIncrease: 0 },
                entertainment: { amount: 0, enabled: false, yoyIncrease: 0 }
            },
            yearlyCosts: {
                springTravel: { amount: 0, enabled: false, yoyIncrease: 0 },
                summerTravel: { amount: 0, enabled: false, yoyIncrease: 0 },
                winterTravel: { amount: 0, enabled: false, yoyIncrease: 0 },
                summerCamps: { amount: 0, enabled: false, yoyIncrease: 0 },
                schoolTrips: { amount: 0, enabled: false, yoyIncrease: 0 },
                insurance: { amount: 0, enabled: false, yoyIncrease: 0 }
            },
            oneOffCost: { amount: 150000, enabled: true, yoyIncrease: 2.0, label: 'Wedding Cost' }
        }
    ] as LifeStage[]
};

export class AppState {
    data = $state(JSON.parse(JSON.stringify(DEFAULT_STATE)));

    constructor() {
        if (browser) {
            const stored = localStorage.getItem('childCostCalculatorState');
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    this.data = this.mergeWithDefaults(parsed);
                } catch (e) {
                    console.error('Failed to parse stored state');
                }
            }
            
            // Watch for changes to persist
            $effect.root(() => {
                $effect(() => {
                    localStorage.setItem('childCostCalculatorState', JSON.stringify(this.data));
                });
                
                // Sync marriage stage startYear with weddingAge setting (Year = Age + 1)
                $effect(() => {
                    const age = this.data.settings.weddingAge;
                    const marriageStage = this.data.lifeStages.find((s: LifeStage) => s.isOneOff);
                    if (marriageStage && marriageStage.startYear !== (age + 1)) {
                        marriageStage.startYear = age + 1;
                    }
                });
            });
        }
    }

    mergeWithDefaults(parsed: any) {
        const merged = JSON.parse(JSON.stringify(DEFAULT_STATE));
        if (parsed.settings) Object.assign(merged.settings, parsed.settings);
        if (parsed.fixedCosts) {
            if (parsed.fixedCosts.homePurchase) Object.assign(merged.fixedCosts.homePurchase, parsed.fixedCosts.homePurchase);
            if (parsed.fixedCosts.carPurchase) Object.assign(merged.fixedCosts.carPurchase, parsed.fixedCosts.carPurchase);
        }
        if (parsed.lifeStages && Array.isArray(parsed.lifeStages)) {
            parsed.lifeStages.forEach((stage: any, i: number) => {
                if (merged.lifeStages[i]) {
                    if (stage.monthlyCosts) {
                        Object.keys(stage.monthlyCosts).forEach(key => {
                            if (merged.lifeStages[i].monthlyCosts[key]) {
                                Object.assign(merged.lifeStages[i].monthlyCosts[key], stage.monthlyCosts[key]);
                            }
                        });
                    }
                    if (stage.yearlyCosts) {
                        Object.keys(stage.yearlyCosts).forEach(key => {
                            if (merged.lifeStages[i].yearlyCosts[key]) {
                                Object.assign(merged.lifeStages[i].yearlyCosts[key], stage.yearlyCosts[key]);
                            }
                        });
                    }
                    if (stage.oneOffCost && merged.lifeStages[i].oneOffCost) {
                        Object.assign(merged.lifeStages[i].oneOffCost, stage.oneOffCost);
                    }
                }
            });
        }
        return merged;
    }

    reset() {
        this.data = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }

    applyProfile(profile: 'frugal' | 'average' | 'premium') {
        const multipliers = {
            frugal: 0.6,
            average: 1.0,
            premium: 1.6
        };
        const mult = multipliers[profile];
        
        // Reset base values first
        const base = JSON.parse(JSON.stringify(DEFAULT_STATE));
        
        base.lifeStages.forEach((stage: LifeStage) => {
            Object.values(stage.monthlyCosts).forEach(item => {
                if (item.enabled && item.amount > 0) item.amount = Math.round(item.amount * mult);
            });
            Object.values(stage.yearlyCosts).forEach(item => {
                if (item.enabled && item.amount > 0) item.amount = Math.round(item.amount * mult);
            });
            if (stage.oneOffCost && stage.oneOffCost.enabled && stage.oneOffCost.amount > 0) {
                stage.oneOffCost.amount = Math.round(stage.oneOffCost.amount * mult);
            }
        });
        base.fixedCosts.homePurchase.purchasePrice = Math.round(base.fixedCosts.homePurchase.purchasePrice * mult);
        base.fixedCosts.carPurchase.purchasePrice = Math.round(base.fixedCosts.carPurchase.purchasePrice * mult);
        
        // Keep some settings from current state
        base.settings.inflationRate = this.data.settings.inflationRate;
        base.settings.irr = this.data.settings.irr;
        base.settings.includeMaster = this.data.settings.includeMaster;
        base.settings.language = this.data.settings.language;
        base.settings.activeProfile = profile;
        
        this.data = base;
    }

    populateYoYFromStage(stageIndex: number) {
        const sourceStage = this.data.lifeStages[stageIndex];
        if (!sourceStage) return;

        for (let i = stageIndex + 1; i < this.data.lifeStages.length; i++) {
            const targetStage = this.data.lifeStages[i];
            const yearsDiff = targetStage.startYear - sourceStage.startYear;

            Object.keys(sourceStage.monthlyCosts).forEach(key => {
                if (targetStage.monthlyCosts[key] && sourceStage.monthlyCosts[key]) {
                    const source = sourceStage.monthlyCosts[key];
                    const target = targetStage.monthlyCosts[key];
                    target.yoyIncrease = source.yoyIncrease;
                    if (source.enabled) {
                        target.amount = Math.round(source.amount * Math.pow(1 + source.yoyIncrease / 100, yearsDiff));
                        target.enabled = true;
                    }
                }
            });

            Object.keys(sourceStage.yearlyCosts).forEach(key => {
                if (targetStage.yearlyCosts[key] && sourceStage.yearlyCosts[key]) {
                    const source = sourceStage.yearlyCosts[key];
                    const target = targetStage.yearlyCosts[key];
                    target.yoyIncrease = source.yoyIncrease;
                    if (source.enabled) {
                        target.amount = Math.round(source.amount * Math.pow(1 + source.yoyIncrease / 100, yearsDiff));
                        target.enabled = true;
                    }
                }
            });

            if (sourceStage.oneOffCost && targetStage.oneOffCost) {
                const source = sourceStage.oneOffCost;
                const target = targetStage.oneOffCost;
                target.yoyIncrease = source.yoyIncrease;
                if (source.enabled) {
                    target.amount = Math.round(source.amount * Math.pow(1 + source.yoyIncrease / 100, yearsDiff));
                    target.enabled = true;
                }
            }
        }
    }

    calculateMortgage(principal: number, annualRate: number, years: number) {
        const monthlyRate = annualRate / 100 / 12;
        const numPayments = years * 12;
        if (monthlyRate === 0) return principal / numPayments;
        return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    get projectionData() {
        const { settings, fixedCosts, lifeStages } = this.data;
        const inflationRate = settings.inflationRate || 0;

        let maxYear = 0;
        lifeStages.forEach((stage: LifeStage) => {
            if (stage.isOptional && !settings.includeMaster) return;
            const endYear = stage.startYear + (stage.durationYears || 1);
            if (endYear > maxYear) maxYear = endYear;
        });

        if (fixedCosts.homePurchase.enabled) {
            maxYear = Math.max(maxYear, fixedCosts.homePurchase.purchaseYear + fixedCosts.homePurchase.loanTermYears);
        }

        const result = [];
        let cumulative = 0;

        for (let year = 0; year < maxYear; year++) {
            // Global inflation only applies to fixed costs without their own YoY
            const globalInflationFactor = Math.pow(1 + inflationRate / 100, year);

            let monthlyRecurring = 0;
            let yearlyOneOff = 0;
            let currentAge = year === 0 ? -1 : year - 1;
            let ageLabel = year === 0 ? 'Pre-birth' : `Age ${currentAge}`;
            
            let activeStageStr = '';
            let activeStageColor = '#999';
            let activeStageIcon = '';
            let activeStageIsOneOff = false;
            
            // 6 Categories for chart
            let catEssentials = 0, catDevelopment = 0, catLifestyle = 0, catYearly = 0, catHome = 0, catCar = 0;

            lifeStages.forEach((stage: LifeStage) => {
                const stageEnd = stage.startYear + (stage.durationYears || 1);
                
                // Regular stage costs
                if (!(stage.isOptional && !settings.includeMaster)) {
                    if (year >= stage.startYear && year < stageEnd && !stage.isOneOff) {
                        activeStageStr = stage.title;
                        activeStageColor = stage.color;
                        activeStageIcon = stage.icon;
                        activeStageIsOneOff = false;

                        // Local YoY applies starting from the SECOND year of the stage (yearsInStage > 0)
                        const yearsInStage = year - stage.startYear;

                        // Sum monthly costs
                        Object.entries(stage.monthlyCosts).forEach(([key, item]) => {
                            if (item.enabled) {
                                // First year of stage (yearsInStage === 0) uses base amount exactly
                                // Subsequent years use base amount * local YoY compounded
                                const itemYoyFactor = Math.pow(1 + item.yoyIncrease / 100, yearsInStage);
                                const currentMonthly = item.amount * itemYoyFactor;
                                monthlyRecurring += currentMonthly;
                                
                                const currentAnnual = currentMonthly * 12;
                                if (['living', 'meals', 'clothing', 'medical'].includes(key)) catEssentials += currentAnnual;
                                else if (['care', 'education', 'extraCurriculum'].includes(key)) catDevelopment += currentAnnual;
                                else if (key === 'entertainment') catLifestyle += currentAnnual;
                            }
                        });

                        // Sum yearly costs
                        Object.entries(stage.yearlyCosts).forEach(([key, item]) => {
                            if (item.enabled) {
                                const itemYoyFactor = Math.pow(1 + item.yoyIncrease / 100, yearsInStage);
                                const currentYearly = item.amount * itemYoyFactor;
                                yearlyOneOff += currentYearly;
                                catYearly += currentYearly;
                            }
                        });
                    }
                }

                // One-off costs (like marriage)
                if (stage.isOneOff && stage.oneOffCost && stage.oneOffCost.enabled) {
                    if (year === stage.startYear) {
                        // User input is exactly what's shown in the year it happens
                        const currentOneOff = stage.oneOffCost.amount;
                        yearlyOneOff += currentOneOff;
                        catYearly += currentOneOff;
                        
                        activeStageStr = stage.title;
                        activeStageColor = stage.color;
                        activeStageIcon = stage.icon;
                        activeStageIsOneOff = true;
                    }
                }
            });

            // Home Related
            let mortgage = 0;
            if (fixedCosts.homePurchase.enabled) {
                const home = fixedCosts.homePurchase;
                const loanAmount = home.purchasePrice * (1 - home.downPaymentPct / 100);
                const monthlyPayment = this.calculateMortgage(loanAmount, home.interestRate, home.loanTermYears);
                
                // Down payment (adjusted by global inflation as it's a future capital outlay)
                if (year === home.purchaseYear) {
                    const downPayment = (home.purchasePrice * (home.downPaymentPct / 100)) * globalInflationFactor;
                    mortgage += downPayment;
                    catHome += downPayment;
                }
                
                // Monthly payments (mortgage is fixed nominal, but we adjust for total projection value)
                if (year >= home.purchaseYear && year < (home.purchaseYear + home.loanTermYears)) {
                    const annualPayment = monthlyPayment * 12 * globalInflationFactor;
                    mortgage += annualPayment;
                    catHome += annualPayment;
                }
            }

            // Car
            let car = 0;
            if (fixedCosts.carPurchase.enabled) {
                const carData = fixedCosts.carPurchase;
                const carYearInCycle = year % carData.lifecycleYears;
                
                // Purchase/Replacement (adjusted by inflation)
                if (carYearInCycle === 0) {
                    const purchaseCost = (carData.purchasePrice - carData.tradeInValue) * globalInflationFactor;
                    car += purchaseCost;
                    catCar += purchaseCost;
                }
                
                // Running costs (adjusted by inflation)
                const annualRunning = carData.monthlyRunningCosts * 12 * globalInflationFactor;
                car += annualRunning;
                catCar += annualRunning;
            }

            const totalAnnual = catEssentials + catDevelopment + catLifestyle + catYearly + catHome + catCar;
            cumulative += totalAnnual;

            result.push({
                year,
                age: ageLabel,
                lifeStage: activeStageStr || 'Independent',
                stageColor: activeStageColor,
                stageIcon: activeStageIcon || 'fa-user',
                isOneOff: activeStageIsOneOff,
                totalAnnual: Math.round(totalAnnual),
                cumulative: Math.round(cumulative),
                breakdown: {
                    essentials: Math.round(catEssentials),
                    development: Math.round(catDevelopment),
                    lifestyle: Math.round(catLifestyle),
                    yearly: Math.round(catYearly),
                    home: Math.round(catHome),
                    car: Math.round(catCar)
                },
                components: {
                    mortgage: Math.round(mortgage),
                    car: Math.round(car),
                    monthlyRecurring: Math.round(monthlyRecurring * 12),
                    yearlyOneOff: Math.round(yearlyOneOff)
                }
            });
        }
        return result;
    }

    get summary() {
        const projection = this.projectionData;
        const irr = (this.data.settings.irr || 0) / 100;

        let totalCost = 0;
        let npv = 0;

        projection.forEach(row => {
            totalCost += row.totalAnnual;
            npv += row.totalAnnual / Math.pow(1 + irr, row.year);
        });

        return {
            totalCost: Math.round(totalCost),
            requiredInvestment: Math.round(npv)
        };
    }
}

export const appState = new AppState();
