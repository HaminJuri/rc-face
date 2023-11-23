import http from "./http.config";

const addNewTicketService = (data) => {
    return http({ url: "/ticket", data, method: "POST" });
};

export default addNewTicketService;
