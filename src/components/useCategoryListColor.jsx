"use client";
import { useQuery } from "@tanstack/react-query";
import { getCategoryListColor } from "@/services/category.service";

const fetchCategoryListColor = async () => {
    try {
        const response = await getCategoryListColor();
        return response?.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

const useCategoryListColor = () => {
    const { data, isSuccess, refetch, isLoading } = useQuery({
        queryKey: ["get-category-list-color"],
        queryFn: fetchCategoryListColor,
        refetchOnWindowFocus: false,
    });

    return { data, isSuccess, refetch, isLoading };
};
export default useCategoryListColor;
