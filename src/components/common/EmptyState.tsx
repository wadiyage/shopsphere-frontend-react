const EmptyState = ({ message }: { message?: string}) => (
  <div className='rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm'>
    <p className='text-lg font-semibold text-slate-700'>
      { message }
    </p>
  </div>
)

export default EmptyState