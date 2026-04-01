import { Link } from "react-router-dom";

import promoBanner from "../../assets/banner/3264375.jpg";

const PromoBanner = () => {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white px-4 py-10 shadow-sm sm:px-6 sm:py-14">
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Limited time offer</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Precision gear with a refined edge.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Discover a carefully selected range of industrial essentials with elegant design, reliable performance, and quiet confidence.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            See the collection
          </Link>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-sm">
          <img
            src={promoBanner}
            alt="Premium promo"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;