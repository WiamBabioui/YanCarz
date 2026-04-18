import { useTranslation } from "react-i18next";

export default function ReservationsTab() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h2 className="mb-4 text-xl font-bold">{t("profile.reservations")}</h2>

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="h-32 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 md:w-48">
              <img src="/dacia.jpg" alt="Dacia Duster" className="h-full w-full object-cover" />
            </div>

            <div className="flex-1">
              <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Dacia Duster
                  </h3>

                  <div className="mt-1 flex w-fit items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1 dark:bg-slate-800">
                    <img
                      alt="Agency Logo"
                      className="h-4 w-4 rounded-sm"
                      src="https://placehold.co/32x32/10a24b/ffffff/png?text=Y"
                    />
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      YAAN EXPRESS
                    </span>
                  </div>
                </div>

                <span className="inline-flex w-fit items-center gap-1 rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-600 dark:bg-green-900/30">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  {t("reservations.confirmed")}
                </span>
              </div>

              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <span>12 Mars 2026 à 09:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-primary">event</span>
                  <span>15 Mars 2026 à 18:00</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div>
                  <span className="text-xs text-slate-500">{t("reservations.reference")}</span>
                  <p className="font-mono font-medium text-slate-900 dark:text-white">
                    YAAN-34821
                  </p>
                </div>

                <div>
                  <span className="text-xs text-slate-500">{t("search.total")}</span>
                  <p className="font-bold text-primary">1,620 MAD</p>
                </div>

                <div className="flex-1"></div>

                <div className="flex gap-2">
                  <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                    <span className="material-symbols-outlined mr-1 align-middle text-sm">
                      download
                    </span>
                    {t("reservations.invoice")}
                  </button>

                  <button className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20">
                    <span className="material-symbols-outlined mr-1 align-middle text-sm">
                      close
                    </span>
                    {t("common.cancel")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm opacity-80 dark:border-slate-800 dark:bg-slate-900">
        <div className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="h-32 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 md:w-48">
              <img src="/clio.jpg" alt="Renault Clio" className="h-full w-full object-cover grayscale" />
            </div>

            <div className="flex-1">
              <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Renault Clio 5
                  </h3>

                  <div className="mt-1 flex w-fit items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1 dark:bg-slate-800">
                    <img
                      alt="Agency Logo"
                      className="h-4 w-4 rounded-sm"
                      src="https://placehold.co/32x32/2563eb/ffffff/png?text=B"
                    />
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      BUDGET MAROC
                    </span>
                  </div>
                </div>

                <span className="inline-flex w-fit items-center gap-1 rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  <span className="material-symbols-outlined text-sm">check</span>
                  {t("reservations.finished")}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div>
                  <span className="text-xs text-slate-500">{t("reservations.reference")}</span>
                  <p className="font-mono font-medium text-slate-700 dark:text-slate-300">
                    YAAN-32451
                  </p>
                </div>

                <div>
                  <span className="text-xs text-slate-500">{t("search.total")}</span>
                  <p className="font-medium text-slate-700 dark:text-slate-300">885 MAD</p>
                </div>

                <div className="flex-1"></div>

                <div className="flex gap-2">
                  <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                    <span className="material-symbols-outlined mr-1 align-middle text-sm">
                      download
                    </span>
                    {t("reservations.invoice")}
                  </button>

                  <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
                    <span className="material-symbols-outlined mr-1 align-middle text-sm">
                      replay
                    </span>
                    {t("reservations.rentAgain")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}