import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const REQUIRED_PARAM_MAP = {
  from: "DepartureDate",
  to: "ReturnDate",
  pickupLocationId: "PickupLocationId",
  dropOffLocationId: "DropOffLocationId",
};

const OPTIONAL_FILTER_KEYS = [
  "AgencyIds",
  "ModelIds",
  "TypeModels",
  "FuelType",
  "MinPricePerDay",
  "MaxPricePerDay",
  "NbrSeats",
  "MinYear",
  "MaxYear",
  "Page",
  "PageSize",
];

function buildSearchRequestParams(searchParams) {
  const params = new URLSearchParams();
  const missingRequired = [];

  Object.entries(REQUIRED_PARAM_MAP).forEach(([urlKey, apiKey]) => {
    const value = searchParams.get(urlKey);
    if (value) {
      params.set(apiKey, value);
    } else {
      missingRequired.push(urlKey);
    }
  });

  if (missingRequired.length > 0) {
    return { queryString: "", missingRequired };
  }

  OPTIONAL_FILTER_KEYS.forEach((key) => {
    const values = searchParams.getAll(key);
    if (!values || values.length === 0) return;

    if (values.length === 1) {
      if (values[0] !== null && values[0] !== "") {
        params.set(key, values[0]);
      }
    } else {
      values.forEach((v) => {
        if (v !== null && v !== "") {
          params.append(key, v);
        }
      });
    }
  });

  return { queryString: params.toString(), missingRequired: [] };
}

function getFuelTypeLabel(fuelType) {
  switch (fuelType) {
    case 1:
      return "Diesel";
    case 2:
      return "Hybride";
    case 3:
      return "Électrique";
    case 0:
    default:
      return "Essence";
  }
}

function computeRentalDays(from, to) {
  if (!from || !to) return 1;
  const start = new Date(from);
  const end = new Date(to);
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(diffDays, 1);
}

function mapApiCarToCard(car, rentalDays) {
  const pricePerDay = typeof car.pricePerDay === "number" ? car.pricePerDay : 0;
  const total = pricePerDay * rentalDays;

  return {
    id: car.id ?? `${car.agencyId || "car"}-${car.modelId || "unknown"}`,
    category: car.year ? String(car.year) : "STANDARD",
    fuel: getFuelTypeLabel(car.fuelType),
    name: (car.modelName && car.modelName.trim()) || `Véhicule ${car.year || ""}`.trim() || "Véhicule",
    agency: (car.agencyName && car.agencyName.trim()) || "Agence",
    agencyLogo:
      car.agencyLogo ||
      "https://placehold.co/32x32/64748b/ffffff/png?text=A",
    rating: typeof car.rating === "number" ? car.rating : 4.5,
    reviews: typeof car.reviews === "number" ? car.reviews : 0,
    pricePerDay,
    total,
    promo: null,
    image: car.imageUrl || "/placeholder-car.jpg",
    specs: [
      car.seats
        ? { icon: "group", label: String(car.seats) }
        : null,
      { icon: "settings", label: "Manu." },
      { icon: "luggage", label: "2" },
    ].filter(Boolean),
  };
}

function formatDateRange(from, to) {
  if (!from || !to) return "Du — au —";
  const [yf, mf, df] = from.split("-");
  const [yt, mt, dt] = to.split("-");
  return `Du ${df}/${mf}/${yf} au ${dt}/${mt}/${yt}`;
}

export default function Search() {
  const { t } = useTranslation();
  const [sp] = useSearchParams();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const city = sp.get("city") || "Casablanca";
  const from = sp.get("from") || "2026-03-12";
  const to = sp.get("to") || "2026-03-15";
  const fromTime = sp.get("fromTime") || "09:00";
  const toTime = sp.get("toTime") || "18:00";

  const dateRangeLabel = formatDateRange(from, to);

  useEffect(() => {
    const { queryString, missingRequired } = buildSearchRequestParams(sp);

    if (missingRequired.length > 0) {
      setCars([]);
      setTotalCount(0);
      setError("Missing required search parameters.");
      return;
    }

    async function fetchCars() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `/api/portal/ResearchRequest/agency?${queryString}`,
          {
            headers: {
              accept: "*/*",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();

        // API may return cars in either "items" or "cars"
        let items = [];
        if (Array.isArray(data?.items) && data.items.length > 0) {
          items = data.items;
        } else if (Array.isArray(data?.cars)) {
          items = data.cars;
        }
        const rentalDays = computeRentalDays(from, to);

        const mappedCars = items.map((item) =>
          mapApiCarToCard(item, rentalDays)
        );

        setCars(mappedCars);
        setTotalCount(
          typeof data.totalCount === "number"
            ? data.totalCount
            : mappedCars.length
        );
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Une erreur est survenue lors du chargement des véhicules.");
        setCars([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [sp, from, to]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <aside className="hidden w-64 flex-shrink-0 lg:block">
        <div className="sticky top-24 space-y-8">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{t("search.filters")}</h3>
              <button
                className="text-xs font-semibold text-primary"
                type="button"
              >
                {t("search.reset")}
              </button>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {totalCount} {t("search.vehiclesAvailable")}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              {t("search.pricePerDay")} ({t("currency.mad")})
            </h4>
            <div className="px-2">
              <div className="relative h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="absolute inset-y-0 left-1/4 right-1/4 rounded-full bg-primary" />
                <div className="absolute left-1/4 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-primary bg-white shadow-sm" />
                <div className="absolute left-3/4 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-primary bg-white shadow-sm" />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-medium">
                <span>250 {t("currency.mad")}</span>
                <span>1500 {t("currency.mad")}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                {t("search.transmission")}
              </h4>
              <div className="space-y-2">
                <label className="group flex cursor-pointer items-center gap-3">
                  <input
                    className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                    type="checkbox"
                  />
                  <span className="text-sm transition-colors group-hover:text-primary">
                    {t("search.automatic")}
                  </span>
                </label>
                <label className="group flex cursor-pointer items-center gap-3">
                  <input
                    defaultChecked
                    className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                    type="checkbox"
                  />
                  <span className="text-sm transition-colors group-hover:text-primary">
                    {t("search.manual")}
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                {t("search.fuel")}
              </h4>
              <div className="space-y-2">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    defaultChecked
                    className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                    type="checkbox"
                  />
                  <span className="text-sm">Diesel</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                    type="checkbox"
                  />
                  <span className="text-sm">Essence</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                    type="checkbox"
                  />
                  <span className="text-sm">Hybride / Électrique</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                {t("search.category")}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="flex flex-col items-center justify-center rounded-lg border border-slate-200 p-2 transition-colors hover:border-primary dark:border-slate-800"
                >
                  <span className="material-symbols-outlined text-xl">
                    directions_car
                  </span>
                  <span className="mt-1 text-[10px]">Citadine</span>
                </button>

                <button
                  type="button"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-primary bg-primary/5 p-2 transition-colors dark:border-primary/50"
                >
                  <span className="material-symbols-outlined text-xl text-primary">
                    minor_crash
                  </span>
                  <span className="mt-1 text-[10px] font-bold text-primary">
                    SUV
                  </span>
                </button>

                <button
                  type="button"
                  className="flex flex-col items-center justify-center rounded-lg border border-slate-200 p-2 transition-colors hover:border-primary dark:border-slate-800"
                >
                  <span className="material-symbols-outlined text-xl">
                    airport_shuttle
                  </span>
                  <span className="mt-1 text-[10px]">Utilitaire</span>
                </button>

                <button
                  type="button"
                  className="flex flex-col items-center justify-center rounded-lg border border-slate-200 p-2 transition-colors hover:border-primary dark:border-slate-800"
                >
                  <span className="material-symbols-outlined text-xl">
                    sports_motorsports
                  </span>
                  <span className="mt-1 text-[10px]">Luxe</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                {t("search.moreOptions")}
              </h4>
              <label className="flex cursor-pointer items-center gap-3">
                <div className="relative inline-flex cursor-pointer items-center">
                  <input defaultChecked className="peer sr-only" type="checkbox" />
                  <div className="h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-slate-700" />
                </div>
                <span className="text-sm">{t("search.freeCancellation")}</span>
              </label>
            </div>
          </div>
        </div>
      </aside>

      <section className="flex-1">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {city} : {totalCount} {t("search.vehiclesFound")}
            </h1>
            <p className="text-slate-500">
              {dateRangeLabel} ({fromTime} → {toTime})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500">
              {t("search.sortBy")}:
            </span>
            <select
              defaultValue="relevance"
              className="cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="relevance">{t("search.relevance")}</option>
              <option value="price-low">{t("search.priceLow")}</option>
              <option value="price-high">{t("search.priceHigh")}</option>
              <option value="rating">{t("search.bestRating")}</option>
              <option value="popularity">{t("search.popular")}</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 py-8 text-slate-500">
            <span className="material-symbols-outlined animate-spin text-3xl text-primary">
              progress_activity
            </span>
            <p className="text-sm">
              {t("common.loading") || "Chargement des véhicules..."}
            </p>
          </div>
        )}
        {!loading && error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
        {!loading && !error && cars.length === 0 && (
          <p className="text-sm text-slate-500">
            Aucun véhicule trouvé pour ces critères.
          </p>
        )}
        {!loading && !error && cars.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cars.map((car) => (
            <article
              key={car.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src="/clio.jpg"
                  alt={car.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-car.jpg";
                  }}
                />

                {car.promo?.label ? (
                  <div className="absolute left-3 top-3 rounded-md bg-primary px-2 py-1 text-[10px] font-bold text-white shadow-sm">
                    {car.promo.label}
                  </div>
                ) : null}

                <button
                  type="button"
                  className="absolute right-3 top-3 cursor-pointer rounded-full bg-white/90 p-1.5 text-slate-400 shadow-sm hover:text-primary dark:bg-slate-800/90"
                  aria-label="favorite"
                >
                  <span className="material-symbols-outlined text-lg leading-none">
                    favorite
                  </span>
                </button>

                <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[12px] text-yellow-400">
                    star
                  </span>
                  {car.rating} ({car.reviews} avis)
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between">
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
                    <h3 className="mt-1 text-lg font-bold">{car.name}</h3>
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

                <div className="mt-4 flex flex-wrap items-center gap-4 text-slate-500">
                  {car.specs.map((s, idx) => (
                    <div
                      key={`${car.id}-${idx}`}
                      className={`flex items-center gap-1.5 ${
                        s.highlight ? "text-primary" : ""
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {s.icon}
                      </span>
                      <span
                        className={s.highlight ? "text-[10px] font-bold" : "text-xs"}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-end justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                    <div>
                      {car.promo?.oldPrice ? (
                        <p className="text-[10px] font-medium text-slate-400 line-through">
                          {car.promo.oldPrice} {t("currency.mad")}
                        </p>
                      ) : (
                        <p className="text-[10px] font-medium text-slate-400">
                          {t("search.from")}
                        </p>
                      )}

                      <p className="text-xl font-bold text-primary">
                        {car.pricePerDay} {t("currency.mad")}
                        <span className="text-xs font-normal text-slate-400">
                          /{t("currency.Day")}
                        </span>
                      </p>

                      <p className="text-[11px] font-semibold text-slate-500">
                        {t("search.total")} : {car.total} {t("currency.mad")}
                      </p>
                    </div>

                    <Link
                      to={`/details/${car.id}?city=${encodeURIComponent(
                        city
                      )}&from=${from}&fromTime=${fromTime}&to=${to}&toTime=${toTime}`}
                      state={{ car, city, from, to, fromTime, toTime }}
                      className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-primary/90"
                    >
                      {t("search.viewDetails")}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
          </div>
        )}
      </section>
    </main>
  );
}