const Rating = ({ rating }: { rating?: number }) => {
    if (!rating) {
      return <span className="text-sm text-slate-500">No rating available</span>
    }

    const filledStars = Math.round(Math.min(5, Math.max(0, rating)))
    const stars = Array.from({ length: filledStars }, () => '★').join('')
    const emptyStars = Array.from({ length: 5 - filledStars }, () => '☆').join('')

    return (
      <div className="flex items-center gap-2 text-sm font-medium text-amber-500">
        <span>{stars}</span>
        <span className="text-slate-500">{emptyStars}</span>
        <span className="text-slate-700 ml-2">{rating.toFixed(1)} / 5</span>
      </div>
    )
}

export default Rating