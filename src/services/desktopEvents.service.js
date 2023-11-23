import http from "./http.config";

const get2DesktopEventsService = () => {
    return http({ url: "/desktop-events" });
};

export default get2DesktopEventsService;
