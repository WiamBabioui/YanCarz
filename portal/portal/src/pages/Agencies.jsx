import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  fetchAgencies,
  nextPage,
  setCurrentPage,
} from "../features/agencies/agenciesSlice";

function getAgencyLetter(name) {
  return name?.charAt(0)?.toUpperCase() || "A";
}

function getAgencyBadgeClass(index) {
  const classes = [
    "bg-primary/10 text-primary",
    "bg-blue-100 text-blue-600",
    "bg-red-100 text-red-600",
    "bg-amber-100 text-amber-600",
    "bg-purple-100 text-purple-600",
    "bg-cyan-100 text-cyan-600",
  ];

  return classes[index % classes.length];
}

function normalizeAgency(agency, index, t) {
  return {
    id: agency.id,
    name: agency.name || t("agencies.unnamed", "Agence sans nom"),
    letter: getAgencyLetter(agency.name),
    badgeClass: getAgencyBadgeClass(index),
    rating: "4.7",
    reviews: t("agencies.reviews", "Avis client"),
    address: agency.address?.trim()
      ? agency.address
      : t("agencies.defaultAddress", "Maroc"),
    query: agency.name || "Agency",
  };
}

export default function Agencies() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { agencies, loading, error, currentPage, itemsPerPage } = useSelector(
    (state) => state.agencies
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(fetchAgencies());
  }, [dispatch]);

  const normalizedAgencies = agencies.map((agency, index) =>
    normalizeAgency(agency, index, t)
  );

  const totalPages = Math.ceil(normalizedAgencies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAgencies = normalizedAgencies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <main className="flex-1">
      <section className="bg-gradient-to-br from-primary/10 via-background-light to-primary/5 py-12 dark:from-primary/5 dark:via-background-dark dark:to-primary/10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white lg:text-4xl">
            {t("agencies.title1")}{" "}
            <span className="text-primary">{t("agencies.title2")}</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            {t("agencies.subtitle")}
          </p>
        </div>
      </section>

      <section className="bg-white py-14 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="py-10 text-center text-slate-500 dark:text-slate-400">
              {t("agencies.loading")}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-600 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && currentAgencies.length > 0 && (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {currentAgencies.map((a) => (
                  <article
                    key={a.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="mb-4 flex items-start gap-4">
                      <div
                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${a.badgeClass}`}
                      >
                        <span className="text-2xl font-black">{a.letter}</span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-xl font-extrabold text-slate-900 dark:text-white">
                          {a.name}
                        </h3>

                        <div className="mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[20px] text-amber-400">
                            star
                          </span>
                          <span className="text-base font-bold text-slate-800 dark:text-slate-200">
                            {a.rating}
                          </span>
                          <span className="text-sm text-slate-500">
                            ({a.reviews})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-xl text-primary">
                        location_on
                      </span>
                      <span>{a.address}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to={`/agences/${a.id}`}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-700 transition-all hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary dark:hover:text-primary"
                      >
                        {t("agencies.details", "Agence details")}
                      </Link>

                      <Link
                        to={`/search?agency=${encodeURIComponent(a.query)}`}
                        className="rounded-xl bg-primary px-4 py-3 text-center text-sm font-bold text-white transition-all hover:bg-primary/90"
                      >
                        {t("agencies.viewVehicles")}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        scrollToTop();
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                    >
                      <span className="material-symbols-outlined">
                        keyboard_arrow_left
                      </span>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => {
                            dispatch(setCurrentPage(page));
                            scrollToTop();
                          }}
                          className={`h-10 min-w-10 rounded-xl px-3 font-bold ${
                            currentPage === page
                              ? "bg-primary text-white"
                              : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => {
                        dispatch(nextPage());
                        scrollToTop();
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                    >
                      <span className="material-symbols-outlined">
                        keyboard_arrow_right
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {!loading && !error && normalizedAgencies.length === 0 && (
            <div className="py-10 text-center text-slate-500 dark:text-slate-400">
              {t("agencies.empty")}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}