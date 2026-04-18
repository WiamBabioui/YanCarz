import { rentalTerms } from "../data/terms";

export default function TermsModal({ open, onClose, onAccept }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100 dark:bg-slate-900 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Informations légales
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              Conditions générales de vente
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Merci de lire attentivement les conditions avant de confirmer votre réservation.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Fermer"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
              close
            </span>
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
          <div className="mb-6 rounded-xl bg-primary/5 p-4 border border-primary/10">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">info</span>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                En validant ces conditions, vous acceptez les règles de location,
                les obligations du conducteur et les modalités de paiement,
                d’annulation et de responsabilité.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {rentalTerms.map((term) => (
              <div
                key={term.id}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <h4 className="mb-2 text-base font-bold text-slate-900 dark:text-white">
                  {term.id}. {term.title}
                </h4>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {term.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Fermer
          </button>

          <button
            type="button"
            onClick={onAccept}
            className="flex-1 rounded-xl bg-primary px-4 py-3 font-bold text-white transition hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            J&apos;accepte
          </button>
        </div>
      </div>
    </div>
  );
}