"use client";
import { useQuery } from "@tanstack/react-query";
import get2DesktopEventsService from "@/services/desktopEvents.service";

const fetchDesktopEvents = async () => {
    try {
        const response = await get2DesktopEventsService();
        return response?.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

const useDesktopEvents = () => {
    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["get-desktop-events"],
        queryFn: fetchDesktopEvents,
        refetchOnWindowFocus: false,
    });

    return { data, isSuccess, isLoading };
};
export default useDesktopEvents;
