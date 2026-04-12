import type { Address } from "../types/models/Address"
import API from "./api"

export type AddressRequest = {
  fullName: string
  phone: string
  addressLine: string
  city: string
  state: string
  postalCode: string
  isDefault: boolean
}

export const getMyAddresses = async (): Promise<Address[]> => {
  try {
    const { data } = await API.get<Address[]>("/user/addresses")
    return data
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Unable to load addresses.")
  }
}

export const createAddress = async (
  payload: AddressRequest
): Promise<Address> => {
  try {
    const { data } = await API.post<Address>("/user/addresses", payload)
    return data
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Unable to add address.")
  }
}

export const updateAddress = async (
  addressId: number,
  payload: AddressRequest
): Promise<Address> => {
  try {
    const { data } = await API.put<Address>(`/user/addresses/${addressId}`, payload)
    return data
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Unable to update address.")
  }
}

export const deleteAddress = async (addressId: number): Promise<void> => {
  try {
    await API.delete(`/user/addresses/${addressId}`)
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Unable to delete address.")
  }
}

export const setDefaultAddress = async (addressId: number): Promise<void> => {
  try {
    await API.put(`/user/addresses/${addressId}/default`)
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Unable to update default address.")
  }
}
