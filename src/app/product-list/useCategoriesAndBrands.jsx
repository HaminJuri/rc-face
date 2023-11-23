"use client";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesAndBrandsService } from "@/services/category.service";

const fetchCategoriesAndBrands = async () => {
    try {
        const response = await getCategoriesAndBrandsService();
        return response?.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

const useCategoriesAndBrands = () => {
    const { data, isSuccess, refetch, isLoading } = useQuery({
        queryKey: ["get-category-and-brands"],
        queryFn: fetchCategoriesAndBrands,
        refetchOnWindowFocus: false,
    });

    return { data, isSuccess, refetch, isLoading };
};
export default useCategoriesAndBrands;
