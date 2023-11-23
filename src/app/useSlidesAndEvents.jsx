"use client";
import getSlidesAndEventsService from "@/services/slideAndEvents.service";
import { useQuery } from "@tanstack/react-query";

const useSlidesAndEvents = () => {
    const { data, isError, isFetching, error, refetch, isSuccess } = useQuery({
        queryKey: ["get-slides-and-events"],
        queryFn: getSlidesAndEventsService,
        refetchOnWindowFocus: false,
    });

    return { data, isError, isFetching, error, refetch, isSuccess };
};
export default useSlidesAndEvents;
