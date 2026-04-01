import { Link } from "react-router-dom"

import promoBanner from '../../assets/banner/3264375.jpg'

const PromoBanner = () => {
    return (
        <section className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-9xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-500 to-blue-300 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-center">
                    <div className="max-w-2xl text-center md:text-left">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">Special Offer!</h2>
                        <p className="text-lg md:text-xl mb-6">Get up to 50% off on all products. Limited time offer.</p>
                        <Link 
                            to="/products" 
                            className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition duration-300">
                            Shop Now
                        </Link>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <img 
                            src={promoBanner}
                            alt="Promotion Banner" 
                            className="h-72 w-auto object-cover rounded-lg shadow-lg"
                        />

                    </div>
                </div>

            </div>

        </section>
    )
}

export default PromoBanner