import http from "./http.config";

export const getCategoriesAndBrandsService = () => {
    return http({ url: "/category", method: "GET" });
};

export const getCategoryListColor = () => {
    return http({ url: "/category/list-color", method: "GET" });
};
