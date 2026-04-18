import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../features/auth/authSlice";

const linkBase =
  "relative inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white";

const navLink = ({ isActive }) =>
  isActive
    ? "relative inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white after:absolute after:inset-x-2 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-primary/80"
    : linkBase;

function getInitials(name) {
  if (!name) return "P";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const profileRef = useRef(null);
  const langRef = useRef(null);

  const isRTL = i18n.language === "ar";

  const displayName = useMemo(() => {
    const name = user?.name && String(user.name).trim();
    return name || t("nav.profile");
  }, [t, user?.name]);

  const displayEmail = useMemo(() => {
    const email = user?.email && String(user.email).trim();
    return email || "";
  }, [user?.email]);

  function closeAllMenus() {
    setLangOpen(false);
    setProfileOpen(false);
    setMobileOpen(false);
  }

  function handleLogout() {
    dispatch(logout());
    closeAllMenus();
    navigate("/");
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setLangOpen(false);
        setProfileOpen(false);
        setMobileOpen(false);
      }
    }

    function onPointerDown(e) {
      const target = e.target;
      if (
        profileRef.current &&
        !profileRef.current.contains(target) &&
        langRef.current &&
        !langRef.current.contains(target)
      ) {
        setProfileOpen(false);
        setLangOpen(false);
      } else if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      } else if (langRef.current && !langRef.current.contains(target)) {
        setLangOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  const languages = useMemo(
    () => [
      { code: "fr", label: "Français", flag: "fr" },
      { code: "en", label: "English", flag: "gb" },
      { code: "ar", label: "العربية", flag: "ma" },
    ],
    []
  );
  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  function changeLanguage(code) {
    i18n.changeLanguage(code);
    localStorage.setItem("i18nextLng", code);
    document.documentElement.lang = code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    setLangOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:border-slate-800 dark:bg-background-dark/80 dark:supports-[backdrop-filter]:bg-background-dark/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-3">
          {/* Brand */}
          <div className={`flex min-w-0 items-center ${isRTL ? "order-3" : ""}`}>
            <NavLink to="/" className="group inline-flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 transition group-hover:bg-primary/15 dark:bg-primary/15">
                <span className="material-symbols-outlined text-xl text-primary">
                  directions_car
                </span>
              </span>
              <div className="min-w-0">
                <div className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  YanCarz
                </div>
                <div className="hidden text-[11px] font-medium text-slate-500 dark:text-slate-400 sm:block">
                  {t("nav.book")}
                </div>
              </div>
            </NavLink>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-2 md:flex">
            <NavLink to="/" className={navLink}>
              {t("nav.home")}
            </NavLink>
            <NavLink to="/search" className={navLink}>
              {t("nav.book")}
            </NavLink>
            <NavLink to="/agences" className={navLink}>
              {t("nav.agencies")}
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/profile?tab=reservations" className={navLink}>
                {t("nav.reservations")}
              </NavLink>
            )}
          </nav>

          {/* Right actions */}
          <div
            className={`flex min-w-0 items-center gap-2 ${
              isRTL ? "order-1" : ""
            }`}
          >
            {/* Language (desktop only) */}
            <div className="relative hidden md:block" ref={langRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={langOpen}
                onClick={() => {
                  setLangOpen((v) => !v);
                  setProfileOpen(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-transparent px-2 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <span className={`fi fi-${currentLang.flag} text-sm`} />
                <span className="hidden sm:inline text-xs">{currentLang.label}</span>
                <span className="material-symbols-outlined text-[18px] text-slate-400">
                  expand_more
                </span>
              </button>

              {langOpen && (
                <div
                  role="menu"
                  className={`absolute mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-900 ${
                    isRTL ? "left-0" : "right-0"
                  }`}
                >
                  <div className="px-4 py-3">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {t("preferences.language")}
                    </p>
                  </div>
                  <div className="h-px bg-slate-100 dark:bg-slate-800" />
                  {languages.map((lang) => {
                    const active = lang.code === currentLang.code;
                    return (
                      <button
                        key={lang.code}
                        role="menuitem"
                        type="button"
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition ${
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`fi fi-${lang.flag}`} />
                          <span>{lang.label}</span>
                        </span>
                        {active && (
                          <span className="material-symbols-outlined text-[18px]">
                            check
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Auth / Profile (desktop) */}
            {!isAuthenticated ? (
              <div className="hidden items-center gap-2 md:flex">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="rounded-full border border-slate-200 bg-transparent px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {t("login.title")}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0"
                >
                  {t("login.createAccount")}
                </button>
              </div>
            ) : (
              <div className="relative hidden md:block" ref={profileRef}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  onClick={() => {
                    setProfileOpen((v) => !v);
                    setLangOpen(false);
                  }}
                  className="group inline-flex items-center gap-2 rounded-full bg-transparent px-1.5 py-1.5 text-sm text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/90 text-sm font-bold text-white">
                    {getInitials(user?.name)}
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="max-w-[160px] truncate text-sm font-bold text-slate-900 dark:text-white">
                      {displayName}
                    </div>
                    {displayEmail ? (
                      <div className="max-w-[160px] truncate text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {displayEmail}
                      </div>
                    ) : (
                      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {t("nav.account")}
                      </div>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-slate-500 transition group-hover:text-slate-700 dark:group-hover:text-slate-200">
                    expand_more
                  </span>
                </button>

                {profileOpen && (
                  <div
                    role="menu"
                    className={`absolute mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-900 ${
                      isRTL ? "left-0" : "right-0"
                    }`}
                  >
                    <div className="flex items-center gap-3 px-4 py-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-black text-white">
                        {getInitials(user?.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-slate-900 dark:text-white">
                          {displayName}
                        </div>
                        {displayEmail ? (
                          <div className="truncate text-xs text-slate-500 dark:text-slate-400">
                            {displayEmail}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="h-px bg-slate-100 dark:bg-slate-800" />

                    <div className="p-2">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/profile?tab=profile");
                        }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <span className="material-symbols-outlined text-[20px] text-slate-500">
                          person
                        </span>
                        {t("profile.myProfile")}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/profile?tab=reservations");
                        }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <span className="material-symbols-outlined text-[20px] text-slate-500">
                          event_note
                        </span>
                        {t("nav.reservations")}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/profile?tab=preferences");
                        }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <span className="material-symbols-outlined text-[20px] text-slate-500">
                          settings
                        </span>
                        {t("profile.preferences")}
                      </button>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          logout
                        </span>
                        {t("profile.logout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label="menu"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition hover:bg-slate-50 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              onClick={() => {
                setMobileOpen((v) => !v);
                setLangOpen(false);
                setProfileOpen(false);
              }}
            >
              <span className="material-symbols-outlined text-[22px] text-slate-700 dark:text-slate-200">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-background-dark/95 md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-2">
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className={navLink}
              >
                {t("nav.home")}
              </NavLink>
              <NavLink
                to="/search"
                onClick={() => setMobileOpen(false)}
                className={navLink}
              >
                {t("nav.book")}
              </NavLink>
              <NavLink
                to="/agences"
                onClick={() => setMobileOpen(false)}
                className={navLink}
              >
                {t("nav.agencies")}
              </NavLink>
              {isAuthenticated && (
                <NavLink
                  to="/profile?tab=reservations"
                  onClick={() => setMobileOpen(false)}
                  className={navLink}
                >
                  {t("nav.reservations")}
                </NavLink>
              )}
            </div>

            <div className="my-4 h-px bg-slate-100 dark:bg-slate-800" />

            {/* Mobile language quick switch */}
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => {
                const active = lang.code === currentLang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => changeLanguage(lang.code)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                      active
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className={`fi fi-${lang.flag}`} />
                    <span>{lang.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {!isAuthenticated ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/login");
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    {t("login.title")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/register");
                    }}
                    className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
                  >
                    {t("login.createAccount")}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/profile?tab=profile");
                    }}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-black text-white">
                        {getInitials(user?.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-slate-900 dark:text-white">
                          {displayName}
                        </div>
                        {displayEmail ? (
                          <div className="truncate text-xs text-slate-500 dark:text-slate-400">
                            {displayEmail}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">
                      chevron_right
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/45"
                  >
                    {t("profile.logout")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}