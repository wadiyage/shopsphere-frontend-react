import { useEffect, useState, useCallback } from "react"
import { toast } from "react-toastify"
import type { Address } from "../types/models/Address"
import {
    getMyAddresses,
    createAddress,
    updateAddress,
    deleteAddress as deleteAddressApi,
    setDefaultAddress as setDefaultAddressApi,
} from "../services/addressService"

export type AddressRequest = Omit<Address, "id"> 

export const useAddresses = () => {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const loadAddresses = useCallback(async () => {
        setError(null)
        setIsLoading(true)

        try {
            const data = await getMyAddresses()
            setAddresses(data)

            const defaultAddress = data.find((address) => address.isDefault)
            const firstAddress = data[0]
            const nextSelectedId = defaultAddress?.id ?? firstAddress?.id ?? null

            setSelectedAddressId((currentSelected) => {
                if (currentSelected && data.some((address) => address.id === currentSelected)) {
                    return currentSelected
                }

                return nextSelectedId
            })
        } catch (fetchError) {
            console.error(fetchError)
            setError("Unable to load saved addresses. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        void loadAddresses()
    }, [loadAddresses])

    const refreshAddresses = useCallback(async () => {
        await loadAddresses()
    }, [loadAddresses])

    const selectAddress = (addressId: number) => {
        setSelectedAddressId(addressId)
    }

    const createNewAddress = async (payload: AddressRequest) => {
        setIsSaving(true)
        setError(null)

        try {
            const createdAddress = await createAddress(payload)
            toast.success("Address added successfully.")
            await refreshAddresses()
            setSelectedAddressId(createdAddress.id)
            return createdAddress
        } catch (createError: any) {
            console.error(createError)
            setError(createError.message || "Unable to save address.")
            toast.error(createError.message || "Unable to save address.")
            throw createError
        } finally {
            setIsSaving(false)
        }
    }

    const updateExistingAddress = async (addressId: number, payload: AddressRequest) => {
        setIsSaving(true)
        setError(null)

        try {
            const updatedAddress = await updateAddress(addressId, payload)
            toast.success("Address updated successfully.")
            await refreshAddresses()
            setSelectedAddressId(updatedAddress.id)
            return updatedAddress
        } catch (updateError: any) {
            console.error(updateError)
            setError(updateError.message || "Unable to update address.")
            toast.error(updateError.message || "Unable to update address.")
            throw updateError
        } finally {
            setIsSaving(false)
        }
    }

    const deleteAddress = async (addressId: number) => {
        setIsSaving(true)
        setError(null)

        try {
            await deleteAddressApi(addressId)
            toast.success("Address removed.")
            await refreshAddresses()
        } catch (deleteError: any) {
            console.error(deleteError)
            const message =
                deleteError.response?.data?.message ||
                deleteError.message ||
                "Unable to delete address."
            setError(message)
            toast.error(message)
            throw deleteError
        } finally {
            setIsSaving(false)
        }
    }

    const setAddressAsDefault = async (addressId: number) => {
        setIsSaving(true)
        setError(null)

        try {
            await setDefaultAddressApi(addressId)
            setAddresses((currentAddresses) =>
                currentAddresses.map((address) => ({
                    ...address,
                    isDefault: address.id === addressId,
                }))
            )
            setSelectedAddressId(addressId)
            toast.success("Default address updated.")
        } catch (defaultError: any) {
            console.error(defaultError)
            const message =
                defaultError.response?.data?.message ||
                defaultError.message ||
                "Unable to set default address."
            setError(message)
            toast.error(message)
            throw defaultError
        } finally {
            setIsSaving(false)
        }
    }

    return {
        addresses,
        selectedAddressId,
        selectedAddress: addresses.find((address) => address.id === selectedAddressId) ?? null,
        isLoading,
        isSaving,
        error,
        selectAddress,
        refreshAddresses,
        createNewAddress,
        updateExistingAddress,
        deleteAddress,
        setAddressAsDefault,
    }
}
