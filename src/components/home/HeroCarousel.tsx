import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import image1 from "../../assets/images/hero/microsoft-edge-z51MPaW5VfM-unsplash.jpg";
import image2 from "../../assets/images/hero/surface-X1GZqv-F7Tw-unsplash.jpg";
import image3 from "../../assets/images/hero/v-h-Iywgu-a_eCs-unsplash.jpg";

import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Industrial Machinery Solutions",
    subtitle: "Optimize factory operations with smarter industrial tools.",
    image: image1,
    ctaText: "Shop products",
    ctaLink: "/products",
  },
  {
    title: "Premium Safety Equipment",
    subtitle: "Durable gear built for long-term protection and compliance.",
    image: image2,
    ctaText: "View collection",
    ctaLink: "/products",
  },
  {
    title: "Power Tools for Professionals",
    subtitle: "Precision power tools designed for every trade and workshop.",
    image: image3,
    ctaText: "Request a quote",
    ctaLink: "/contact",
  },
];

const HeroCarousel = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full min-h-105 md:min-h-130"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full min-h-105">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-slate-950/30 to-transparent" />
              <div className="relative z-10 flex h-full items-center px-6 py-10 sm:px-12 lg:px-20">
                <div className="max-w-2xl text-white">
                  <p className="mb-4 inline-flex rounded-full bg-cyan-500/15 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200">
                    Featured collection
                  </p>
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
                    {slide.subtitle}
                  </p>
                  <button
                    type="button"
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-cyan-500 px-7 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400"
                    onClick={() => navigate(slide.ctaLink)}
                  >
                    {slide.ctaText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroCarousel;
