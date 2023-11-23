"use client";
//! Required
import { getCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { INCREMENT, DECREMENT, requestOrderService, calcFreightService } from "@/services/cart.service";

//! Component
import Image from "next/image";
import Link from "next/link";
import useCart from "./useCart";
import { toast } from "react-hot-toast";
import DestinationSection from "./DestinationSection";
import { Add, CardPos } from "iconsax-react";

//! Template
const ClientCartPage = () => {
    const router = useRouter();
    const token = getCookie("TOKEN");
    const { data, isLoading, error, refetch: refetchCart } = useCart(token);

    const { isLoading: isIncrementing, mutateAsync: mutateINCREMENT } = useMutation({
        mutationKey: ["cart-increment"],
        mutationFn: INCREMENT,
    });
    const INCREMENTit = async ({ productID }) => {
        try {
            await mutateINCREMENT({ data: { productID }, token });
            refetchCart();
        } catch (error) {
            if (error?.response?.data?.maxError) {
                toast.error(error?.response?.data?.maxError);
            }
            toast.error(error?.response?.data.error);
        }
    };

    const { isLoading: isDecrementing, mutateAsync: mutateDECREMENT } = useMutation({
        mutationKey: ["cart-increment"],
        mutationFn: DECREMENT,
    });
    const DECREMENTit = async ({ productID }) => {
        try {
            await mutateDECREMENT({ data: { productID }, token });
            deleteCookie(productID);
            refetchCart();
        } catch (error) {
            toast.error(error?.response?.data.error);
        }
    };

    const { isLoading: isCalcingFreight, mutateAsync: mutateCalcFreight } = useMutation({
        mutationKey: ["calc-freight"],
        mutationFn: calcFreightService,
    });
    const CALC_FREIGHT = async ({ adrID }) => {
        try {
            await mutateCalcFreight({ adrID, token });
            refetchCart();
        } catch (error) {
            toast.error(error?.response?.data.error);
        }
    };

    const { isLoading: isRequestingOrder, mutateAsync: mutateRequestOrder } = useMutation({
        mutationKey: ["order-request"],
        mutationFn: requestOrderService,
    });
    const REQUEST_ORDER = async () => {
        try {
            const response = await mutateRequestOrder({ token });
            const { redirectUrl } = response.data || {};
            router.replace(redirectUrl);
        } catch (error) {
            toast.error(error?.response?.data.error);
        }
    };

    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        window.scrollTo({ top: 0 });
        if (window.screen.width >= 1024) {
            setIsDesktop(true);
        }
    }, []);

    if (!token) {
        return (
            <main className="mx-auto grid max-w-md grid-cols-1 items-center justify-items-stretch p-4 pb-40 lg:mb-20 lg:max-w-5xl lg:grid-cols-[25rem_1fr] lg:py-10">
                <figure className="grid aspect-square place-items-center rounded-xl border border-neutral-300 bg-neutral-100">
                    <Image
                        src="/images/OilBanner2.png"
                        alt="Empty-Cart-Image"
                        width={320}
                        height={320}
                        style={{ objectFit: "contain" }}
                        className="max-h-80 p-2"
                    />
                </figure>
                <div className="mx-auto grid w-fit place-items-center">
                    <h1 className="mt-10 bg-gradient-to-l from-neutral-900 to-neutral-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent lg:mt-0">
                        راهنمای خرید، از روغنی کار:
                    </h1>
                    <ul className="mt-4 w-full p-0 text-base font-bold leading-8 tracking-tight text-neutral-600">
                        <li>
                            1. ابتدا{" "}
                            <Link
                                href={{ pathname: "/login", query: { from: "/product-list" } }}
                                className="w-fit bg-gradient-to-l from-orange-900 to-orange-500 bg-clip-text text-lg font-black text-transparent"
                            >
                                وارد
                            </Link>{" "}
                            حساب کاربری خود شوید
                        </li>
                        <li>
                            2. سپس به{" "}
                            <Link href="/product-list" className="underline underline-offset-2">
                                صفحه محصولات
                            </Link>{" "}
                            سر بزنید
                        </li>
                        <li>3. محصول مد نظرتان را انتخاب کنید</li>
                        <li>4. با یک کلیک به سبد خرید اضافه نمایید</li>
                    </ul>
                </div>
            </main>
        );
    }

    if (token && !!data?.data.noCart) {
        return (
            <main className="mx-auto grid w-full max-w-md grid-cols-1 items-center justify-items-center px-4 pb-40 pt-4 sm:px-0 md:pt-10 lg:max-w-5xl lg:grid-cols-[37%_73%] lg:pt-20">
                <figure className="grid aspect-square w-full place-items-center rounded-xl border border-neutral-300 bg-neutral-100">
                    <Image
                        src="/images/OilBanner2.png"
                        alt="Empty-Cart-Image"
                        width={320}
                        height={320}
                        style={{ objectFit: "contain" }}
                        className="max-h-80 p-2"
                    />
                </figure>
                <div>
                    <h1 className="mt-10 bg-gradient-to-l from-neutral-900 to-neutral-500 bg-clip-text text-xl font-extrabold tracking-tight text-transparent lg:mt-0 lg:text-2xl">
                        سبد خرید شما خالیه، هنــــــــــوز!
                    </h1>
                    <h2 className="mt-4 text-sm font-bold tracking-tight text-neutral-500">
                        جهت تکمیل سازی فرایند خرید:
                    </h2>
                    <ul className="mt-4 text-base font-bold leading-8 tracking-tight text-neutral-600">
                        <li>
                            1. به{" "}
                            <Link
                                href="/product-list"
                                className="w-fit bg-gradient-to-l from-orange-900 to-orange-500 bg-clip-text text-lg font-black text-transparent"
                            >
                                صفحه محصولات
                            </Link>{" "}
                            سر بزنید
                        </li>
                        <li>2. محصول مد نظرتان رو انتخاب کنید</li>
                        <li>3. با یک کلیک به سبد خرید اضافه نمایید</li>
                        <li>4. با اطمینان از قیمت مناسب و اصالت کالا، ثبت سفارش کنید</li>
                        <li>5. بعدِ تحویل سفارش، از کیفیت خدمات ما به دوستانتان بگویید</li>
                        <li className="mt-10 text-center text-6xl opacity-20">🙂</li>
                    </ul>
                </div>
            </main>
        );
    }

    if (token && data?.data.cart) {
        return (
            <main className="container px-3 sm:px-0 lg:py-10">
                <header className="flex w-full items-center justify-start border-b-2 border-dashed border-orange-300 py-4 lg:pb-2">
                    <h1 className="bg-gradient-to-l from-orange-900 to-orange-400 bg-clip-text text-2xl font-black tracking-tight text-transparent">
                        سبد خرید من:
                    </h1>
                </header>
                {!isDesktop && (
                    <section className="mt-4 grid grid-cols-1 items-stretch justify-items-stretch">
                        {data?.data?.cart?.products.map((CProduct) => {
                            return (
                                <article key={CProduct?.productID} className="mb-5 rounded-md bg-white p-2">
                                    <header className="mb-5 flex items-center justify-start gap-3">
                                        <figure className="relative grid !aspect-square h-32 w-32 place-items-center rounded-lg bg-neutral-100">
                                            <Image
                                                src={CProduct?.imageSrc ? CProduct?.imageSrc : "/images/no-image.png"}
                                                alt={CProduct?.name}
                                                width={150}
                                                height={150}
                                                style={{ objectFit: "contain" }}
                                                className={CProduct?.imageSrc ? "max-h-32 p-2" : "p-4 opacity-50"}
                                            />
                                        </figure>
                                        <Link href={`/product-list/${CProduct?.serialNumber}`}>
                                            <h2 className="ellipsis-four-line text-sm font-extrabold tracking-tight text-neutral-600">
                                                {CProduct?.name}
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
                                            {CProduct?.productPrice - 1 < CProduct?.rcPrice ? (
                                                <span>{CProduct?.rcPrice.toLocaleString()}</span>
                                            ) : (
                                                <span className="flex flex-col items-start justify-center font-extrabold text-rose-500">
                                                    <span className="text-xs text-neutral-500 line-through">
                                                        {CProduct?.productPrice.toLocaleString()}
                                                    </span>
                                                    {CProduct?.rcPrice.toLocaleString()}
                                                </span>
                                            )}
                                        </p>
                                        <ul className="grid h-fit auto-rows-[1.8rem] grid-cols-[3fr_2fr_3fr] grid-rows-[3rem] items-center justify-items-center self-center border-x border-neutral-300">
                                            <li className="justify-self-end">
                                                <button
                                                    onClick={() => INCREMENTit({ productID: CProduct?.productID })}
                                                    disabled={
                                                        isIncrementing || CProduct?.quantity >= CProduct?.maxQuantity
                                                    }
                                                    className="group aspect-square rounded-md bg-emerald-100 px-1.5 shadow-lg shadow-emerald-500/25 disabled:bg-neutral-100 disabled:shadow-none"
                                                >
                                                    <i className="ri-arrow-up-circle-fill text-2xl font-medium text-emerald-500 group-disabled:text-neutral-300"></i>
                                                </button>
                                            </li>
                                            <li className="text-base font-extrabold text-neutral-600">
                                                {CProduct?.quantity}
                                            </li>
                                            <li className="justify-self-start">
                                                <button
                                                    onClick={() => DECREMENTit({ productID: CProduct?.productID })}
                                                    disabled={isDecrementing}
                                                    className="group aspect-square rounded-md bg-rose-100 px-1.5 shadow-lg shadow-rose-500/20 disabled:bg-neutral-100"
                                                >
                                                    <i
                                                        className={`text-2xl font-medium text-rose-500 group-disabled:text-neutral-300 ${
                                                            CProduct?.quantity > 1
                                                                ? "ri-arrow-down-circle-fill"
                                                                : "ri-delete-bin-fill"
                                                        }`}
                                                    ></i>
                                                </button>
                                            </li>
                                            {!!(CProduct?.quantity >= CProduct?.maxQuantity) && (
                                                <li className="col-span-3 mt-2 w-full text-center text-xs font-bold tracking-tighter text-rose-500">
                                                    حداکثر{" "}
                                                    {CProduct?.maxQuantity !== 1
                                                        ? CProduct.maxQuantity
                                                        : CProduct.quantity}{" "}
                                                    عدد
                                                    <br />
                                                    در هر فاکتور
                                                </li>
                                            )}
                                        </ul>
                                        <p className="flex w-full items-center justify-end text-base font-extrabold text-neutral-600">
                                            {CProduct?.productPrice - 1 < CProduct?.rcPrice ? (
                                                <span>{(CProduct?.rcPrice * CProduct?.quantity).toLocaleString()}</span>
                                            ) : (
                                                <span className="flex flex-col items-end justify-center text-neutral-600">
                                                    <span className="text-xs text-rose-500">
                                                        با{" "}
                                                        {(CProduct?.userProfit * CProduct?.quantity).toLocaleString()}{" "}
                                                        سود
                                                    </span>
                                                    {(CProduct?.rcPrice * CProduct?.quantity).toLocaleString()}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                        <section className="order-3 rounded-lg border border-neutral-300 bg-gradient-to-tl from-neutral-200 to-neutral-100 px-5 pb-4 pt-2">
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        href="/product-list"
                                        className="-mr-2 flex w-fit items-center justify-start py-1 text-sm font-extrabold text-neutral-600"
                                    >
                                        <Add variant="Linear" className="-ml-0.5 h-5 w-5 text-orange-900" />
                                        افزودن محصول
                                    </Link>
                                </li>
                                {!!data?.data?.cart?.totalUserProfit && (
                                    <li className="flex w-full items-center justify-between font-extrabold">
                                        <p className="text-sm text-neutral-500">مجموع فاکتور:</p>
                                        <p className="text-base text-neutral-600">
                                            <span className="ml-1 text-xs text-neutral-500">تومان</span>
                                            {data?.data?.cart?.totalPrice.toLocaleString()}
                                        </p>
                                    </li>
                                )}
                                {!!data?.data?.cart?.totalUserProfit && (
                                    <li className="flex w-full items-center justify-between font-extrabold">
                                        <p className="text-sm text-rose-500">سود شما از این خرید:</p>
                                        <p className="text-base text-neutral-600">
                                            <span className="ml-1 text-xs text-rose-500">تومان</span>
                                            {data?.data?.cart?.totalUserProfit.toLocaleString()}
                                        </p>
                                    </li>
                                )}
                                <li className="flex w-full items-center justify-between font-extrabold">
                                    <p className="text-sm text-neutral-600">
                                        {!!data?.data?.cart?.totalUserProfit
                                            ? "مجموع فاکتور با تخفیف:"
                                            : "مجموع فاکتور:"}
                                    </p>
                                    <p className="text-base text-neutral-600">
                                        <span className="ml-1 text-xs text-neutral-500">تومان</span>
                                        {data?.data?.cart?.totalCart.toLocaleString()}
                                    </p>
                                </li>
                            </ul>
                        </section>
                    </section>
                )}
                {isDesktop && (
                    <section className="w-full">
                        <header className="my-4 w-full">
                            <hgroup className="grid w-full grid-cols-[3fr_1fr_1fr_1fr] items-stretch justify-items-stretch gap-5 text-sm font-extrabold text-neutral-600">
                                <h6 className="border-b border-neutral-400 py-1">مشخصات</h6>
                                <h6 className="border-b border-neutral-400">قیمت واحد</h6>
                                <h6 className="border-b border-neutral-400">تعداد</h6>
                                <h6 className="border-b border-neutral-400">قیمت کل</h6>
                            </hgroup>
                        </header>
                        {data?.data?.cart?.products.map((CProduct) => {
                            return (
                                <article
                                    key={CProduct?._id}
                                    className="mb-5 grid w-full grid-cols-[3fr_1fr_1fr_1fr] items-stretch justify-items-stretch gap-5 rounded-lg bg-white p-2"
                                >
                                    <header className="flex items-center justify-start gap-x-4">
                                        <figure className="relative grid !aspect-square h-32 w-32 place-items-center rounded-lg bg-neutral-100">
                                            <Image
                                                src={CProduct?.imageSrc ? CProduct?.imageSrc : "/images/no-image.png"}
                                                alt={CProduct?.name}
                                                width={150}
                                                height={150}
                                                style={{ objectFit: "contain" }}
                                                className={CProduct?.imageSrc ? "max-h-32 p-2" : "p-4 opacity-50"}
                                            />
                                        </figure>
                                        <Link href={`/product-list/${CProduct?.serialNumber}`}>
                                            <h2 className="ellipsis-two-line text-sm font-extrabold text-neutral-600">
                                                {CProduct?.name}
                                            </h2>
                                        </Link>
                                    </header>
                                    <p className="flex w-full items-center justify-center text-base font-bold text-neutral-600">
                                        {CProduct?.productPrice <= CProduct?.rcPrice ? (
                                            <span>
                                                <span className="ml-1 text-xs opacity-75">تومان</span>
                                                {CProduct?.rcPrice.toLocaleString()}
                                            </span>
                                        ) : (
                                            <span className="flex flex-col items-end justify-center font-extrabold text-rose-500">
                                                <span className="text-sm text-neutral-500 line-through">
                                                    {CProduct?.productPrice.toLocaleString()}
                                                </span>
                                                <span className="flex items-center justify-center gap-1">
                                                    <span className="text-xs opacity-75">تومان</span>
                                                    {CProduct?.rcPrice.toLocaleString()}
                                                </span>
                                            </span>
                                        )}
                                    </p>
                                    <ul className="grid h-fit auto-rows-[1.8rem] grid-cols-[3fr_2fr_3fr] grid-rows-[3rem] items-center justify-items-center self-center">
                                        <li className="justify-self-end">
                                            <button
                                                onClick={() => INCREMENTit({ productID: CProduct?.productID })}
                                                disabled={isIncrementing || CProduct?.quantity >= CProduct?.maxQuantity}
                                                className="group aspect-square rounded-md bg-emerald-100 px-1 shadow-xl shadow-emerald-500/30 duration-200 hover:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:shadow-none"
                                            >
                                                <i className="ri-arrow-up-circle-fill text-2xl font-medium text-emerald-500 group-disabled:text-neutral-300"></i>
                                            </button>
                                        </li>
                                        <li className="text-base font-extrabold text-neutral-600">
                                            {CProduct?.quantity}
                                        </li>
                                        <li className="justify-self-start">
                                            <button
                                                onClick={() => DECREMENTit({ productID: CProduct?.productID })}
                                                disabled={isDecrementing}
                                                className="group aspect-square rounded-md bg-rose-100 px-1 shadow-xl shadow-rose-500/25 duration-200 hover:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-100"
                                            >
                                                <i
                                                    className={`text-2xl font-medium text-rose-500 group-disabled:text-neutral-300 ${
                                                        CProduct?.quantity > 1
                                                            ? "ri-arrow-down-circle-fill"
                                                            : "ri-delete-bin-fill"
                                                    }`}
                                                ></i>
                                            </button>
                                        </li>
                                        {!!(CProduct?.quantity >= CProduct?.maxQuantity) && (
                                            <li className="col-span-3 text-center text-xs font-bold text-rose-500">
                                                حداکثر{" "}
                                                <span className="text-sm">
                                                    {CProduct?.maxQuantity !== 1
                                                        ? CProduct.maxQuantity
                                                        : CProduct.quantity}{" "}
                                                </span>{" "}
                                                عدد
                                                <br />
                                                در هر فاکتور
                                            </li>
                                        )}
                                    </ul>
                                    <p className="flex w-full items-center justify-end pl-2 text-base font-extrabold text-neutral-600">
                                        {CProduct?.productPrice <= CProduct?.rcPrice ? (
                                            <span>
                                                <span className="ml-1 text-xs opacity-75">تومان</span>
                                                {(CProduct?.rcPrice * CProduct?.quantity).toLocaleString()}
                                            </span>
                                        ) : (
                                            <span className="flex flex-col items-end justify-center text-neutral-600">
                                                <span className="text-sm text-rose-500">
                                                    با {(CProduct?.userProfit * CProduct?.quantity).toLocaleString()}{" "}
                                                    سود شما
                                                </span>
                                                <span className="flex items-center justify-center gap-1">
                                                    <span className="text-xs opacity-75">تومان</span>
                                                    {(CProduct?.rcPrice * CProduct?.quantity).toLocaleString()}
                                                </span>
                                            </span>
                                        )}
                                    </p>
                                </article>
                            );
                        })}
                        <footer className="flex w-full items-center justify-between">
                            <Link
                                href="/product-list"
                                className="flex w-fit items-center justify-start py-1 text-sm font-extrabold text-neutral-600"
                            >
                                <i className="ri-add-circle-line mr-2 text-2xl font-medium text-orange-900"></i>
                                افزودن محصول
                            </Link>
                            <div className="flex flex-col items-end justify-center">
                                <h6 className="mb-1 text-sm font-bold text-neutral-500">جمع کل</h6>
                                <p className="text-sm font-extrabold text-neutral-600">
                                    <span className="text-xs text-orange-500">تومان</span>{" "}
                                    {(data?.data?.cart?.totalCart).toLocaleString()}
                                </p>
                            </div>
                        </footer>
                    </section>
                )}
                <section className="w-full lg:grid lg:grid-cols-[2fr_1fr] lg:items-start lg:justify-items-stretch lg:gap-3">
                    <header
                        id="address-section-link"
                        className="mb-2.5 flex w-full items-center justify-start border-b-2 border-dashed border-blue-300 pb-2 pt-10 lg:col-span-2"
                    >
                        <h3 className="bg-gradient-to-l from-blue-600 to-blue-400 bg-clip-text text-base font-extrabold tracking-tight text-transparent">
                            آدرس تحویل سفارش:
                        </h3>
                    </header>
                    {!!data?.data?.BeforePaymentDescription.description && (
                        <div className="w-full rounded-lg border border-rose-200 bg-rose-50 py-2 pr-4 lg:col-span-2">
                            <header className="text-base font-extrabold text-rose-600">
                                <h3>توجه داشته باشید:</h3>
                            </header>
                            <p className="mt-2 whitespace-pre-line text-sm font-bold leading-7 text-rose-500">
                                {data?.data?.BeforePaymentDescription.description}
                            </p>
                        </div>
                    )}
                    <DestinationSection
                        addresses={data?.data?.addresses}
                        receiverName={data?.data?.cart?.destination?.receiverName}
                        receiverPhone={data?.data?.cart?.destination?.receiverPhone}
                        CALC_FREIGHT={CALC_FREIGHT}
                        refetchCart={refetchCart}
                        selectedAdrID={data?.data?.cart?.destination?._id || ""}
                    />
                    {/* Payment Cart */}
                    <section className="shadow-xl-inner-blue mb-5 mt-5 overflow-hidden rounded-xl bg-gradient-to-tl from-neutral-200 to-neutral-100 pt-2 lg:mt-0">
                        <ul className="space-y-4 px-2.5">
                            {!!data?.data?.cart?.totalUserProfit && (
                                <li className="flex w-full items-center justify-between font-extrabold">
                                    <p className="text-sm text-neutral-500">جمع کل:</p>
                                    <p className="text-base text-neutral-600">
                                        <span className="ml-1 text-xs text-neutral-500">تومان</span>
                                        {data?.data?.cart?.totalPrice.toLocaleString()}
                                    </p>
                                </li>
                            )}
                            {!!data?.data?.cart?.totalUserProfit && (
                                <li className="flex w-full items-center justify-between font-extrabold">
                                    <p className="text-sm text-rose-500">سود شما از این خرید:</p>
                                    <p className="text-base text-neutral-600">
                                        <span className="ml-1 text-xs text-rose-500">تومان</span>
                                        {data?.data?.cart.totalUserProfit.toLocaleString()}
                                    </p>
                                </li>
                            )}
                            <li className="flex w-full items-center justify-between font-extrabold">
                                <p className="text-sm text-neutral-500">مجموع فاکتور:</p>
                                <p className="text-base text-neutral-600">
                                    <span className="ml-1 text-xs text-neutral-500">تومان</span>
                                    {data?.data?.cart.totalCart.toLocaleString()}
                                </p>
                            </li>
                            <li className="flex w-full items-center justify-between font-extrabold">
                                <p className="text-sm text-amber-600">کرایه حمل پستِ پیشتاز:</p>
                                {!isCalcingFreight ? (
                                    !!data?.data?.cart.freight ? (
                                        <p className="text-base text-neutral-600">
                                            <span className="ml-1 text-xs text-amber-600">تومان</span>
                                            {data?.data?.cart?.freight.toLocaleString()}
                                        </p>
                                    ) : (
                                        <p
                                            onClick={() => {
                                                const element = document.getElementById("address-section-link");
                                                const offset =
                                                    4 * parseFloat(getComputedStyle(document.documentElement).fontSize);
                                                const y = element.getBoundingClientRect().top + window.scrollY - offset;
                                                window.scrollTo({ top: y, behavior: "smooth" });
                                            }}
                                            className="text-xs font-bold tracking-tight text-neutral-500"
                                        >
                                            آدرس خود را انتخاب کنید
                                        </p>
                                    )
                                ) : (
                                    <div className="h-6 w-1/3 animate-pulse rounded bg-neutral-300"></div>
                                )}
                            </li>
                            <li className="flex w-full items-center justify-between font-extrabold">
                                <p className="text-sm text-blue-600">قابل پرداخت:</p>
                                <p className="text-base text-neutral-600">
                                    <span className="ml-1 text-xs text-sky-500">تومان</span>
                                    {data?.data?.cart.paymentPrice.toLocaleString()}
                                </p>
                            </li>
                        </ul>
                        <button
                            type="button"
                            disabled={!data?.data?.cart?.freight}
                            onClick={REQUEST_ORDER}
                            className="mt-4 flex w-full items-center justify-center gap-1 bg-gradient-to-l from-blue-600 to-sky-500 text-sm font-bold text-white disabled:cursor-not-allowed"
                            style={
                                !isRequestingOrder
                                    ? { paddingTop: "0.8rem", paddingBottom: "0.8rem" }
                                    : { paddingTop: "1rem", paddingBottom: "1rem" }
                            }
                        >
                            {!isRequestingOrder && <CardPos variant="Bold" className="h-7 w-7" />}
                            {!isRequestingOrder ? "پرادخت و ثبت سفارش" : "در حال انتقال به درگاه پرداخت"}
                        </button>
                        {/* onClick > if(!freight) ? animate on freight : pay */}
                    </section>
                    {/* Payment Cart */}
                </section>
            </main>
        );
    }
};
export default ClientCartPage;
