import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

export default function Home() {
  const { t } = useTranslation();

  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);

  const [fromDate, setFromDate] = useState("2026-03-12");
  const [toDate, setToDate] = useState("2026-03-15");
  const [fromTime, setFromTime] = useState("09:00");
  const [toTime, setToTime] = useState("18:00");

  const minReturnDate = addDays(fromDate, 3);

  useEffect(() => {
    if (toDate < minReturnDate) {
      setToDate(minReturnDate);
    }
  }, [fromDate, minReturnDate, toDate]);

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch("/api/shared/Place", {
          headers: {
            accept: "*/*",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch places");

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          if (typeof data[0] === "string") {
            setCities(data.map((city) => ({ id: city, name: city })));
            return;
          }

          if (typeof data[0] === "object") {
            const mappedCities = data
              .map((item, index) => ({
                id: item.id || String(index),
                name: item.name || item.cityName || item.label || "",
              }))
              .filter((item) => item.id && item.name);

            if (mappedCities.length > 0) {
              setCities(mappedCities);
              return;
            }
          }
        }

        setCities([]);
      } catch (error) {
        console.error("Error fetching places:", error);
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    }

    fetchCities();
  }, []);

  const defaultCityId = useMemo(() => cities[0]?.id || "", [cities]);

  const features = [
    {
      icon: "payments",
      title: t("home.features.bestPrices.title"),
      desc: t("home.features.bestPrices.desc"),
    },
    {
      icon: "security",
      title: t("home.features.secureBooking.title"),
      desc: t("home.features.secureBooking.desc"),
    },
    {
      icon: "event_busy",
      title: t("home.features.freeCancellation.title"),
      desc: t("home.features.freeCancellation.desc"),
    },
    {
      icon: "headset_mic",
      title: t("home.features.support.title"),
      desc: t("home.features.support.desc"),
    },
  ];

  const destinations = [
    { city: "Casablanca", price: "250", gradient: "/casablanca.jpg" },
    { city: "Marrakech", price: "280", gradient: "/marakech.jpg" },
    { city: "Agadir", price: "220", gradient: "/agadir.jpg" },
  ];

  return (
    <main className="flex-1">
      <section className="relative bg-gradient-to-br from-primary/10 via-background-light to-primary/5 py-16 lg:py-24 dark:from-primary/5 dark:via-background-dark dark:to-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-black tracking-tight text-slate-900 dark:text-white lg:text-5xl">
              {t("home.title1")}{" "}
              <span className="text-primary">{t("home.title2")}</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {t("home.subtitle")}
            </p>
          </div>

          <div className="mx-auto max-w-5xl rounded-2xl border border-slate-100 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 lg:p-8">
            <form
              className="space-y-4 lg:grid lg:grid-cols-12 lg:gap-5 lg:space-y-0"
              onSubmit={(e) => {
                e.preventDefault();

                if (toDate < minReturnDate) {
                  alert(t("home.errors.minReturnDate"));
                  return;
                }

                const fd = new FormData(e.currentTarget);
                const placeId = String(fd.get("city") || "");
                const selectedPlace = cities.find((c) => String(c.id) === placeId);

                const params = new URLSearchParams();

                if (placeId) {
                  params.set("pickupLocationId", placeId);
                  params.set("dropOffLocationId", placeId);
                  params.set("pickupName", selectedPlace?.name || "");
                  params.set("dropOffName", selectedPlace?.name || "");
                }

                ["from", "fromTime", "to", "toTime"].forEach((k) => {
                  const v = fd.get(k);
                  if (v) params.set(k, String(v));
                });

                window.location.href = `/search?${params.toString()}`;
              }}
            >
              <div className="lg:col-span-3">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined align-text-bottom text-lg text-primary">
                    location_on
                  </span>{" "}
                  {t("home.city")}
                </label>

                <select
                  name="city"
                  defaultValue={defaultCityId}
                  disabled={loadingCities}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {loadingCities ? (
                    <option value="">{t("common.loading")}</option>
                  ) : cities.length > 0 ? (
                    cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))
                  ) : (
                    <option value="">{t("home.city")}</option>
                  )}
                </select>
              </div>

              <div className="lg:col-span-3">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined align-text-bottom text-lg text-primary">
                    calendar_today
                  </span>{" "}
                  {t("home.pickupDate")}
                </label>

                <div className="flex gap-2">
                  <input
                    type="date"
                    name="from"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="min-w-0 w-[160px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <select
                    name="fromTime"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    className="w-[88px] rounded-xl border border-slate-200 bg-white px-2 py-3 text-sm text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    {[
                      "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
                      "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00",
                    ].map((tme) => (
                      <option key={tme} value={tme}>
                        {tme}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="lg:col-span-3">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined align-text-bottom text-lg text-primary">
                    event
                  </span>{" "}
                  {t("home.returnDate")}
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    name="to"
                    value={toDate}
                    min={minReturnDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="min-w-0 w-[160px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <select
                    name="toTime"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                    className="w-[88px] rounded-xl border border-slate-200 bg-white px-2 py-3 text-sm text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    {[
                      "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
                      "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00",
                    ].map((tme) => (
                      <option key={tme} value={tme}>
                        {tme}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="lg:col-span-3 flex items-end">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                >
                  <span className="material-symbols-outlined">search</span>
                  <span>{t("home.search")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
              {t("home.whyTitle")}
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
              {t("home.whySubtitle")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-slate-50 p-6 text-center transition-shadow hover:shadow-lg dark:bg-slate-800"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <span className="material-symbols-outlined text-2xl text-primary">
                    {f.icon}
                  </span>
                </div>
                <h3 className="mb-2 font-bold text-slate-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-light py-16 dark:bg-background-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
              {t("home.destinationsTitle")}
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
              {t("home.destinationsSubtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((c) => (
              <Link
                key={c.city}
                to={`/search?pickupLocationId=${encodeURIComponent(defaultCityId)}&dropOffLocationId=${encodeURIComponent(defaultCityId)}&pickupName=${encodeURIComponent(c.city)}&dropOffName=${encodeURIComponent(c.city)}&from=2026-03-12&fromTime=09:00&to=2026-03-15&toTime=18:00`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${c.gradient})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{c.city}</h3>
                  <p className="text-sm text-slate-200">
                    {t("home.from")} {c.price} MAD/jour
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}