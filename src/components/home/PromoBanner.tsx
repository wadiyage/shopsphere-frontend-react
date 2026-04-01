import { Link } from "react-router-dom";

import promoBanner from "../../assets/banner/3264375.jpg";

const PromoBanner = () => {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto rounded-4xl bg-linear-to-r from-slate-900 via-indigo-900 to-cyan-700 text-slate-50 overflow-hidden shadow-2xl shadow-slate-900/20 transition-all duration-500 hover:scale-[1.01]">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] items-center px-6 py-10 sm:px-10 sm:py-14">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Limited time savings</p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Up to 50% off select industrial favorites.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
              Shop the latest arrivals with premium quality and fast delivery. This offer includes tools, safety gear, and equipment built to last.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300"
            >
              Shop the offer
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950/10 p-4">
            <img
              src={promoBanner}
              alt="Promotion Banner"
              className="h-full w-full rounded-3xl object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;