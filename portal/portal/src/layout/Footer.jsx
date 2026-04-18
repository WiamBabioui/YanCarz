import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <Link to="/" className="mb-6 flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-2xl">
                directions_car
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                YanCarz
              </h2>
            </Link>
            <p className="max-w-xs text-sm text-slate-500">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-slate-900 dark:text-white">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link className="transition-colors hover:text-primary" to="/">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary" to="/search">
                  {t("nav.book")}
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary" to="/agences">
                  {t("nav.agencies")}
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  to="/profile?tab=reservations"
                >
                  {t("nav.reservations")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-slate-900 dark:text-white">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  {t("footer.terms")}
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs text-slate-400 md:flex-row dark:border-slate-800">
          <p>{t("footer.rights")}</p>
          <div className="flex gap-6">
            <a className="hover:text-slate-600" href="#">
              Facebook
            </a>
            <a className="hover:text-slate-600" href="#">
              Instagram
            </a>
            <a className="hover:text-slate-600" href="#">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}