import type React from "react";

const NewsletterSection: React.FC = () => {
  return (
    <section className="rounded-4xl border border-slate-200 bg-slate-50 px-6 py-10 shadow-sm sm:px-10 sm:py-14">
      <div className="max-w-6xl mx-auto grid gap-8 items-center md:grid-cols-[1.4fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Stay in the loop</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Get product drops, deals, and buying tips before anyone else.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 max-w-xl">
            Subscribe to our newsletter for early access to promotions, curated recommendations, and restock alerts.
          </p>
        </div>

        <form className="flex flex-col gap-4 sm:flex-row items-stretch">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email"
            className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-5 py-4 text-sm text-slate-950 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
          <button
            type="submit"
            className="inline-flex justify-center rounded-full bg-linear-to-r from-slate-950 via-slate-800 to-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection