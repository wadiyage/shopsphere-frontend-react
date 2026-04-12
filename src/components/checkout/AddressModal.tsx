import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { createPortal } from "react-dom"

import type { Address } from "../../types/models/Address"
import type { AddressRequest } from "../../services/addressService"

export type AddressFormValues = AddressRequest

type Props = {
    open: boolean
    initialAddress: Address | null
    isSaving?: boolean
    error?: string | null
    onClose: () => void
    onSubmit: (payload: AddressFormValues) => Promise<void>
}

const AddressModal = ({
    open,
    initialAddress,
    isSaving = false,
    error,
    onClose,
    onSubmit,
}: Props) => {
    const [formState, setFormState] = useState<AddressFormValues>({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        postalCode: "",
        isDefault: false,
    })
    const [validationError, setValidationError] = useState<string | null>(null)

    useEffect(() => {
        if (!open) {
            setValidationError(null)
            return
        }

        if (initialAddress) {
            setFormState({
                fullName: initialAddress.fullName,
                phone: initialAddress.phone,
                addressLine: initialAddress.addressLine,
                city: initialAddress.city,
                state: initialAddress.state,
                postalCode: initialAddress.postalCode,
                isDefault: initialAddress?.isDefault ?? false,
            })
        } else {
            setFormState({
                fullName: "",
                phone: "",
                addressLine: "",
                city: "",
                state: "",
                postalCode: "",
                isDefault: false,
            })
        }
    }, [open, initialAddress])

    if (!open) {
        return null
    }

    const validate = () => {
        if (!formState.fullName.trim()) return "Full name is required."
        if (!formState.phone.trim()) return "Phone number is required."
        if (!formState.addressLine.trim()) return "Address line is required."
        if (!formState.city.trim()) return "City is required."
        if (!formState.state.trim()) return "State is required."
        if (!formState.postalCode.trim()) return "Postal code is required."
        return null
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const validationMessage = validate()
        if (validationMessage) {
            setValidationError(validationMessage)
            return
        }

        setValidationError(null)
        await onSubmit(formState)
        console.log("Submitting Address: ", formState)
    }

    const handleFieldChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = event.target
        setFormState((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6">
            <div className="w-full max-w-2xl overflow-hidden rounded-4xl bg-white p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-950">
                            {initialAddress ? "Edit address" : "Add new address"}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Save a delivery address for this order and future checkouts.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
                    >
                        Close
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2 text-sm font-medium text-slate-700">
                            Full name
                            <input
                                name="fullName"
                                value={formState.fullName}
                                onChange={handleFieldChange}
                                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />
                        </label>
                        <label className="space-y-2 text-sm font-medium text-slate-700">
                            Phone
                            <input
                                name="phone"
                                type="tel"
                                value={formState.phone}
                                onChange={handleFieldChange}
                                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />
                        </label>
                    </div>

                    <label className="space-y-2 text-sm font-medium text-slate-700">
                        Address line
                        <input
                            name="addressLine"
                            value={formState.addressLine}
                            onChange={handleFieldChange}
                            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                        />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <label className="space-y-2 text-sm font-medium text-slate-700">
                            City
                            <input
                                name="city"
                                value={formState.city}
                                onChange={handleFieldChange}
                                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />
                        </label>
                        <label className="space-y-2 text-sm font-medium text-slate-700">
                            State
                            <input
                                name="state"
                                value={formState.state}
                                onChange={handleFieldChange}
                                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />
                        </label>
                        <label className="space-y-2 text-sm font-medium text-slate-700">
                            Postal code
                            <input
                                name="postalCode"
                                value={formState.postalCode}
                                onChange={handleFieldChange}
                                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />
                        </label>
                    </div>

                    <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-700">
                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={formState.isDefault}
                            onChange={handleFieldChange}
                            className="h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                        />
                        Use as default shipping address
                    </label>

                    {(validationError || error) && (
                        <p className="rounded-3xl bg-red-50 px-4 py-3 text-sm text-red-700">
                            {validationError || error}
                        </p>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            disabled={isSaving}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving address..." : initialAddress ? "Update address" : "Add address"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddressModal
