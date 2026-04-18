import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DEFAULT_HIGHLIGHTS = [
  "Annulation gratuite selon conditions",
  "Assistance 24/7",
  "Paiement sécurisé",
];

export default function Details() {
  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const [sp] = useSearchParams();

  const city = sp.get("city") || "Casablanca";
  const from = sp.get("from") || "2026-03-12";
  const to = sp.get("to") || "2026-03-15";
  const fromTime = sp.get("fromTime") || "09:00";
  const toTime = sp.get("toTime") || "18:00";

  const passedCar = location.state?.car;

  const car =
    passedCar && String(passedCar.id) === String(id)
      ? passedCar
      : {
          id,
          category: "STANDARD",
          fuel: "",
          name: "Véhicule",
          agency: "Agence",
          agencyLogo:
            "https://placehold.co/32x32/64748b/ffffff/png?text=A",
          rating: 0,
          reviews: 0,
          pricePerDay: 0,
          total: 0,
          promo: null,
          image: "/placeholder-car.jpg",
          specs: [],
        };

  return (
    <main className="bg-background-light dark:bg-background-dark">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            to={`/search?city=${encodeURIComponent(city)}&from=${from}&fromTime=${fromTime}&to=${to}&toTime=${toTime}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            {t("details.back")}
          </Link>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <span className="material-symbols-outlined mr-1 align-text-bottom text-lg text-primary">
              location_on
            </span>
            {city} —{" "}
            <span className="text-slate-500">
              {from} {fromTime} → {to} {toTime}
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <section className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-car.jpg";
                  }}
                />

                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[14px] text-yellow-400">
                    star
                  </span>
                  {car.rating} ({car.reviews} avis)
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        {car.category}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="text-[10px] font-bold text-slate-400">
                        {car.fuel}
                      </span>
                    </div>
                    <h1 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                      {car.name}
                    </h1>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1 dark:bg-slate-800">
                    <img
                      alt="Agency Logo"
                      className="h-4 w-4 rounded-sm"
                      src={car.agencyLogo}
                    />
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      {car.agency}
                    </span>
                  </div>
                </div>

                {car.specs && car.specs.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                      {t("details.mainFeatures")}
                    </h2>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {car.specs.map((s, idx) => (
                        <div
                          key={`${car.id}-spec-${idx}`}
                          className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`material-symbols-outlined ${
                                s.highlight ? "text-primary" : "text-slate-500"
                              }`}
                            >
                              {s.icon}
                            </span>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                              {s.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t("details.highlights")}
                  </h2>

                  <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {DEFAULT_HIGHLIGHTS.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="material-symbols-outlined mt-[1px] text-primary">
                          check_circle
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t("details.summary")}
                </h3>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{t("details.city")}</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {city}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{t("details.datesHours")}</span>
                    <span className="text-right font-bold text-slate-900 dark:text-white">
                      {from} {fromTime}
                      <br />
                      {to} {toTime}
                    </span>
                  </div>

                  <div className="h-px bg-slate-100 dark:bg-slate-800" />

                  <div>
                    <p className="text-[10px] font-medium text-slate-400">
                      {t("details.from")}
                    </p>
                    <p className="text-2xl font-black text-primary">
                      {car.pricePerDay} {t("currency.mad")}
                      <span className="text-sm font-semibold text-slate-400">
                        /{t("currency.Day")}
                      </span>
                    </p>
                    <p className="text-xs font-semibold text-slate-500">
                      {t("details.estimatedTotal")} : {car.total}{t("currency.mad")}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/reservation/info/${id}?city=${city}&from=${from}&fromTime=${fromTime}&to=${to}&toTime=${toTime}`}
                  className="mt-4 block w-full rounded-xl bg-primary py-3 text-center font-bold text-white transition-all hover:bg-primary/90"
                >
                  {t("details.bookNow")}
                </Link>

                <p className="mt-3 text-center text-[11px] text-slate-500">
                  {t("details.securePayment")}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}