import type { CheckoutPayload, CheckoutResponse } from "../types/models/Checkout"
import API from "./api"

export const checkout = async (
    payload: CheckoutPayload
): Promise<CheckoutResponse> => {
        try {
            const { data } = await API.post<CheckoutResponse>("/user/checkout", payload)
            return data
        } catch (err: any) {
            throw new Error(
                err.response?.data?.message || "Checkout failed"
            )
        }
}