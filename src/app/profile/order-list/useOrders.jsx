import { useQuery } from "@tanstack/react-query";
import { getOrderListService } from "@/services/cart.service";
import { getCookie } from "cookies-next";

const fetchOrders = async ({ queryKey }) => {
    const orderStatus = queryKey[1];
    const token = getCookie("TOKEN") || "";
    try {
        const response = await getOrderListService({ token, orderStatus });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data.errorMessage);
    }
};

const useOrders = ({ orderStatus }) => {
    const { data, isSuccess, refetch, isLoading, error, isError } = useQuery({
        queryKey: ["get-orders", orderStatus],
        queryFn: fetchOrders,
        refetchOnWindowFocus: false,
        retry: 0,
    });

    return { data, isSuccess, refetch, isLoading, error, isError };
};
export default useOrders;
