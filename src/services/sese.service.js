import http from "./http.config";

const getSeSeService = () => {
    return http({ url: "/sese" });
};

export default getSeSeService;
