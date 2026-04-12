import type { Address } from "../types/models/Address"
import API from "./api"

export const getMyAddresses = async (): Promise<Address[]> => {
    const { data } = await API.get<Address[]>("/user/addresses")
    return data
}