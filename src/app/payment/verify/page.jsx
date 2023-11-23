"use client";
//! Required
import usePayment from "./usePayment";
import { getCookie } from "cookies-next";

//! Components
import Image from "next/image";
import Link from "next/link";
import { Home3, Call } from "iconsax-react";

//! Template
const VerifyPayment = ({ searchParams }) => {
    const token = getCookie("TOKEN");
    let { paymentId, isSucceed } = searchParams || {};
    isSucceed = isSucceed === "False" ? false : true;

    const {
        data: PAYMENT,
        isLoading: isCheckingPayment,
        isSuccess: checkedPayment,
        isError,
        error,
    } = usePayment({ paymentId, token, isSucceed });

    return (
        <main className="flex h-full min-h-[90vh] flex-col items-center justify-start px-1 pt-20 sm:px-0">
            {!!isCheckingPayment && (
                <>
                    <div className="flex w-full justify-center">
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <p className="text-sm font-bold text-orange-900">در حال پردازش</p>
                </>
            )}
            {!isCheckingPayment && !!checkedPayment && PAYMENT.data.statusCode !== 200 && (
                <>
                    <div className="relative w-full max-w-[23.438rem]">
                        <Image
                            src="/images/receipt-failed-bg.svg"
                            alt=""
                            width="375"
                            height="400"
                            className="drop-shadow-md"
                        />
                        <div className="absolute right-0 top-0 w-full px-3 pt-5">
                            <header className="flex w-full flex-col items-center justify-center gap-y-3.5">
                                <figure className="w-fit">
                                    <Image src="/images/receipt-failed.svg" alt="" width="130" height="130" />
                                </figure>
                                <h1 className="w-fit bg-gradient-to-l from-rose-800 to-rose-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
                                    پرداخت ناموفق
                                </h1>
                            </header>
                            <ul className="mt-6 w-full space-y-3 text-sm font-extrabold">
                                <li className="flex w-full items-center justify-between text-base">
                                    <h6 className="text-neutral-500">شماره سفارش:</h6>
                                    <h4 className="text-neutral-700">
                                        {PAYMENT.data.ordered.orderId.slice(0, 14)}
                                        <span className="text-rose-600">{PAYMENT.data.ordered.orderId.slice(14)}</span>
                                    </h4>
                                </li>
                                <li className="flex w-full items-center justify-between">
                                    <h6 className="text-neutral-500">جمع فاکتور:</h6>
                                    <h4 className="text-neutral-700">
                                        {PAYMENT.data.ordered.totalCart.toLocaleString()}
                                    </h4>
                                </li>
                                <li className="flex w-full items-center justify-between">
                                    <h6 className="text-neutral-500">کرایه حمل:</h6>
                                    <h4 className="text-neutral-700">
                                        {PAYMENT.data.ordered.freight.toLocaleString()}
                                    </h4>
                                </li>
                                <li className="flex w-full items-center justify-between">
                                    <h6 className="text-neutral-500">تاریخ و ساعت:</h6>
                                    <h4 className="text-neutral-700">
                                        {PAYMENT.data.ordered.time.time} - {PAYMENT.data.ordered.time.date}
                                    </h4>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-1">
                        <Link
                            href="/"
                            className="mt-10 flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-black/30 duration-300 lg:hover:shadow-none"
                        >
                            <Home3 variant="Bold" className="mb-1 ml-1 h-7 w-7" />
                            بازگشت به خانه
                        </Link>
                        <Link
                            href="/support?step=2"
                            className="mt-10 flex items-center justify-center rounded-lg px-4 py-2 text-sm font-bold text-orange-600"
                        >
                            <Call variant="Bold" className="-ml-1 h-6 w-6 rotate-[-135deg] text-orange-500" />
                            تماس با پشتیبانی
                        </Link>
                    </div>
                </>
            )}
            {!isCheckingPayment && !!checkedPayment && PAYMENT?.data.statusCode === 200 && (
                <div className="relative w-full max-w-[23.438rem]">
                    <Image src="/images/receipt.svg" alt="" width="375" height="490" className="drop-shadow-md" />
                    <div className="absolute right-0 top-0 w-full px-3 pt-5">
                        <header className="flex w-full flex-col items-center justify-center gap-y-3.5">
                            <figure className="w-fit">
                                <Image src="/images/tick.svg" alt="" width="130" height="130" />
                            </figure>
                            <h1 className="w-fit bg-gradient-to-l from-emerald-800 to-emerald-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
                                پرداخت موفق
                            </h1>
                        </header>
                        <ul className="mt-7 w-full space-y-3 text-sm font-extrabold">
                            <li className="flex w-full items-center justify-between text-base">
                                <h6 className="text-neutral-500">شماره سفارش:</h6>
                                <h4 className="text-neutral-700">
                                    {PAYMENT.data.ordered.orderId.slice(0, 14)}
                                    <span className="text-emerald-600">{PAYMENT.data.ordered.orderId.slice(14)}</span>
                                </h4>
                            </li>
                            <li className="flex w-full items-center justify-between">
                                <h6 className="text-neutral-500">جمع فاکتور:</h6>
                                <h4 className="text-neutral-700">{PAYMENT.data.ordered.totalCart.toLocaleString()}</h4>
                            </li>
                            <li className="flex w-full items-center justify-between">
                                <h6 className="text-neutral-500">کرایه حمل:</h6>
                                <h4 className="text-neutral-700">{PAYMENT.data.ordered.freight.toLocaleString()}</h4>
                            </li>
                            <li className="flex w-full items-center justify-between">
                                <h6 className="text-neutral-500">مبلغ پرداخت شده:</h6>
                                <h4 className="text-neutral-700">
                                    {PAYMENT.data.ordered.paymentPrice.toLocaleString()}
                                </h4>
                            </li>
                            <li className="flex w-full items-center justify-between">
                                <h6 className="text-neutral-500">تاریخ و ساعت پرداخت:</h6>
                                <h4 className="text-neutral-700">
                                    {PAYMENT.data.ordered.time.time} - {PAYMENT.data.ordered.time.date}
                                </h4>
                            </li>
                        </ul>
                        <footer className="mt-6 flex w-full items-center justify-center gap-x-28">
                            <Link
                                href={`/profile/all/${PAYMENT.data.ordered.orderId}`}
                                className="text-sm font-extrabold text-neutral-600 underline underline-offset-2"
                            >
                                مشاهده بیشتر...
                            </Link>
                            <Link href="/" className="text-sm font-bold text-neutral-400">
                                بازگشت به خانه
                            </Link>
                        </footer>
                    </div>
                </div>
            )}
        </main>
    );
};

export default VerifyPayment;
