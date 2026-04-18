import { useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCarById } from "../../data/cars";

export default function Info() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [sp] = useSearchParams();
  const car = getCarById(id);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    license: "",
    cin: "",
    accept: false,
  });

  const qs = useMemo(() => sp.toString(), [sp]);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.accept) return;

    const params = new URLSearchParams(sp);
    params.set("fullName", form.fullName);
    params.set("phone", form.phone);
    params.set("email", form.email);
    params.set("license", form.license);
    if (form.cin) params.set("cin", form.cin);

    navigate(`/reservation/summary/${id}?${params.toString()}`);
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-20">
      <div className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {t("info.stepLabel")}
            </span>
            <h2 className="text-xl font-bold">{t("info.title")}</h2>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
            {t("info.done")}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-primary/10">
          <div className="relative h-full w-1/3 rounded-full bg-primary">
            <div className="absolute inset-0 animate-pulse bg-white/20"></div>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-sm">person</span>
            <span className="text-xs font-bold uppercase">{t("booking.client")}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="material-symbols-outlined text-sm">fact_check</span>
            <span className="text-xs font-bold uppercase">{t("booking.summary")}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span className="text-xs font-bold uppercase">{t("booking.confirmation")}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <section className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined rounded-lg bg-primary/10 p-2 text-primary">
                badge
              </span>
              <h3 className="text-lg font-bold">{t("info.personalDetails")}</h3>
            </div>

            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t("info.fullName")} <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  name="fullName"
                  value={form.fullName}
                  onChange={onChange}
                  className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-slate-900 transition-all focus:border-primary focus:ring-primary"
                  placeholder={t("info.fullNamePlaceholder")}
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t("info.phone")} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 font-medium text-slate-400">
                    +212
                  </span>
                  <input
                    required
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className="w-full rounded-lg border-2 border-slate-200 py-3 pl-14 pr-4 transition-all focus:border-primary focus:ring-primary"
                    placeholder="6 12 34 56 78"
                    type="tel"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t("login.email")} <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 transition-all focus:border-primary focus:ring-primary"
                  placeholder="votre@email.com"
                  type="email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t("info.license")} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    required
                    name="license"
                    value={form.license}
                    onChange={onChange}
                    className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 uppercase transition-all focus:border-primary focus:ring-primary"
                    placeholder="12/345678"
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400">
                    id_card
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t("info.cin")}{" "}
                  <span className="font-normal text-slate-400">
                    ({t("common.optional")})
                  </span>
                </label>
                <input
                  name="cin"
                  value={form.cin}
                  onChange={onChange}
                  className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 uppercase transition-all focus:border-primary focus:ring-primary"
                  placeholder="AB123456"
                  type="text"
                />
              </div>

              <div className="mt-4 flex flex-col gap-4 md:col-span-2">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    name="accept"
                    checked={form.accept}
                    onChange={onChange}
                    required
                    className="mt-1 rounded border-slate-300 text-primary focus:ring-primary"
                    type="checkbox"
                  />
                  <span className="text-sm leading-snug text-slate-600 dark:text-slate-400">
                    {t("info.acceptPrivacy")}
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 pt-6 md:col-span-2 dark:border-slate-700">
                <Link
                  to={`/details/${id}${qs ? `?${qs}` : ""}`}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-600 transition-colors hover:text-primary"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  {t("common.back")}
                </Link>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-primary px-10 py-3 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary/90"
                >
                  {t("common.continue")}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </form>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-900">
                {car?.img ? (
                  <img src={car.img} alt={car.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined text-6xl">directions_car</span>
                  </div>
                )}
                <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary shadow-sm backdrop-blur-sm">
                  {car?.fuel || "Premium"}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-xl font-black">{car?.name || t("details.vehicle")}</h4>
                  <div className="flex items-center gap-1 text-amber-500">
                    <span className="material-symbols-outlined text-sm fill-amber-500">star</span>
                    <span className="text-sm font-bold">{car?.rating ?? 4.8}</span>
                  </div>
                </div>

                <div className="mb-4 flex w-fit items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1 dark:bg-slate-800">
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                    {car?.agency || "AGENCE"}
                  </span>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                    <span className="material-symbols-outlined text-sm">settings</span>
                    {car?.gearbox || "Manuelle"}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                    <span className="material-symbols-outlined text-sm">person</span>
                    {car?.seats || 5} {t("common.seats")}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                    <span className="material-symbols-outlined text-sm">local_gas_station</span>
                    {car?.fuel || "Diesel"}
                  </div>
                </div>

                <div className="mb-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                    {t("info.rentalDates")}
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">{t("info.pickup")}:</span>
                      <span className="font-medium">
                        {sp.get("from")} {t("common.at")} {sp.get("fromTime")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">{t("info.return")}:</span>
                      <span className="font-medium">
                        {sp.get("to")} {t("common.at")} {sp.get("toTime")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 dark:border-slate-700">
                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        {t("summary.pricePerDay")}
                      </span>
                      <span className="text-2xl font-black text-primary">
                        {car?.pricePerDay ?? 0} {t("currency.mad")}
                      </span>
                    </div>
                    <span className="text-[10px] italic text-slate-400">
                      {t("info.deposit")}: 5,000 {t("currency.mad")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-primary/10 bg-primary/5 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm">
                <span className="material-symbols-outlined text-primary">location_on</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-tighter text-slate-500">
                  {t("info.pickupAgency")}
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {t("info.pickupAgencyPlace")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}