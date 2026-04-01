import type React from "react"

const NewsletterSection: React.FC = () => {
    return (
        <section className="rounded-[2rem] bg-slate-950 text-slate-50 overflow-hidden px-6 py-10 sm:px-10 sm:py-14 shadow-2xl shadow-slate-950/10 transition-all duration-500 hover:scale-[1.01]">
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.2),_transparent_30%)]" />
                <div className="relative max-w-6xl mx-auto grid gap-8 md:grid-cols-[1.3fr_0.7fr] items-center">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Stay in the loop</p>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                            Get product drops, deals, and buying tips before anyone else.
                        </h2>
                        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl leading-7">
                            Subscribe to our newsletter for early access to promotions, curated recommendations, and restock alerts.
                        </p>
                    </div>

                    <form className="flex flex-col gap-3 sm:flex-row items-stretch">
                        <label htmlFor="newsletter-email" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="newsletter-email"
                            type="email"
                            placeholder="Enter your email"
                            className="min-w-0 flex-1 rounded-3xl border border-slate-700 bg-slate-900/70 px-5 py-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                        />
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-3xl bg-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default NewsletterSection