import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";

import ProfileSidebar from "../components/profile/ProfileSidebar";
import ReservationsTab from "../components/profile/ReservationsTab";
import PersonalInfoTab from "../components/profile/PersonalInfoTab";
import DocumentsTab from "../components/profile/DocumentsTab";
import PreferencesTab from "../components/profile/PreferencesTab";

export default function Profile() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();

  const tabFromUrl = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  function renderTab() {
    switch (activeTab) {
      case "reservations":
        return <ReservationsTab />;
      case "profile":
        return <PersonalInfoTab />;
      case "documents":
        return <DocumentsTab />;
      case "preferences":
        return <PreferencesTab />;
      default:
        return <PersonalInfoTab />;
    }
  }

  return (
    <main className="flex flex-1 justify-center py-8">
      <div className="flex flex-col max-w-[1100px] flex-1 px-4 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              Mon Compte
            </h1>
            <p className="text-slate-500 mt-1">
              Gérez vos réservations et informations personnelles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </aside>

          <div className="lg:col-span-3">{renderTab()}</div>
        </div>
      </div>
    </main>
  );
}