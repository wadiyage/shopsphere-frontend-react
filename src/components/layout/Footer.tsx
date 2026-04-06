import { Link } from 'react-router-dom'
import { ArrowUpIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import logo from '../../assets/logo/shopsphere.png'

const quickLinks = [
    { title: 'All Products', path: '/products' },
    { title: 'Categories', path: '/categories' }
]

const supportLinks = [
    { title: 'Help Center', path: '/help' },
    { title: 'Contact Us', path: '/contact' }
]

const socialLinks = [
    {
        name: 'Twitter',
        href: 'https://twitter.com',
        label: 'Follow ShopSphere on Twitter',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                    d="M8 19c7.333 0 11.333-6.082 11.333-11.333 0-.172 0-.344-.012-.514A8.12 8.12 0 0 0 21 4.28a8.38 8.38 0 0 1-2.356.645 4.108 4.108 0 0 0 1.805-2.27 8.24 8.24 0 0 1-2.605.994A4.114 4.114 0 0 0 15.447 3c-2.27 0-4.108 1.838-4.108 4.108 0 .322.036.636.106.937A11.66 11.66 0 0 1 3 4.963a4.105 4.105 0 0 0 1.27 5.482 4.07 4.07 0 0 1-1.86-.514v.052c0 2.03 1.444 3.724 3.356 4.108a4.11 4.11 0 0 1-1.853.07 4.112 4.112 0 0 0 3.835 2.852A8.25 8.25 0 0 1 3 17.29a11.615 11.615 0 0 0 6.29 1.84"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: 'https://instagram.com',
        label: 'Follow ShopSphere on Instagram',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                <path
                    d="M16.5 7.5h.01M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        name: 'Facebook',
        href: 'https://facebook.com',
        label: 'Follow ShopSphere on Facebook',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M22 12.07C22 6.49 17.52 2 12 2S2 6.49 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.02H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.25 0-1.64.78-1.64 1.57v1.88h2.79l-.45 2.91h-2.34V22c4.78-.8 8.44-4.94 8.44-9.93z" />
            </svg>
        ),
    }
]

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-slate-950 text-slate-300">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
                    <div className="space-y-10">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-sm shadow-slate-950/20">
                                <img src={logo} alt="ShopSphere logo" className="h-8 w-auto" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-white">ShopSphere LK</p>
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Your Next Favourite Store</p>
                            </div>
                        </div>
                        <p className="max-w-sm text-sm leading-7 text-slate-400">
                            Your trusted platform for industrial and electronic products. Discover premium deals, fast checkout, and curated collections built for modern shopping.
                        </p>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 shadow-sm shadow-slate-950/20">
                            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
                            <span>Premium customer care, fast delivery</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Quick Links</h2>
                        <nav aria-label="Quick links" className="mt-6">
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.title}>
                                        <Link
                                            to={link.path}
                                            className="text-sm text-slate-300 transition duration-200 hover:text-white hover:underline"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Support</h2>
                        <nav aria-label="Support links" className="mt-6">
                            <ul className="space-y-3">
                                {supportLinks.map((link) => (
                                    <li key={link.title}>
                                        <Link
                                            to={link.path}
                                            className="text-sm text-slate-300 transition duration-200 hover:text-white hover:underline"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-sm shadow-slate-950/20 backdrop-blur-xl">
                        <div>
                            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Contact</h2>
                            <div className="mt-5 space-y-4 text-sm text-slate-400">
                                <div className="flex items-center gap-3">
                                    <EnvelopeIcon className="h-5 w-5 text-rose-500" aria-hidden="true" />
                                    <a
                                        href="mailto:support@shopsphere.com"
                                        className="transition duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                                    >
                                        support@shopsphere.com
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <PhoneIcon className="h-5 w-5 text-rose-500" aria-hidden="true" />
                                    <a
                                        href="tel:+94778051829"
                                        className="transition duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                                    >
                                        (+94) 77 80 51 829
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-white">Stay in the loop</p>
                                <button
                                    type="button"
                                    onClick={scrollToTop}
                                    aria-label="Back to top"
                                    title="Back to top"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                                >
                                    <ArrowUpIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                            <form className="space-y-3">
                                <label htmlFor="footer-newsletter" className="sr-only">
                                    Email address
                                </label>
                                <div className="flex h-12 overflow-hidden rounded-full border border-white/10 bg-slate-950 text-sm transition duration-200 focus-within:border-rose-500/30">
                                    <input
                                        id="footer-newsletter"
                                        type="email"
                                        placeholder="Enter your email"
                                        aria-label="Newsletter email"
                                        className="min-w-0 flex-1 border-none bg-transparent px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded-full bg-rose-500 px-4 text-sm font-semibold text-white transition duration-200 hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Follow us</p>
                            <div className="mt-4 flex items-center gap-3">
                                {socialLinks.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={item.label}
                                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                                    >
                                        {item.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-500 sm:flex sm:items-center sm:justify-between">
                    <p>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-4 sm:mt-0">
                        <Link to="/legal" className="transition duration-200 hover:text-white hover:underline">
                            Privacy Policy
                        </Link>
                        <Link to="/privacy" className="transition duration-200 hover:text-white hover:underline">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer