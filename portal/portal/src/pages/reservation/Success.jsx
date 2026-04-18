import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Success() {
  const { t } = useTranslation();
  const [sp] = useSearchParams();
  const ref = sp.get("ref") || "YAAN-34821";

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 md:px-10">
      <div className="mb-10 text-center">
        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <span className="material-symbols-outlined text-6xl text-green-500">
            check_circle
          </span>
        </div>
        <h1 className="mb-4 text-3xl font-black text-slate-900 dark:text-white md:text-4xl">
          {t("success.title")}
        </h1>
        <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-400">
          {t("success.subtitle")}
        </p>
      </div>

      <div className="mb-10 rounded-2xl border border-primary/20 bg-primary/10 p-8 text-center">
        <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">
          {t("success.reference")}
        </p>
        <p className="text-4xl font-black tracking-wider text-primary md:text-5xl">
          {ref}
        </p>
        <p className="mt-3 text-sm text-slate-500">{t("success.keepReference")}</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          to="/profile?tab=reservations"
          className="flex-1 rounded-xl bg-primary px-6 py-4 text-center font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
        >
          <span className="material-symbols-outlined mr-2 align-middle">list</span>
          {t("success.viewBookings")}
        </Link>

        <Link
          to="/"
          className="flex-1 rounded-xl border border-slate-200 px-6 py-4 text-center font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span className="material-symbols-outlined mr-2 align-middle">home</span>
          {t("success.backHome")}
        </Link>
      </div>
    </div>
  );
}