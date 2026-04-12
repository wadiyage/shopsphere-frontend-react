import { useEffect, useState } from "react"

import type { Address } from "../../types/models/Address"

import type { ChangeEvent, FormEvent } from "react"
import type { CheckoutPayload, PaymentMethod } from "../../types/models/Checkout"
import { getMyAddresses } from "../../services/addressService"

type Props = {
    onSubmit: (data: CheckoutPayload) => void
    isSubmitting: boolean
}

const CheckoutForm = ({ onSubmit, isSubmitting }: Props) => {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [form, setForm] = useState({
        addressId: 0,
        paymentMethod: 'CASH_ON_DELIVERY'
    })

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const data = await getMyAddresses()
                setAddresses(data)

                const defaultAddress = data.find(address => address.isDefault)
                if (defaultAddress) {
                    setForm(prev => ({
                        ...prev,
                        addressId: defaultAddress.id
                    }))
                }
            } catch (error) {
                console.error("Failed to fetch addresses:", error)
            }
        }

        fetchAddresses()
    }, [])

    const handlePaymentMethodChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            paymentMethod: e.target.value
        }))
    }

    const handleAddressChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            addressId: Number(e.target.value)
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!form.addressId) {
            alert("Please select a delivery address.")
            return
        }

        const payload: CheckoutPayload = {
            addressId: form.addressId,
            paymentMethod: form.paymentMethod as PaymentMethod
        }

        onSubmit(payload)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            <section className="rounded-3xl border p-6 bg-white">
                <h2 className="text-lg font-semibold">Select Delivery Address</h2>

                <div className="mt-4 space-y-3">
                    {addresses.map((address: Address) => (
                        <label key={address.id} className="block border p-4 rounded-xl">
                            <input
                                type="radio"
                                name="addressId"
                                value={address.id}
                                checked={form.addressId === address.id}
                                onChange={handleAddressChange}
                                required
                                className="mr-3"
                            />

                            <div className="inline-block">
                                <p className="font-medium">{address.fullName}</p>
                                <p>{address.addressLine}, {address.city}</p>
                                <p>{address.state}, {address.postalCode}</p>
                                <p>{address.phone}</p>

                                {address.isDefault && (
                                    <span className="text-xs text-green-600 font-medium">
                                        Default Address
                                    </span>
                                )}
                            </div>
                        </label>
                    ))}
                </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-950">Payment Method</h2>

                <div className="mt-6 space-y-3">

                    <label className="block border p-4 rounded-xl">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="CASH_ON_DELIVERY"
                            checked={form.paymentMethod === 'CASH_ON_DELIVERY'}
                            onChange={handlePaymentMethodChange}
                        />
                        <span className="ml-2">Cash on Delivery</span>
                    </label>

                    <label className="block border p-4 rounded-xl">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="CARD"
                            checked={form.paymentMethod === 'CARD'}
                            onChange={handlePaymentMethodChange}
                        />
                        <span className="ml-2">Credit/Debit Card (Coming Soon)</span>
                    </label>
                </div>
            </section>

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? (
                    <>
                        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-white" />
                        Processing...
                    </>
                ) : (
                    'Place Order'
                )}
            </button>
        </form>
    )
}

export default CheckoutForm