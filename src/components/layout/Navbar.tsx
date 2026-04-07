import { Fragment, useEffect, useState } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

import { useAuth } from '../../context/AuthContext'

import logo from '../../assets/logo/shopsphere.png'

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' }
]

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  const { cartItems } = useCart()
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigate = useNavigate()

  return (
    <Disclosure as="nav" className={classNames(
      'sticky top-0 z-50 transition-all duration-300',
      'border-b border-white/10 backdrop-blur-xl',
      isScrolled ? 'bg-slate-950/95 shadow-2xl shadow-slate-950/20' : 'bg-slate-700'
    )}>
      {({ open }) => (
        <>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <NavLink to="/" className="flex items-center gap-3 rounded-2xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-white/10 shadow-sm shadow-slate-950/10">
                  <img src={logo} alt="ShopSphere" className="h-8 w-auto" />
                </div>
                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="text-2xl font-semibold tracking-widest text-slate-100">ShopSphere <span className="text-xs text-rose-500">LK</span></span>
                  <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Your Next Favourite Store</span>
                </div>
              </NavLink>
            </div>

            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    classNames(
                      'relative inline-flex items-center text-sm font-semibold uppercase transition duration-200',
                      isActive
                        ? 'text-white'
                        : 'text-slate-300 hover:text-white'
                    )
                  }
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-1">
                      {item.name}
                      {isActive ? <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-slate-100" /> : null}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden lg:flex lg:items-center lg:gap-3">
                <div className="relative">
                  <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="search"
                    placeholder="Search products"
                    aria-label="Search products"
                    className="h-11 w-72 rounded-full border border-white/10 bg-slate-950/70 px-11 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-slate-300/20 focus:ring-2 focus:ring-slate-500/20"
                  />
                </div>
              </div>

              <NavLink
                to="/user/cart"
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 transition duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-300/30"
                aria-label="View cart"
              >
                <ShoppingBagIcon className="h-5 w-5" aria-hidden="true" />
                <span className="pointer-events-none absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white shadow-sm shadow-rose-500/40">
                  {cartItemCount}
                </span>
              </NavLink>

              {!isAuthenticated ? (
                <NavLink
                  to="/login"
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-100 transition duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-300/30"
                >
                  Login
                </NavLink>
              ) : (
                <Menu as="div" className="relative">
                  <MenuButton className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-300/30">
                    <span className="sr-only">Open profile menu</span>
                    <div className='h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium'>
                      {
                        user?.email?.charAt(0).toUpperCase() || 'U'
                      }
                    </div>
                  </MenuButton>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-50 mt-2 w-auto origin-top-right overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 py-2 shadow-2xl shadow-slate-950/30 backdrop-blur-xl ring-1 ring-white/5 focus:outline-none">
                      <div className='px-4 py-2 text-xs text-slate-400'>
                        Signed in as <span className='text-sm font-medium text-white truncate'>{user?.email}</span>
                      </div>
                      <div className='my-1 h-px bg-white/10' />
                      <MenuItem>
                        {({ focus }) => (
                          <NavLink
                            to="/user/orders"
                            className={classNames(
                              'block px-4 py-2 text-sm transition',
                              focus ? 'bg-white/5 text-white' : 'text-slate-300'
                            )}
                          >
                            My Orders
                          </NavLink>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <NavLink
                            to="/settings"
                            className={classNames(
                              'block px-4 py-2 text-sm transition',
                              focus ? 'bg-white/5 text-white' : 'text-slate-300'
                            )}
                          >
                            Profile
                          </NavLink>
                        )}
                      </MenuItem>
                      <div className='my-1 h-px bg-white/10' />
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            onClick={() => {
                              logout()
                              navigate('/login')
                            }}
                            className={classNames(
                              'block w-full text-left px-4 py-2 text-sm transition',
                              focus ? 'bg-white/5 text-white' : 'text-slate-300'
                            )}
                          >
                            Logout
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              )}

              <DisclosureButton className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-300/30 lg:hidden">
                <span className="sr-only">Open main menu</span>
                {open ? <XMarkIcon className="h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
              </DisclosureButton>
            </div>
          </div>

          <DisclosurePanel className="lg:hidden border-t border-white/10 bg-slate-950/95 px-4 py-5 backdrop-blur-xl">
            <div className="space-y-4">
              <div className="relative">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="search"
                  placeholder="Search products"
                  aria-label="Mobile search"
                  className="h-11 w-full rounded-full border border-white/10 bg-slate-950/70 px-11 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-slate-300/20 focus:ring-2 focus:ring-slate-500/20"
                />
              </div>

              <div className="space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      classNames(
                        'block rounded-3xl px-4 py-3 text-sm font-semibold transition duration-200',
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-sm font-medium text-slate-100">Cart</span>
                <span className="inline-flex items-center rounded-full bg-rose-500 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                  {cartItemCount}
                </span>
              </div>

              <div>
                {!isAuthenticated ? (
                  <NavLink
                    to="/login"
                    className="block rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-slate-100 transition duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    Login
                  </NavLink>
                ) : (
                  <button
                    onClick={() => {
                      logout()
                      navigate('/login')
                    }}
                    className={classNames(
                      'block w-full text-left px-4 py-2 text-sm transition'
                    )}
                  >
                    Logout
                  </button>

                )}
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
