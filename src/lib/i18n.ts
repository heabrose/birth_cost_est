import { addMessages, init, getLocaleFromNavigator, locale } from 'svelte-i18n';
import en from './locales/en.json';
import zh from './locales/zh.json';
import { browser } from '$app/environment';

let isInitialized = false;

export function setupI18n() {
    if (isInitialized) return;

    addMessages('en', en);
    addMessages('zh', zh);

	let initialLocale = 'en';
    if (browser) {
        const stored = localStorage.getItem('calculatorLanguage');
        if (stored) {
            initialLocale = stored;
        } else {
            const navLocale = getLocaleFromNavigator();
            if (navLocale && navLocale.startsWith('zh')) {
                initialLocale = 'zh';
            }
        }
    }

	init({
		fallbackLocale: 'en',
		initialLocale: initialLocale,
	});

    isInitialized = true;
    console.log('i18n initialized with:', initialLocale);
}

export function setLanguage(lang: string) {
    if (browser) {
        localStorage.setItem('calculatorLanguage', lang);
    }
    locale.set(lang);
}