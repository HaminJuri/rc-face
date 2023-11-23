import http from "./http.config";
const getHorsemenService = () => {
    return http.get("/horse-men");
};

export default getHorsemenService;
