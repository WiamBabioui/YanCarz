/**
 * YaanCarz - Core Utilities
 * Minimal vanilla JS for query params, UI interactions, and navigation
 */

// Query Parameters Utility
const QueryParams = {
    get: function(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },
    getAll: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const params = {};
        for (const [key, value] of urlParams.entries()) {
            params[key] = value;
        }
        return params;
    },
    set: function(key, value) {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    },
    buildUrl: function(baseUrl, params) {
        const url = new URL(baseUrl, window.location.origin);
        Object.keys(params).forEach(key => {
            if (params[key]) url.searchParams.set(key, params[key]);
        });
        return url.pathname + url.search;
    }
};

// Formatting Utilities
const FormatUtils = {
    currency: function(amount) {
        return amount + ' MAD';
    },
    date: function(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    },
    dateTime: function(dateStr, timeStr) {
        if (!dateStr) return '';
        const date = this.date(dateStr);
        return timeStr ? `${date} à ${timeStr}` : date;
    },
    daysBetween: function(from, to) {
        if (!from || !to) return 1;
        const d1 = new Date(from);
        const d2 = new Date(to);
        const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 1;
    }
};

// Update search summary on result pages
function updateSearchSummary() {
    const params = QueryParams.getAll();
    const city = params.city || 'Casablanca';
    const from = params.from;
    const to = params.to;
    const fromTime = params.fromTime || '09:00';
    const toTime = params.toTime || '18:00';

    // Update header summary if exists
    const headerSummary = document.querySelector('[data-search-summary]');
    if (headerSummary) {
        const days = FormatUtils.daysBetween(from, to);
        headerSummary.innerHTML = `
            <span class="material-symbols-outlined text-slate-500 text-lg">location_on</span>
            <span class="ml-2 text-sm font-medium">${city}</span>
            <span class="mx-3 h-4 w-[1px] bg-slate-300 dark:bg-slate-600"></span>
            <span class="material-symbols-outlined text-slate-500 text-lg">calendar_month</span>
            <span class="ml-2 text-sm font-medium">${from ? FormatUtils.date(from) : ''} ${fromTime} – ${to ? FormatUtils.date(to) : ''} ${toTime}</span>
            <span class="mx-3 h-4 w-[1px] bg-slate-300 dark:bg-slate-600"></span>
            <span class="text-sm font-medium text-primary">${days} jour${days > 1 ? 's' : ''}</span>
        `;
    }

    // Update page title if exists
    const pageTitle = document.querySelector('[data-page-title]');
    if (pageTitle && city) {
        pageTitle.textContent = `${city} : véhicules disponibles`;
    }

    // Update date range text
    const dateRange = document.querySelector('[data-date-range]');
    if (dateRange && from && to) {
        const days = FormatUtils.daysBetween(from, to);
        dateRange.textContent = `Du ${FormatUtils.date(from)} à ${fromTime} au ${FormatUtils.date(to)} à ${toTime} (${days} jour${days > 1 ? 's' : ''})`;
    }
}

// Update booking summary on details and booking pages
function updateBookingSummary() {
    const params = QueryParams.getAll();
    const from = params.from;
    const to = params.to;
    const fromTime = params.fromTime || '09:00';
    const toTime = params.toTime || '18:00';
    const city = params.city || 'Casablanca';

    // Update rental dates in sidebar
    const rentalDates = document.querySelector('[data-rental-dates]');
    if (rentalDates && from && to) {
        const days = FormatUtils.daysBetween(from, to);
        rentalDates.innerHTML = `
            <div class="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span class="material-symbols-outlined text-[14px]">calendar_month</span>
                Dates de location
            </div>
            <div class="space-y-1">
                <div class="flex justify-between text-sm">
                    <span class="text-slate-500">Prise en charge:</span>
                    <span class="font-medium">${FormatUtils.date(from)} à ${fromTime}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-slate-500">Restitution:</span>
                    <span class="font-medium">${FormatUtils.date(to)} à ${toTime}</span>
                </div>
                <div class="flex justify-between text-sm pt-1 border-t border-slate-200 dark:border-slate-700 mt-1">
                    <span class="text-slate-500">Durée:</span>
                    <span class="font-medium text-primary">${days} jour${days > 1 ? 's' : ''}</span>
                </div>
            </div>
        `;
    }

    // Update location
    const locationEl = document.querySelector('[data-location-display]');
    if (locationEl && city) {
        locationEl.textContent = city;
    }
}

// Handle search form submission
function initSearchForm() {
    const searchForm = document.querySelector('[data-search-form]');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(searchForm);
            const params = {};
            formData.forEach((value, key) => {
                if (value) params[key] = value;
            });
            const url = QueryParams.buildUrl('resultsearch.html', params);
            window.location.href = url;
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    updateSearchSummary();
    updateBookingSummary();
    initSearchForm();
});

// Export for use in other scripts
window.QueryParams = QueryParams;
window.FormatUtils = FormatUtils;
