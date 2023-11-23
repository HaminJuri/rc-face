"use client";
import { useQuery } from "@tanstack/react-query";
import { get2EventService } from "@/services/event.service";
import { getCookie } from "cookies-next";

const fetchEvents = async () => {
    try {
        const response = await get2EventService();
        return response?.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

const useEvents = () => {
    const { data, isSuccess, refetch, isLoading } = useQuery({
        queryKey: ["get-events"],
        queryFn: fetchEvents,
        refetchOnWindowFocus: false,
    });

    return { data, isSuccess, refetch, isLoading };
};
export default useEvents;
