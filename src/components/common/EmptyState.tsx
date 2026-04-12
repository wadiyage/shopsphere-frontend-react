type EmptyStateProps = {
  message?: string
  buttonLabel?: string
  onButtonClick?: () => void
}

const EmptyState = ({ message, buttonLabel, onButtonClick }: EmptyStateProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-3xl">
      ???
    </div>
    <p className="mt-6 text-lg font-semibold text-slate-700">{message}</p>
    {buttonLabel && onButtonClick && (
      <button
        type="button"
        onClick={onButtonClick}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        {buttonLabel}
      </button>
    )}
  </div>
)

export default EmptyState
