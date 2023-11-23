import dynamic from "next/dynamic";
const ClientCheckoutPage = dynamic(() => import("./ClientCheckoutPage"), { ssr: false });

export function generateMetadata({ searchParams }) {
    const { orderId } = searchParams || {};
    return {
        title: `مشاهده وضعیت ${orderId}`,
        openGraph: {
            title: `مشاهده وضعیت ${orderId}`,
        },
        twitter: {
            title: `مشاهده وضعیت ${orderId}`,
            card: "summary",
        },
    };
}

const OrderPage = () => {
    return <ClientCheckoutPage />;
};

export default OrderPage;
