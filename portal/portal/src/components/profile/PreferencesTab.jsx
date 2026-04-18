import { useTranslation } from "react-i18next";

export default function PreferencesTab() {
  const { t, i18n } = useTranslation();

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }

  return (
    <div className="space-y-6">
      <h2 className="mb-4 text-xl font-bold">{t("profile.preferences")}</h2>

      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 font-medium">{t("preferences.notifications")}</h3>

            <div className="space-y-3">
              <label className="flex cursor-pointer items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300">
                  {t("preferences.confirmationEmails")}
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-primary focus:ring-primary"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300">
                  {t("preferences.rentalReminders")}
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-primary focus:ring-primary"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300">
                  {t("preferences.promotionalOffers")}
                </span>
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-primary focus:ring-primary"
                />
              </label>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
            <h3 className="mb-4 font-medium">{t("preferences.languageRegion")}</h3>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-500">
                  {t("preferences.language")}
                </label>
                <select
                  defaultValue={i18n.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value="fr">Français</option>
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-500">
                  {t("preferences.currency")}
                </label>
                <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  <option value="mad">MAD (Dirham marocain)</option>
                  <option value="eur">EUR (Euro)</option>
                  <option value="usd">USD (Dollar)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
            <button className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/90">
              {t("preferences.save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}