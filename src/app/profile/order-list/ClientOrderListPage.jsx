"use client";
//! Required
import { useState } from "react";
import useOrders from "./useOrders";
import getOrderActiveStep from "@/hooks/getOrderActiveStep";

//! Components
import Link from "next/link";
import TheError from "@/components/TheError";
import { ClipboardText, User } from "iconsax-react";

//! Template
const OrderPage = () => {
    const [activeStatus, setActiveStatus] = useState(0);
    const activeStatusHandler = (e) => {
        let { value } = e.target;
        value = +value;
        if (activeStatus === value) {
            setActiveStatus(0);
        } else {
            setActiveStatus(value);
        }
    };

    const {
        data: ORDERS,
        isLoading: isFetchingOrders,
        isError,
        error,
        isSuccess: fetchedOrders,
        refetch: refetchOrders,
    } = useOrders({ orderStatus: activeStatus });

    return (
        <main className="h-full min-h-[90vh] px-1 py-8 sm:px-0 lg:py-20">
            <div className="relative mx-auto flex w-full flex-col items-center justify-start">
                <header className="relative grid w-full max-w-md grid-cols-2 items-center justify-items-center text-sm font-bold text-neutral-400 lg:max-w-3xl">
                    <h1>
                        <Link href="/profile" className="flex flex-col items-center justify-center">
                            <User variant="Linear" className="h-7 w-7" />
                            درباره من
                        </Link>
                    </h1>
                    <h2 className="flex flex-col items-center justify-center font-extrabold text-orange-500">
                        <ClipboardText variant="Linear" className="h-7 w-7" />
                        سفارشات من
                    </h2>
                    <div className="absolute top-4 w-1/3 border-b border-neutral-300"></div>
                </header>
                <div className="mb-2 mt-10 w-full max-w-md px-1 lg:max-w-lg">
                    <ul className="orders-radio-inputs hide-scroll-bar relative box-border flex w-full gap-x-2 overflow-x-auto whitespace-nowrap rounded-lg border-b border-neutral-200 bg-neutral-200/60 p-2 text-sm font-bold text-neutral-600">
                        <li className="radio">
                            <label className="radio">
                                <input
                                    type="checkbox"
                                    name="radio"
                                    value={1}
                                    checked={activeStatus === 1}
                                    onChange={activeStatusHandler}
                                />
                                <span className="name">در انتظار تایید</span>
                            </label>
                        </li>
                        <li className="radio">
                            <label className="radio">
                                <input
                                    type="checkbox"
                                    name="radio"
                                    value={2}
                                    checked={activeStatus === 2}
                                    onChange={activeStatusHandler}
                                />
                                <span className="name">در حال پردازش</span>
                            </label>
                        </li>
                        <li className="radio">
                            <label className="radio">
                                <input
                                    type="checkbox"
                                    name="radio"
                                    value={3}
                                    checked={activeStatus === 3}
                                    onChange={activeStatusHandler}
                                />
                                <span className="name">در حال ارسال</span>
                            </label>
                        </li>
                        <li className="radio">
                            <label className="radio">
                                <input
                                    type="checkbox"
                                    name="radio"
                                    value={4}
                                    checked={activeStatus === 4}
                                    onChange={activeStatusHandler}
                                />
                                <span className="name">تحویل شده</span>
                            </label>
                        </li>
                    </ul>
                </div>
                <section className="mb-10 grid w-full max-w-md items-start justify-items-stretch gap-y-2.5 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl lg:max-w-lg">
                    {!!isError && <TheError>{error?.message}</TheError>}
                    {!!fetchedOrders &&
                        ORDERS.map((order) => (
                            <Link
                                key={order._id}
                                href={`/checkout?orderId=${order.orderId}`}
                                className="grid grid-cols-[1fr_1.5fr_1fr] items-center rounded-lg bg-neutral-200/75 p-2 text-xs font-extrabold text-neutral-500"
                            >
                                <p className="flex flex-col items-start justify-center gap-2 justify-self-start">
                                    وضعیت سفارش
                                    <span className="text-[13px] text-neutral-600 sm:text-sm">
                                        {getOrderActiveStep(order.activeStep)}
                                    </span>
                                </p>
                                <h3 className="flex flex-col items-start justify-center gap-2 justify-self-start">
                                    شماره فاکتور
                                    <p className="text-[13px] text-neutral-600 sm:text-sm">
                                        <span>
                                            {order.orderId.slice(0, 14)}
                                            <span className="text-orange-900/80">{order.orderId.slice(14)}</span>
                                        </span>
                                    </p>
                                </h3>
                                <p className="flex flex-col items-end justify-center gap-2 justify-self-end">
                                    جمع فاکتور
                                    <span className="text-[13px] text-neutral-600 sm:text-sm">
                                        <span className="ml-0.5 text-[10px] text-neutral-600/60">تومان</span>
                                        {order.paymentPrice.toLocaleString()}
                                    </span>
                                </p>
                            </Link>
                        ))}
                </section>
            </div>
        </main>
    );
};

export default OrderPage;
