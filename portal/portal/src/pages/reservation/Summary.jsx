import { useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCarById } from "../../data/cars";
import TermsModal from "../../components/TermsModal";

export default function Summary() {
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
  const [showTerms, setShowTerms] = useState(false);

  function goConfirm() {
    if (!accept) return;
    navigate(`/reservation/confirm/${id}?${qs}`);
  }

  const conditions = [
    t("summary.conditions.deposit"),
    t("summary.conditions.driverAge"),
    t("summary.conditions.documents"),
    t("summary.conditions.freeCancellation"),
  ];

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-10">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {t("summary.stepLabel")}
              </span>
              <h2 className="text-xl font-bold">{t("booking.summary")}</h2>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
              {t("summary.done")}
            </span>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-primary/10">
            <div className="relative h-full w-2/3 rounded-full bg-primary">
              <div className="absolute inset-0 animate-pulse bg-white/20"></div>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span className="text-xs font-bold uppercase">{t("booking.client")}</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-sm">fact_check</span>
              <span className="text-xs font-bold uppercase">{t("booking.summary")}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="text-xs font-bold uppercase">{t("booking.confirmation")}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <span className="material-symbols-outlined text-primary">directions_car</span>
                {t("summary.selectedVehicle")}
              </h3>

              <div className="flex flex-col gap-6 md:flex-row">
                <div className="h-40 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 md:w-64">
                  {car?.img ? (
                    <img src={car.img} alt={car.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-6xl">directions_car</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-2xl font-black">{car?.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {t("confirm.agency")}: {car?.agency}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 dark:bg-slate-800">
                      <span className="material-symbols-outlined text-sm">settings</span>
                      {car?.gearbox}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 dark:bg-slate-800">
                      <span className="material-symbols-outlined text-sm">person</span>
                      {car?.seats} {t("common.seats")}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 dark:bg-slate-800">
                      <span className="material-symbols-outlined text-sm">local_gas_station</span>
                      {car?.fuel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <span className="material-symbols-outlined text-primary">person</span>
                {t("summary.driverInfo")}
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase text-slate-500">{t("info.fullName")}</p>
                  <p className="font-medium">{sp.get("fullName")}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">{t("info.phone")}</p>
                  <p className="font-medium">{sp.get("phone")}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">{t("login.email")}</p>
                  <p className="font-medium">{sp.get("email")}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">{t("info.license")}</p>
                  <p className="font-medium">{sp.get("license")}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <span className="material-symbols-outlined text-primary">gavel</span>
                {t("summary.rentalConditions")}
              </h3>

              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                {conditions.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="material-symbols-outlined mt-0.5 text-sm text-primary">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <input
                id="acceptTerms"
                className="mt-1 rounded border-slate-300 text-primary focus:ring-primary"
                type="checkbox"
                checked={accept}
                onChange={(e) => setAccept(e.target.checked)}
              />

              <div className="text-sm text-slate-600 dark:text-slate-400">
                <span>{t("summary.acceptPrefix")} </span>
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="font-medium text-primary hover:underline"
                >
                  {t("summary.saleTerms")}
                </button>
                <span> {t("summary.and")} </span>
                <button type="button" className="font-medium text-primary hover:underline">
                  {t("footer.privacy")}
                </button>
                <span>.</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to={`/reservation/info/${id}?${qs}`}
                className="flex-1 rounded-xl border border-slate-200 px-6 py-4 text-center font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {t("common.back")}
              </Link>

              <button
                onClick={goConfirm}
                className={`flex-1 rounded-xl bg-primary px-6 py-4 text-center font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 ${
                  accept ? "" : "pointer-events-none opacity-50"
                }`}
              >
                {t("common.continue")}
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                {t("summary.costsTitle")}
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    {t("summary.pricePerDay")} (x{days} {t("common.days")})
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {price} {t("currency.mad")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{t("summary.vat")}</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {tva} {t("currency.mad")}
                  </span>
                </div>

                <hr className="border-slate-100 dark:border-slate-800" />

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      {t("summary.totalToPay")}
                    </p>
                    <p className="text-3xl font-black tracking-tighter text-primary">
                      {total} {t("currency.mad")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-800">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined mt-0.5 text-primary">
                      calendar_today
                    </span>
                    <div>
                      <p className="text-xs text-slate-500">{t("summary.dates")}</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {sp.get("from")} {sp.get("fromTime")} – {sp.get("to")} {sp.get("toTime")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined mt-0.5 text-primary">
                      near_me
                    </span>
                    <div>
                      <p className="text-xs text-slate-500">{t("summary.place")}</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {t("summary.placeValue")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to={`/search?${qs}`}
                className="mt-2 text-center text-sm font-bold text-primary hover:underline"
              >
                {t("summary.editSearch")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <TermsModal
        open={showTerms}
        onClose={() => setShowTerms(false)}
        onAccept={() => {
          setAccept(true);
          setShowTerms(false);
        }}
      />
    </>
  );
}