import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';
import en from './locales/en.json';
import zh from './locales/zh.json';
import { browser } from '$app/environment';

register('en', () => Promise.resolve(en));
register('zh', () => Promise.resolve(zh));

export function setupI18n() {
    if (!browser) return;

	let initialLocale = getLocaleFromNavigator();
    if (initialLocale && initialLocale.startsWith('zh')) {
        initialLocale = 'zh';
    } else {
        initialLocale = 'en';
    }
    
    // Check localStorage
    const stored = localStorage.getItem('calculatorLanguage');
    if (stored) {
        initialLocale = stored;
    }

	init({
		fallbackLocale: 'en',
		initialLocale: initialLocale,
	});
}

// Auto-initialize if in browser
if (browser) {
    setupI18n();
}

export function setLanguage(lang: string) {
    if (browser) {
        localStorage.setItem('calculatorLanguage', lang);
    }
    locale.set(lang);
}