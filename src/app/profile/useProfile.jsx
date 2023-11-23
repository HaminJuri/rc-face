"use client";
import { useQuery } from "@tanstack/react-query";
import http from "@/services/http.config";

const fetchUser = ({ queryKey }) => {
    return http({ url: "/user", method: "GET", headers: { token: queryKey[1] } });
};

export default function useProfile(token) {
    const { data, isError, isLoading, error, refetch, isSuccess } = useQuery({
        queryKey: ["get-user", token],
        queryFn: fetchUser,
        refetchOnWindowFocus: false,
    });

    return { data, isError, isLoading, error, refetch, isSuccess };
}
