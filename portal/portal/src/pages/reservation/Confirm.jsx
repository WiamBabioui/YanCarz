import { useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCarById } from "../../data/cars";

function makeRef() {
  const n = Math.floor(10000 + Math.random() * 89999);
  return `YAAN-${n}`;
}

export default function Confirm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [sp] = useSearchParams();
  const car = getCarById(id);

  const days = 3;
  const price = (car?.pricePerDay ?? 0) * days;
  const tva = Math.round(price * 0.2);
  const total = price + tva;

  const qs = useMemo(() => sp.toString(), [sp]);
  const [accept, setAccept] = useState(false);

  const bookingRef = useMemo(() => sp.get("ref") || makeRef(), [sp]);

  function confirm() {
    if (!accept) return;
    navigate(`/reservation/success?ref=${bookingRef}`);
  }

  const nextSteps = [
    {
      n: 1,
      title: t("confirm.steps.goAgency"),
      desc: t("confirm.steps.goAgencyDesc"),
    },
    {
      n: 2,
      title: t("confirm.steps.presentDocs"),
      desc: t("confirm.steps.presentDocsDesc"),
    },
    {
      n: 3,
      title: t("confirm.steps.giveCode"),
      desc: `${t("confirm.steps.giveCodeDesc")} ${bookingRef} (${t("confirm.required")})`,
    },
    {
      n: 4,
      title: t("confirm.steps.payDeposit"),
      desc: t("confirm.steps.payDepositDesc"),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-10">
      <div className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {t("confirm.stepLabel")}
            </span>
            <h2 className="text-xl font-bold">{t("confirm.title")}</h2>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
            {t("confirm.done")}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-primary/10">
          <div className="relative h-full w-full rounded-full bg-primary">
            <div className="absolute inset-0 animate-pulse bg-white/20"></div>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span className="text-xs font-bold uppercase">{t("booking.client")}</span>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span className="text-xs font-bold uppercase">{t("booking.summary")}</span>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span className="text-xs font-bold uppercase">{t("booking.confirmation")}</span>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-primary/20 bg-primary/10 p-6">
        <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">
          {t("confirm.codeToShow")}
        </p>
        <p className="text-4xl font-black tracking-wider text-primary">{bookingRef}</p>
        <p className="mt-2 text-xs text-slate-500">{t("confirm.keepCode")}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="flex flex-col gap-6 rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row">
            <div className="h-44 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 md:w-64">
              {car?.img ? (
                <img src={car.img} alt={car.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined text-6xl">directions_car</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                {t("confirm.vehicle")}
              </p>
              <h3 className="text-2xl font-black">{car?.name}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {t("confirm.agency")}: {car?.agency} — Casablanca
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 dark:bg-slate-800">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  {sp.get("from")} {sp.get("fromTime")} → {sp.get("to")} {sp.get("toTime")}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
              <span className="material-symbols-outlined text-primary">checklist</span>
              {t("confirm.nextSteps")}
            </h3>

            <div className="space-y-4">
              {nextSteps.map((s) => (
                <div key={s.n} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-black text-primary">{s.n}</span>
                  </div>
                  <div>
                    <p className="font-bold">{s.title}</p>
                    <p className="text-sm text-slate-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <input
              id="accept"
              className="mt-1 rounded border-slate-300 text-primary focus:ring-primary"
              type="checkbox"
              checked={accept}
              onChange={(e) => setAccept(e.target.checked)}
            />
            <label htmlFor="accept" className="text-sm text-slate-600 dark:text-slate-400">
              {t("confirm.acceptTerms")}
            </label>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to={`/reservation/summary/${id}?${qs}`}
              className="flex-1 rounded-xl border border-slate-200 px-6 py-4 text-center font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {t("common.back")}
            </Link>

            <button
              onClick={confirm}
              className={`flex-1 rounded-xl bg-primary px-6 py-4 text-center font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 ${
                accept ? "" : "pointer-events-none opacity-50"
              }`}
            >
              {t("confirm.confirmBooking")}
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-bold">{t("summary.costsTitle")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {t("confirm.duration")} (x{days})
                </span>
                <span className="font-semibold">{price}{t("currency.mad")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t("summary.vat")}</span>
                <span className="font-semibold">{tva}{t("currency.mad")}</span>
              </div>
              <hr className="border-slate-100 dark:border-slate-800" />
              <div className="flex items-end justify-between">
                <span className="font-bold text-slate-500">{t("search.total")}</span>
                <span className="text-2xl font-black text-primary">{total} {t("currency.mad")}</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-primary/10 bg-primary/5 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {t("common.important")}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {t("confirm.importantNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}