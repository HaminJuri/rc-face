import dynamic from "next/dynamic";
const ClientInvoicePage = dynamic(() => import("./ClientInvoicePage"), { ssr: false });

const InvoicePage = () => {
    return <ClientInvoicePage />;
};

export default InvoicePage;
