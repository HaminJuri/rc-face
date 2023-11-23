"use client";
import { useQuery } from "@tanstack/react-query";
import getHorsemenService from "@/services/horseMen.service";

const useHorseMen = () => {
    const { data, isError, isFetching, error, refetch, isSuccess } = useQuery({
        queryKey: ["get-horsemen"],
        queryFn: getHorsemenService,
        refetchOnWindowFocus: false,
    });

    return { data, isError, isFetching, error, refetch, isSuccess };
};

export default useHorseMen;
