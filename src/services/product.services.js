import http from "./http.config";

export const getProduct = (serialNumber) => {
    return http.get(`/products/${serialNumber}`);
};
