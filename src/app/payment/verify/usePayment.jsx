"use client";
import { useQuery } from "@tanstack/react-query";
import http from "@/services/http.config";

const verifyPaymentService = async ({ queryKey }) => {
    try {
        const paymentId = queryKey[1];
        const token = queryKey[2];
        const response = await http({ url: `/cart/order/verify/${paymentId}`, method: "GET", headers: { token } });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data.errorMessage);
    }
};

const usePayment = ({ paymentId, token }) => {
    const { data, isError, isLoading, error, refetch, isSuccess } = useQuery({
        queryKey: ["verify-payment", paymentId, token],
        queryFn: verifyPaymentService,
        refetchOnWindowFocus: false,
        retry: 1,
    });
    return { data, isError, isLoading, error, refetch, isSuccess };
};
export default usePayment;
