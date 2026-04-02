const LoadingState = ({ message = "Loading..."} : { message?: string }) => (
  <div className='rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm'>
    <p className='text-lg font-medium text-slate-700'>
      { message }
    </p>
  </div>
)

export default LoadingState