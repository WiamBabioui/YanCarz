import { useTranslation } from "react-i18next";

export default function DocumentsTab() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h2 className="mb-4 text-xl font-bold">{t("profile.documents")}</h2>

      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border p-4 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <span className="material-symbols-outlined text-primary">id_card</span>
              </div>
              <div>
                <h3 className="font-medium">{t("documents.license")}</h3>
                <p className="text-sm text-slate-500">
                  N° 12/345678 · {t("documents.validUntil")} 15/05/2028
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600 dark:bg-green-900/30">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              {t("documents.verified")}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl border p-4 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <span className="material-symbols-outlined text-primary">badge</span>
              </div>
              <div>
                <h3 className="font-medium">{t("documents.identityCard")}</h3>
                <p className="text-sm text-slate-500">N° AB123456</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600 dark:bg-green-900/30">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              {t("documents.verified")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}