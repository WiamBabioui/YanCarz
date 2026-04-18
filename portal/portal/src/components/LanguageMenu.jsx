import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  {
    code: "fr",
    label: "Français",
    flag: "fr",
  },
  {
    code: "en",
    label: "English",
    flag: "gb",
  },
  {
    code: "ar",
    label: "العربية",
    flag: "ma",
  },
];

export default function LanguageMenu() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  function changeLanguage(code) {
    i18n.changeLanguage(code);

    localStorage.setItem("i18nextLng", code);

    document.documentElement.lang = code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";

    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:bg-primary/5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        <span className={`fi fi-${current.flag}`} />
        <span className="hidden sm:inline">{current.label}</span>

        <span className="material-symbols-outlined text-[18px]">
          expand_more
        </span>
      </button>

      {/* dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {languages.map((lang) => {
            const active = lang.code === current.code;

            return (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex w-full items-center justify-between px-4 py-3 text-sm transition ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`fi fi-${lang.flag}`} />
                  <span>{lang.label}</span>
                </div>

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
  );
}