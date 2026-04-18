import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { loginSuccess } from "../features/auth/authSlice";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const fakeUserData = {
      user: {
        name: "Youssef",
        email: email || "youssef@example.com",
      },
      token: "demo-token-123",
    };

    dispatch(loginSuccess(fakeUserData));
    navigate("/profile?tab=profile");
  }

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-background-light px-4 py-12 dark:bg-background-dark">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-60px] h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-[28px] border border-slate-200/70 bg-white/95 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <span className="material-symbols-outlined text-4xl text-primary">
                person
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t("login.title")}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              {t("login.subtitle")} <br className="sm:hidden" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                YanCarz
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t("login.email")}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="h-14 w-full rounded-full border border-slate-200 bg-slate-50 pl-12 pr-4 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t("login.password")}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  lock
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-14 w-full rounded-full border border-slate-200 bg-slate-50 pl-12 pr-4 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="flex items-start justify-between gap-4 pt-1">
              <label className="flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm leading-5 text-slate-600 dark:text-slate-400">
                  {t("login.remember")}
                </span>
              </label>

              <button
                type="button"
                className="text-sm font-medium text-primary transition hover:underline"
              >
                {t("login.forgot")}
              </button>
            </div>

            <button
              type="submit"
              className="h-14 w-full rounded-full bg-primary text-lg font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0"
            >
              {t("login.submit")}
            </button>
          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                {t("login.orContinue")}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="flex h-13 w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 font-medium text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              {t("login.google")}
            </button>

            <button
              type="button"
              className="flex h-13 w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 font-medium text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <span className="material-symbols-outlined text-blue-600">
                facebook
              </span>
              {t("login.facebook")}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t("login.noAccount")}{" "}
              <Link
                to="/register"
                className="font-semibold text-primary hover:underline"
              >
                {t("login.createAccount")}
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-5 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined mr-1 align-middle text-base text-primary">
              info
            </span>
            {t("login.demo")}
          </p>
        </div>
      </div>
    </main>
  );
}