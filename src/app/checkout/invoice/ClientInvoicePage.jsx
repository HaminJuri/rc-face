"use client";
//! Required
import useCheckout from "./../useCheckout";

//! Components
import Signature from "@/../public/images/signature-of-rc.png";
import Image from "next/image";
import { useEffect } from "react";

//! Template
const ClientInvoicePage = () => {
    const {
        data: CHECKOUT,
        isLoading: isChecking,
        isSuccess: checked,
        refetch: recheck,
        isError,
        error,
    } = useCheckout();
    function setPageSize(cssPageSize) {
        const style = document.createElement("style");
        style.innerHTML = `@page {size: ${cssPageSize}}`;
        style.id = "page-orientation";
        document.head.appendChild(style);
    }

    useEffect(() => {
        setPageSize("landscape");
        return () => {
            const child = document.getElementById("page-orientation");
            child.parentNode.removeChild(child);
        };
    }, []);

    if (!!checked) {
        const totalQuantity = CHECKOUT.products.reduce((total, product) => total + product.quantity, 0);
        const totalUnitPrices = CHECKOUT.products.reduce((total, product) => total + product.productPrice, 0);
        const totalUnitTotalPrices = CHECKOUT.products.reduce(
            (total, product) => total + product.productPrice * product.quantity,
            0,
        );
        const totalUserProfit = CHECKOUT.products.reduce((total, product) => total + product.userProfit || 0, 0);
        const totalUnitRcPrices = CHECKOUT.products.reduce(
            (total, product) => total + product.rcPrice * product.quantity,
            0,
        );
        return (
            <main id="print-me" style={{ margin: "auto", width: "26cm" }} className="relative text-neutral-700">
                <header className="w-full pb-2">
                    <h1 className="text-center text-2xl font-bold">صورت حساب فروش کالا و خدمات</h1>
                </header>
                {/* فروشنده */}
                <section className="mb-2 grid grid-cols-[4.25rem_1fr_10rem] items-stretch justify-items-stretch gap-2">
                    <header className="grid place-items-center border border-black bg-neutral-200">
                        <h2
                            style={{
                                writingMode: "vertical-rl",
                                textOrientation: "mixed",
                                rotate: "180deg",
                                fontSize: "9pt",
                            }}
                        >
                            فروشنده
                        </h2>
                    </header>
                    <ul className="grid grid-cols-4 items-start justify-items-start gap-y-2 border border-black p-2 text-[9pt] font-bold">
                        <li>
                            <span className="ml-1 font-extrabold">فروشنده:</span>یدک پیشگام اطلس
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">شناسه ملی:</span>14010381104
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">شماره اقتصادی:</span>14010381104
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">شماره ثبت:</span>584671
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">استان:</span>تهران
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">شهرستان:</span>تهران
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">تلفن:</span>021-88505073
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">کد پستی:</span>1588816439
                        </li>
                        <li className="col-span-4">
                            <span className="ml-1 font-extrabold">نشانی:</span>تهران، محله باغ صبا (سهروردی)، خیابان
                            قابوسنامه، خیابان زهره، پلاک ۲۹، ساختمان ۳۵، طبقه سوم، واحد7، یدک پیشگام اطلس
                        </li>
                    </ul>
                    <ul className="flex flex-col items-start justify-start border border-black p-2 text-[9pt] font-bold">
                        <li className="flex w-full flex-col items-end justify-start">
                            <span className="self-start font-extrabold">شماره فاکتور:</span>
                            {CHECKOUT.orderId}
                        </li>
                        <li className="flex w-full flex-col items-end justify-start">
                            <span className="self-start font-extrabold">تاریخ فاکتور:</span>
                            {CHECKOUT.time.date}
                        </li>
                    </ul>
                </section>
                {/* فروشنده */}
                {/* خریدار */}
                <section className="mb-2 grid grid-cols-[4.25rem_1fr_10rem] items-stretch justify-items-stretch gap-2">
                    <header className="grid place-items-center border border-black bg-neutral-200">
                        <h2
                            style={{
                                writingMode: "vertical-rl",
                                textOrientation: "mixed",
                                rotate: "180deg",
                                fontSize: "9pt",
                            }}
                        >
                            خریدار
                        </h2>
                    </header>
                    <ul className="grid grid-cols-4 items-start justify-items-start gap-y-2 border border-black p-2 text-[9pt] font-bold">
                        <li>
                            <span className="ml-1 font-extrabold">خریدار:</span>
                            {CHECKOUT.user.firstName} {CHECKOUT.user.lastName}
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">شماره ملی:</span>
                            {CHECKOUT.user.national}
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">شماره اقتصادی:</span> ---
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">شماره ثبت:</span> ---
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">استان:</span>
                            {CHECKOUT.destination.province}
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">شهرستان:</span>
                            {CHECKOUT.destination.city}
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">شماره تماس:</span>
                            {CHECKOUT.user.phone}
                        </li>
                        <li>
                            <span className="ml-1 font-extrabold">کد پستی:</span>
                            {CHECKOUT.destination.postal}
                        </li>
                        <li className="col-span-4">
                            <span className="ml-1 font-extrabold">نشانی:</span>
                            {CHECKOUT.destination.address}
                        </li>
                    </ul>
                    <span></span>
                </section>
                {/* خریدار */}
                {/* کالاها */}
                <section className="mb-2 w-full">
                    <header
                        id="invoice-products-header"
                        className="grid grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-stretch justify-items-stretch text-[9pt] font-bold"
                    >
                        <h4>ردیف</h4>
                        <h4>شناسه کالا</h4>
                        <h4>شرح کالا</h4>
                        <h4>تعداد</h4>
                        <h4>مبلغ واحد (ریال)</h4>
                        <h4>مبلغ کل (ریال)</h4>
                        <h4>تخفیف (ریال)</h4>
                        <h4>مبلغ کل پس از تخفیف (ریال)</h4>
                        <h4>جمع مالیات و عوارض ارزش افزوده (ریال)</h4>
                        <h4>جمع کل پس از تخفیف و مالیات و عوارض (ریال)</h4>
                    </header>
                    {CHECKOUT.products.map((product, index) => (
                        <div
                            key={product.productID}
                            id="invoice-products-product"
                            className="grid grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-stretch justify-items-stretch text-[9pt] font-bold"
                        >
                            <p>{index + 1}</p>
                            <p>{product.serialNumber}</p>
                            <p className="!pr-1 !text-start">{product.name}</p>
                            <p>{product.quantity}</p>
                            <p>{product.productPrice.toLocaleString()}</p>
                            <p>{(product.productPrice * product.quantity).toLocaleString()}</p>
                            <p>{product.userProfit.toLocaleString() || 0}</p>
                            <p>{(product.rcPrice * product.quantity).toLocaleString()}</p>
                            <p>0</p>
                            <p>{(product.rcPrice * product.quantity).toLocaleString()}</p>
                        </div>
                    ))}
                    <div
                        id="invoice-products-footer"
                        className="grid grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-stretch justify-items-stretch text-[9pt] font-bold"
                    >
                        <p className="col-span-3">جمع کل</p>
                        <p>{totalQuantity.toLocaleString()}</p>
                        <p>{totalUnitPrices.toLocaleString()}</p>
                        <p>{totalUnitTotalPrices.toLocaleString()}</p>
                        <p>{totalUserProfit.toLocaleString()}</p>
                        <p>{totalUnitRcPrices.toLocaleString()}</p>
                        <p>0</p>
                        <p>{totalUnitRcPrices.toLocaleString()}</p>
                    </div>

                    <div
                        id="invoice-products-footer"
                        className="grid grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-stretch justify-items-stretch text-[9pt] font-bold"
                    >
                        <p className="col-span-6 bg-neutral-200">
                            جمع کل پس از تخفیف و با احتساب مالیات و عوارض (ریال):
                        </p>
                        <p className="col-span-4 bg-neutral-200">{CHECKOUT.paymentPrice.toLocaleString()}</p>
                    </div>
                </section>
                {/* کالاها */}
                {/* مهر و امضا */}
                <section className="grid h-60 w-full grid-cols-2 border border-black p-4 text-[9pt] font-bold">
                    <div className="flex flex-col items-start justify-start">
                        <h3>مهر و امضای فروشنده:</h3>
                        <Image src={Signature} alt="" width="200" className="mt-4" />
                    </div>
                    <h3>مهر و امضای خریدار:</h3>
                </section>
                {/* مهر و امضا */}
                <button
                    id="remove-me-on-print"
                    type="button"
                    onClick={() => window.print()}
                    className="absolute right-2 top-0.5 rounded-lg bg-gradient-to-l from-orange-900 to-orange-400 px-4 py-1.5 text-sm font-bold text-white"
                >
                    پرینت فاکتور
                </button>
            </main>
        );
    }
};

export default ClientInvoicePage;
