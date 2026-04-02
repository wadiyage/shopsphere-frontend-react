const ErrorState = ({ message }: { message: string }) => (
  <div className='rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-rose-700 shadow-sm'>
    <p className='text-lg font-semibold'>
      { message }
    </p>
  </div>
)

export default ErrorState