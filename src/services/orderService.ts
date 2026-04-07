import API from "./api"

export const getMyOrders = () => {
    return API.get('/user/orders')
}