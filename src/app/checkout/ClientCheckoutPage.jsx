"use client";
//! Required
import useCheckout from "./useCheckout";
import { useEffect } from "react";

//! Components
import TheStepper from "./TheStepper";
import TheError from "@/components/TheError";
import Image from "next/image";
import Link from "next/link";

//! Template
const ClientCheckoutPage = () => {
    useEffect(() => window.scrollTo({ top: 0 }), []);
    const {
        data: CHECKOUT,
        isLoading: isChecking,
        isSuccess: checked,
        refetch: recheck,
        isError,
        error,
    } = useCheckout();

    if (isError) {
        return (
            <main className="container min-h-[80dvh] px-1">
                <TheError>{error?.message}</TheError>
            </main>
        );
    }

    if (checked) {
        return (
            <main className="container min-h-[80dvh] px-1 md:pt-14">
                <TheStepper activeStep={CHECKOUT.activeStep} />
                <div className="lg:order mt-4 flex w-full flex-col items-start justify-between gap-4 lg:flex-row">
                    {/* Mobile */}
                    <section className="order-2 mt-4 grid grid-cols-1 items-stretch justify-items-stretch lg:hidden">
                        <header className="mb-3 border-b-2 border-dotted border-orange-500 py-2">
                            <h2 className="text-base font-bold text-orange-900">سبد خرید:</h2>
                        </header>
                        {CHECKOUT.products.map((product) => {
                            return (
                                <article key={product?.productID} className="mb-5 rounded-md bg-white p-2">
                                    <header className="mb-5 flex items-center justify-start gap-3">
                                        <figure className="relative grid !aspect-square h-32 w-32 place-items-center rounded-lg bg-neutral-100">
                                            <Image
                                                src={product?.imageSrc ? product?.imageSrc : "/images/no-image.png"}
                                                alt={product?.name}
                                                width={150}
                                                height={150}
                                                style={{ objectFit: "contain" }}
                                                className={product?.imageSrc ? "max-h-32 p-2" : "p-4 opacity-50"}
                                            />
                                        </figure>
                                        <Link href={`/product-list/${product?.serialNumber}`}>
                                            <h2 className="ellipsis-four-line text-sm font-extrabold tracking-tight text-neutral-600">
                                                {product?.name}
                                            </h2>
                                        </Link>
                                    </header>
                                    <div className="grid grid-cols-3 items-stretch justify-items-stretch">
                                        <header className="col-span-3 mb-2 border-b border-neutral-300 pb-2">
                                            <hgroup className="grid grid-cols-3 items-stretch justify-items-stretch text-sm font-extrabold text-neutral-500">
                                                <h6>
                                                    قیمت واحد <span className="text-xs opacity-75">(تومان)</span>
                                                </h6>
                                                <h6 className="text-center">تعداد</h6>
                                                <h6 className="text-end">
                                                    <span className="text-xs opacity-75">(تومان)</span> قیمت کل
                                                </h6>
                                            </hgroup>
                                        </header>
                                        <p className="flex w-full items-center justify-start text-sm font-bold text-neutral-600">
                                            {product?.productPrice - 1 < product?.rcPrice ? (
                                                <span>{product?.rcPrice.toLocaleString()}</span>
                                            ) : (
                                                <span className="flex flex-col items-start justify-center font-extrabold text-rose-500">
                                                    <span className="text-xs text-neutral-500 line-through">
                                                        {product?.productPrice.toLocaleString()}
                                                    </span>
                                                    {product?.rcPrice.toLocaleString()}
                                                </span>
                                            )}
                                        </p>
                                        <p className="grid place-items-center text-base font-extrabold text-neutral-600">
                                            {product?.quantity}
                                        </p>
                                        <p className="flex w-full items-center justify-end text-base font-extrabold text-neutral-600">
                                            {product?.productPrice - 1 < product?.rcPrice ? (
                                                <span>{(product?.rcPrice * product?.quantity).toLocaleString()}</span>
                                            ) : (
                                                <span className="flex flex-col items-end justify-center text-neutral-600">
                                                    <span className="text-xs text-rose-500">
                                                        با {(product?.userProfit * product?.quantity).toLocaleString()}{" "}
                                                        سود
                                                    </span>
                                                    {(product?.rcPrice * product?.quantity).toLocaleString()}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                    {/* Mobile */}
                    {/* Desktop */}
                    <section className="order-1 hidden w-full lg:block">
                        <header className="mb-4 w-full">
                            <hgroup className="grid w-full grid-cols-[3fr_1fr_1fr_1fr] items-stretch justify-items-stretch gap-5 text-sm font-extrabold text-neutral-600">
                                <h6 className="border-b border-neutral-400 py-1">مشخصات</h6>
                                <h6 className="border-b border-neutral-400">قیمت واحد</h6>
                                <h6 className="border-b border-neutral-400">تعداد</h6>
                                <h6 className="border-b border-neutral-400">قیمت کل</h6>
                            </hgroup>
                        </header>
                        {CHECKOUT.products.map((product) => {
                            return (
                                <article
                                    key={product?._id}
                                    className="mb-5 grid w-full grid-cols-[3fr_1fr_1fr_1fr] items-stretch justify-items-stretch gap-5 rounded-lg bg-white p-2"
                                >
                                    <header className="flex items-center justify-start gap-x-4">
                                        <figure className="relative grid !aspect-square h-32 w-32 place-items-center rounded-lg bg-neutral-100">
                                            <Image
                                                src={product?.imageSrc ? product?.imageSrc : "/images/no-image.png"}
                                                alt={product?.name}
                                                width={150}
                                                height={150}
                                                style={{ objectFit: "contain" }}
                                                className={product?.imageSrc ? "max-h-32 p-2" : "p-4 opacity-50"}
                                            />
                                        </figure>
                                        <Link href={`/product-list/${product?.serialNumber}`}>
                                            <h2 className="ellipsis-three-line text-sm font-extrabold text-neutral-600">
                                                {product?.name}
                                            </h2>
                                        </Link>
                                    </header>
                                    <p className="flex w-full items-center justify-center text-base font-bold text-neutral-600">
                                        {product?.productPrice <= product?.rcPrice ? (
                                            <span>
                                                <span className="ml-1 text-xs opacity-75">تومان</span>
                                                {product?.rcPrice.toLocaleString()}
                                            </span>
                                        ) : (
                                            <span className="flex flex-col items-end justify-center font-extrabold text-rose-500">
                                                <span className="text-sm text-neutral-500 line-through">
                                                    {product?.productPrice.toLocaleString()}
                                                </span>
                                                <span className="flex items-center justify-center gap-1">
                                                    <span className="text-xs opacity-75">تومان</span>
                                                    {product?.rcPrice.toLocaleString()}
                                                </span>
                                            </span>
                                        )}
                                    </p>
                                    <p className="grid place-items-center text-sm font-bold text-neutral-600">
                                        {product.maxQuantity}
                                    </p>
                                    <p className="flex w-full items-center justify-end text-base font-extrabold text-neutral-600">
                                        {product?.productPrice <= product?.rcPrice ? (
                                            <span>
                                                <span className="ml-1 text-xs opacity-75">تومان</span>
                                                {(product?.rcPrice * product?.quantity).toLocaleString()}
                                            </span>
                                        ) : (
                                            <span className="flex flex-col items-end justify-center text-neutral-600">
                                                <span className="text-sm text-rose-500">
                                                    با {(product?.userProfit * product?.quantity).toLocaleString()} سود
                                                    شما
                                                </span>
                                                <span className="flex items-center justify-center gap-1">
                                                    <span className="text-xs opacity-75">تومان</span>
                                                    {(product?.rcPrice * product?.quantity).toLocaleString()}
                                                </span>
                                            </span>
                                        )}
                                    </p>
                                </article>
                            );
                        })}
                    </section>
                    {/* Desktop */}
                    <aside className="order-1 flex w-full flex-col items-stretch justify-start rounded-lg border border-neutral-200 bg-gradient-to-tl from-neutral-200 to-white lg:order-2 lg:max-w-xs">
                        <ul className="space-y-4 p-2">
                            <li className="flex w-full items-center justify-between text-sm font-bold">
                                <p className="text-sm text-neutral-500">شماره فاکتور:</p>
                                <p className="text-neutral-700">
                                    {CHECKOUT.orderId.slice(0, 14)}
                                    <span className="text-orange-900">{CHECKOUT.orderId.slice(14)}</span>
                                </p>
                            </li>
                            <li className="flex w-full items-center justify-between text-sm font-bold">
                                <p className="text-neutral-500">تاریخ سفارش:</p>
                                <p className="text-neutral-700">
                                    {CHECKOUT.time.time} - {CHECKOUT.time.date}
                                </p>
                            </li>
                            <li className="flex w-full items-center justify-between text-sm font-bold">
                                <p className="text-neutral-500">جمع فاکتور:</p>
                                <p className="text-neutral-700">{CHECKOUT.totalCart.toLocaleString()}</p>
                            </li>
                            <li className="flex w-full items-center justify-between text-sm font-bold">
                                <p className="text-neutral-500">کرایه حمل:</p>
                                <p className="text-neutral-700">{CHECKOUT.freight.toLocaleString()}</p>
                            </li>
                            <li className="flex w-full items-center justify-between text-sm font-bold">
                                <p className="text-neutral-500">پرداخت شده:</p>
                                <p className="text-neutral-700">{CHECKOUT.paymentPrice.toLocaleString()}</p>
                            </li>
                            <li className="flex w-full items-center justify-between text-sm font-bold">
                                <p className="text-neutral-500">نام تحویل گیرنده:</p>
                                <p className="text-neutral-700">
                                    {CHECKOUT.user.firstName} {CHECKOUT.user.lastName}
                                </p>
                            </li>
                            <li className="flex w-full items-center justify-between text-sm font-bold">
                                <p className="text-neutral-500">شماره تحویل گیرنده:</p>
                                <p className="text-neutral-700">{CHECKOUT.user.phone}</p>
                            </li>
                            <li className="flex w-full flex-col items-start justify-start gap-2 text-sm font-bold">
                                <p className="text-neutral-500">آدرس تحویل:</p>
                                <p className="text-neutral-700">{CHECKOUT.destination.address}</p>
                            </li>
                        </ul>
                        <Link
                            href={`/checkout/invoice?orderId=${CHECKOUT.orderId}`}
                            className="my-2 w-fit self-center py-2 text-sm font-bold text-orange-900"
                        >
                            مشاهده فاکتور
                        </Link>
                    </aside>
                </div>
            </main>
        );
    }
};

export default ClientCheckoutPage;
