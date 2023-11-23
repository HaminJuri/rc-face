import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { checkoutService } from "@/services/cart.service";

const fetchCheckout = async ({ queryKey }) => {
    try {
        const response = await checkoutService({ orderId: queryKey[1] });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data.errorMessage);
    }
};

const useCheckout = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    const { data, isSuccess, refetch, isLoading, error, isError } = useQuery({
        queryKey: ["checkout", orderId],
        queryFn: fetchCheckout,
        refetchOnWindowFocus: false,
        retry: 0,
    });

    return { data, isSuccess, refetch, isLoading, error, isError };
};
export default useCheckout;
