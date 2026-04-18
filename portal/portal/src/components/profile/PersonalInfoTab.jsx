import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../../features/auth/authSlice";

export default function PersonalInfoTab() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div className="space-y-6">
      <h2 className="mb-4 text-xl font-bold">{t("profile.myProfile")}</h2>

      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <form className="space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
              MA
            </div>
            <div>
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                {t("profile.changePhoto")}
              </button>
              <p className="mt-2 text-xs text-slate-500">{t("profile.photoHint")}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("register.firstName")}
              </label>
              <input
                type="text"
                defaultValue="Mohammed"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("register.lastName")}
              </label>
              <input
                type="text"
                defaultValue="Alami"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("login.email")}
            </label>
            <input
              type="email"
              defaultValue="m.alami@email.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("register.phone")}
            </label>
            <input
              type="tel"
              defaultValue="+212 612-345678"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="flex flex-wrap justify-end gap-4 pt-4">
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-6 py-3 text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {t("common.cancel")}
            </button>

            <button
              type="submit"
              className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/90"
            >
              {t("common.save")}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-6 py-3 font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              {t("profile.logout")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}