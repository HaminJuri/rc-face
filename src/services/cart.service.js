import http from "./http.config";

export const addToCart = ({ data, token }) => {
    return http({ url: "/cart/increment", data, method: "POST", headers: { token } });
};

export const INCREMENT = ({ data, token }) => {
    return http({ url: "/cart/increment", data, method: "POST", headers: { token } });
};

export const DECREMENT = ({ data, token }) => {
    return http({ url: "/cart/decrement", data, method: "POST", headers: { token } });
};

export const DESTINATION = ({ data, token }) => {
    return http({ url: "/cart/destination", data, method: "PATCH", headers: { token } });
};

export const requestOrderService = ({ token }) => {
    return http({ url: "/cart/order/request", method: "POST", headers: { token } });
};

export const calcFreightService = ({ adrID, token }) => {
    return http({ url: `/cart/calc-freight/${adrID}`, method: "PATCH", headers: { token } });
};

export const checkoutService = async ({ orderId }) => {
    return http({ url: `/cart/order/checkout/${orderId}`, method: "GET" });
};

export const getOrderListService = async ({ token, orderStatus }) => {
    return http({ url: `/cart/order/${orderStatus}`, method: "GET", headers: { token } });
};
