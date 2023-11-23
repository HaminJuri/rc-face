import http from "./http.config";
const getSlidesAndEventsService = () => {
    return http.get("/slides-and-events").then((data) => data.data);
};

export default getSlidesAndEventsService;
