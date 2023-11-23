"use client";
import { useQuery } from "@tanstack/react-query";
import http from "@/services/http.config";

const fetchCart = ({ queryKey }) => {
    return http({ url: "/cart", method: "GET", headers: { token: queryKey[1] } });
};

export default function useCart(token) {
    const { data, isError, isLoading, error, refetch } = useQuery({
        queryKey: ["get-user", token],
        queryFn: fetchCart,
        refetchOnWindowFocus: true,
        retry: 1,
    });
    return { data, isError, isLoading, error, refetch };
}
