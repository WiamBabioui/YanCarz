import { useTranslation } from "react-i18next";

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const { t } = useTranslation();

  const tabs = [
    {
      key: "reservations",
      label: t("profile.reservations"),
      icon: "calendar_month",
    },
    {
      key: "profile",
      label: t("profile.myProfile"),
      icon: "person",
    },
    {
      key: "documents",
      label: t("profile.documents"),
      icon: "description",
    },
    {
      key: "preferences",
      label: t("profile.preferences"),
      icon: "settings",
    },
  ];

  return (
    <div className="sticky top-24 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-100 p-6 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
            MA
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">
              Mohammed Alami
            </p>
            <p className="text-sm text-slate-500">m.alami@email.com</p>
          </div>
        </div>
      </div>

      <nav className="p-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`mt-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              <span className="material-symbols-outlined">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}