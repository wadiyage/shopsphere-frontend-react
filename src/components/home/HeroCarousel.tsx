import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import image1 from '../../assets/images/hero/microsoft-edge-z51MPaW5VfM-unsplash.jpg'
import image2 from '../../assets/images/hero/surface-X1GZqv-F7Tw-unsplash.jpg'
import image3 from '../../assets/images/hero/v-h-Iywgu-a_eCs-unsplash.jpg'

import { useNavigate } from 'react-router-dom';

const slides = [
  {
    title: "Industrial Machinery Solutions",
    subtitle: "Optimize your factory operations efficiently",
    image: image1,
    ctaText: "Shop Products",
    ctaLink: "/products"
  },
  {
    title: "Premium Safety Equipment",
    subtitle: "Durable products engineered for industrial standards",
    image: image2,
    ctaText: "View Collection",
    ctaLink: "/products"
  },
  {
    title: "Power Tools for Professionals",
    subtitle: "Tools built for professionals, by professionals",
    image: image3,
    ctaText: "Request a Quote",
    ctaLink: "/contact"
  }
]

const HeroCarousel = () => {
    const navigate = useNavigate();

    return (
        <section className=''>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className='w-full h-[400px] md:h-[500px]'
            >
                {
                    slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className='relative h-full'>
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className='absolute inset-0 w-full h-full object-cover'
                                />
                                <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-black/30'></div>
                                <div className='relative z-10 flex flex-col justify-center h-full px-10 md:px-20 text-white'>
                                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                                        {slide.title}
                                    </h1>
                                    <p className='text-lg md:text-xl mb-6'>
                                        {slide.subtitle}
                                    </p>
                                    <button 
                                        className='bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-lg w-fit text-lg font-semibold transition duration-300 ease-in-out'
                                        onClick={() => navigate(slide.ctaLink)}
                                    >
                                        {slide.ctaText}
                                    </button>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    )
}

export default HeroCarousel