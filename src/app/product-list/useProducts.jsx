"use client";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import http from "@/services/http.config";

const fetchProducts = async (page, params) => {
    let url = `/products?page=${page}`;
    const { sortBy, search, categories, brands } = params;
    if (categories) {
        url += `&categories=${encodeURIComponent(categories)}`;
    }
    if (brands) {
        url += `&brands=${encodeURIComponent(brands)}`;
    }
    if (search) {
        url += `&search=${encodeURIComponent(search)}`;
    }
    if (sortBy) {
        url += `&sortBy=${encodeURIComponent(sortBy)}`;
    }
    try {
        const response = await http({ url, method: "GET" });
        return response?.data?.docs;
    } catch (error) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }
};

export default function useProducts(searchQuery) {
    const { ref, inView } = useInView();

    const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage, refetch, isRefetching } =
        useInfiniteQuery({
            queryKey: ["products", searchQuery],
            queryFn: ({ pageParam = 1, queryKey }) => fetchProducts(pageParam, queryKey[1]),
            getNextPageParam: (lastPage, allPages) => {
                const nextPage = lastPage.length === 40 ? allPages.length + 1 : undefined;
                return nextPage;
            },
            refetchOnWindowFocus: false,
        });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    return {
        data,
        isSuccess,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetch,
        ref,
        inView,
        isRefetching,
    };
}
