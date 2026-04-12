import API from "./api"

export const getMyOrders = () => {
    return API.get('/user/orders')
}

export const getOrderById = (orderId: number) => {
    return API.get(`/user/orders/${orderId}`)
}
