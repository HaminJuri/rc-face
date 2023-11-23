"use client";
//! Required
import useProfile from "./useProfile";
import UserShits from "@/hooks/userShits";
import { checkAuthByJWTService } from "@/services/user.services";
import { useEffect, useState } from "react";
import { toCreditFormat, toLandlineFormat, toPhoneFormat } from "@/hooks/formatString";
import { getCookie, deleteCookie } from "cookies-next";
import dynamic from "next/dynamic";

//! Components
import Link from "next/link";
const UpdateProfileForm = dynamic(() => import("./UpdateProfile"), { ssr: false });
import { toast } from "react-hot-toast";
import { ClipboardText, CloseCircle, User } from "iconsax-react";

//! Template
const ProfilePage = () => {
    const { getKnown } = UserShits();
    const token = getCookie("TOKEN");
    const { data, isLoading, isSuccess, refetch } = useProfile(token);

    const [isLogout, setIsLogout] = useState(false);
    const logoutHandler = () => {
        setIsLogout((prev) => !prev);
    };

    const [isEditing, setIsEditing] = useState(false);
    const editingHandler = () => {
        setIsEditing((prev) => !prev);
    };

    useEffect(() => {
        window.scrollTo({ top: 0 });
        if (isEditing || isLogout) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isEditing, isLogout]);

    const LOGOUT = async () => {
        try {
            await checkAuthByJWTService({ token });
            deleteCookie("TOKEN");
            toast.success("خروج موفق از حساب");
            window.location.href = "/";
        } catch (error) {
            toast.error(error?.response?.data.error);
        }
    };

    return (
        <>
            <main className="grid h-full min-h-[90vh] items-start justify-items-center px-1 py-8 sm:px-0 lg:py-20">
                <div className="relative w-full max-w-md lg:max-w-3xl">
                    <header className="relative grid w-full grid-cols-2 items-center justify-items-center pb-8 text-sm font-bold text-neutral-400">
                        <h1 className="flex flex-col items-center justify-center font-extrabold text-orange-500">
                            <User variant="Linear" className="h-7 w-7" />
                            درباره من
                        </h1>
                        <div className="absolute top-4 w-1/3 border-b border-neutral-300"></div>
                        <h2>
                            <Link href="/profile/order-list" className="flex flex-col items-center justify-center">
                                <ClipboardText variant="Linear" className="h-7 w-7" />
                                سفارشات من
                            </Link>
                        </h2>
                    </header>
                    <section className="grid w-full grid-cols-1 items-center gap-5 rounded-xl border border-neutral-300 p-5 pb-0 lg:grid-cols-2">
                        <div className="w-full">
                            <h6 className="mb-2 pr-2 text-sm font-bold tracking-tight text-neutral-600">نام:</h6>
                            {!!isSuccess ? (
                                <p
                                    dir="rtl"
                                    className="w-full rounded-lg bg-neutral-200 py-2.5 text-center text-base font-bold tracking-tight text-neutral-600"
                                >
                                    {data?.data?.user?.firstName}
                                </p>
                            ) : (
                                <div className="w-full animate-pulse rounded-lg bg-neutral-300 py-[1.375rem]"></div>
                            )}
                        </div>
                        <div className="w-full">
                            <h6 className="mb-2 pr-2 text-sm font-bold tracking-tight text-neutral-600">
                                نام خانوادگی:
                            </h6>
                            {!isLoading ? (
                                <p
                                    dir="rtl"
                                    className="w-full rounded-lg bg-neutral-200 py-2.5 text-center text-base font-bold tracking-tight text-neutral-600"
                                >
                                    {data?.data?.user?.lastName}
                                </p>
                            ) : (
                                <div className="w-full animate-pulse rounded-lg bg-neutral-300 py-[1.375rem]"></div>
                            )}
                        </div>
                        <div className="w-full">
                            <h6 className="mb-2 pr-2 text-sm font-bold tracking-tight text-neutral-600">کد ملی:</h6>
                            {!isLoading ? (
                                <p
                                    dir="ltr"
                                    className="w-full rounded-lg bg-neutral-200 pb-2 pt-3 text-center text-base font-bold tracking-widest text-neutral-600"
                                >
                                    {data?.data?.user?.national}
                                </p>
                            ) : (
                                <div className="w-full animate-pulse rounded-lg bg-neutral-300 py-[1.375rem]"></div>
                            )}
                        </div>
                        <div className="w-full">
                            <h6 className="mb-2 pr-2 text-sm font-bold tracking-tight text-neutral-600">
                                شماره موبایل:
                            </h6>
                            {!isLoading ? (
                                <p
                                    dir="ltr"
                                    className="w-full rounded-lg bg-neutral-200 pb-2 pt-3 text-center text-base font-bold tracking-widest text-neutral-600"
                                >
                                    {toPhoneFormat(data?.data?.user?.phone || "")}
                                </p>
                            ) : (
                                <div className="w-full animate-pulse rounded-lg bg-neutral-300 py-[1.375rem]"></div>
                            )}
                        </div>
                        <div className="w-full">
                            <h6 className="mb-2 pr-2 text-sm font-bold tracking-tight text-neutral-600">تاریخ تولد:</h6>
                            {!isLoading ? (
                                <p
                                    dir="ltr"
                                    className="w-full rounded-lg bg-neutral-200 pb-2 pt-3 text-center text-base font-bold tracking-widest text-neutral-600"
                                >
                                    {data?.data?.user?.birthday?.year}/{data?.data?.user?.birthday?.month}/
                                    {data?.data?.user?.birthday?.day}
                                </p>
                            ) : (
                                <div className="w-full animate-pulse rounded-lg bg-neutral-300 py-[1.375rem]"></div>
                            )}
                        </div>
                        <div className="w-full">
                            <h6 className="mb-2 pr-2 text-sm font-bold tracking-tight text-neutral-600">
                                شماره تلفن ثابت:
                            </h6>
                            {!isLoading ? (
                                <p
                                    dir="ltr"
                                    className="w-full rounded-lg bg-neutral-200 pb-2 pt-3 text-center text-base font-bold tracking-widest text-neutral-600"
                                >
                                    {data?.data?.user?.landlinePhone
                                        ? toLandlineFormat(data.data.user.landlinePhone)
                                        : "---"}
                                </p>
                            ) : (
                                <div className="w-full animate-pulse rounded-lg bg-neutral-300 py-[1.375rem]"></div>
                            )}
                        </div>
                        <div className="w-full">
                            <h6 className="mb-2 pr-2 text-sm font-bold tracking-tight text-neutral-600">شماره کارت:</h6>
                            {!isLoading ? (
                                <p
                                    dir="ltr"
                                    className="w-full rounded-lg bg-neutral-200 pb-2 pt-3 text-center text-base font-bold tracking-widest text-neutral-600"
                                >
                                    {data?.data?.user?.credit ? toCreditFormat(data.data.user.credit) : "---"}
                                </p>
                            ) : (
                                <div className="w-full animate-pulse rounded-lg bg-neutral-300 py-[1.375rem]"></div>
                            )}
                        </div>
                        <div className="w-full">
                            <h6 className="mb-2 pr-2 text-sm font-bold tracking-tight text-neutral-600">
                                نحوه آشنایی با ما:
                            </h6>
                            {!isLoading ? (
                                <p
                                    dir="ltr"
                                    className="w-full rounded-lg bg-neutral-200 py-2.5 text-center text-base font-bold tracking-tight text-neutral-600"
                                >
                                    {getKnown(data?.data?.user?.known)}
                                </p>
                            ) : (
                                <div className="w-full animate-pulse rounded-lg bg-neutral-300 py-[1.375rem]"></div>
                            )}
                        </div>
                        <div className="col-span-1 flex w-full items-center justify-between lg:col-span-2">
                            <button
                                onClick={editingHandler}
                                className="my-5 flex items-center justify-center gap-x-0.5 text-sm font-bold text-amber-600"
                            >
                                <i className="ri-edit-2-line text-xl font-medium"></i>
                                ویرایش مشخصات
                            </button>
                            <button
                                onClick={logoutHandler}
                                className="my-5 flex items-center justify-center gap-x-0.5 text-sm font-bold text-rose-600"
                            >
                                <i className="ri-logout-box-r-line text-xl font-medium"></i>
                                خروج از حساب
                            </button>
                        </div>
                    </section>
                </div>
            </main>
            {isEditing && (
                <UpdateProfileForm
                    token={token}
                    userInfo={data?.data?.user}
                    editingHandler={editingHandler}
                    refetch={refetch}
                />
            )}
            {isLogout && (
                <div
                    onClick={logoutHandler}
                    className="fixed left-0 top-0 z-[300] grid h-full max-h-screen min-h-screen w-full place-items-center bg-white/10 px-5 backdrop-blur-sm backdrop-saturate-200"
                >
                    <section
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md overflow-hidden rounded-lg bg-white px-4 pb-2 pt-3"
                    >
                        <header className="mb-4 w-full">
                            <h3 className="w-fit bg-gradient-to-l from-neutral-700 to-neutral-500 bg-clip-text text-base font-black tracking-tight text-transparent">
                                خروج از حساب کاربری:
                            </h3>
                        </header>
                        <p className="mb-2 text-sm font-bold text-neutral-600">
                            {data?.data?.user?.firstName} عزیز،
                            <br /> با خروج از حساب، دسترسی‌های ذکر شده را از دست می‌دهید:
                        </p>
                        <ul className="mb-4 text-sm font-bold leading-6 text-neutral-500">
                            <li>1. اطلاعات سبد خرید</li>
                            <li>2. ثبت سفارش جدید</li>
                            <li>3. بررسی وضعیت سفارشات قدیمی</li>
                            <li>4. ویرایش اطلاعات حساب کاربری</li>
                        </ul>
                        <div className="grid grid-cols-2 items-stretch justify-items-stretch">
                            <button
                                onClick={LOGOUT}
                                className="flex w-full items-center justify-center rounded-lg bg-rose-100 py-1 text-sm font-extrabold text-rose-500"
                            >
                                <i className="ri-user-shared-line text-2xl font-medium"></i>
                                خروج
                            </button>
                            <button
                                onClick={logoutHandler}
                                className="flex w-full items-center justify-center py-1 text-sm font-extrabold text-neutral-600"
                            >
                                <CloseCircle variant="Linear" className="ml-0.5 h-5 w-5 text-neutral-600" />
                                منصرف شدم
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default ProfilePage;
