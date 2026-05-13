export function formatCurrency(value: number, fallback = '$0') {
    if (isNaN(value) || value === null) return fallback;
    return '$' + Math.round(value).toLocaleString('en-US');
}
