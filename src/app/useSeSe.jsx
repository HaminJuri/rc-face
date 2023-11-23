"use client";
import { useQuery } from "@tanstack/react-query";
import getSeSeService from "@/services/sese.service";

const fetchSeSe = async () => {
    try {
        const response = await getSeSeService();
        return response?.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

const useSeSe = () => {
    const { data, isSuccess, refetch, isLoading } = useQuery({
        queryKey: ["get-search-section"],
        queryFn: fetchSeSe,
        refetchOnWindowFocus: false,
    });

    return { data, isSuccess, refetch, isLoading };
};
export default useSeSe;
