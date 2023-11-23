"use client";
//! Required
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getOtp, checkOtp } from "@/services/user.services";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

//! Components
import FormPhone from "./FormPhone";
import FormOtp from "./FormOtp";
import Image from "next/image";

//! Template
const LoginPage = () => {
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 10);
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [otp, setOtp] = useState("");
    const [stepper, setStepper] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [navigatedFrom, setNavigatedFrom] = useState("");

    useEffect(() => {
        if (otp.length === 6) {
            SUBMIT_CODE();
        }
    }, [otp]);

    useEffect(() => {
        if (searchParams.has("from")) {
            setNavigatedFrom(searchParams.get("from"));
        } else {
            setNavigatedFrom("/profile");
        }
    }, []);

    const { isLoading: isSubmittingPhone, mutateAsync: mutateGetOtp } = useMutation({
        mutationKey: ["get-otp"],
        mutationFn: getOtp,
    });

    const SUBMIT_PHONE = async (body) => {
        try {
            const response = await mutateGetOtp(body);
            setPhoneNumber(body.phone);
            toast.success(response?.data.message);
            setStepper(2);
        } catch (error) {
            toast.error(error?.response?.data.error);
            setPhoneNumber("");
            setStepper(1);
        }
    };

    const { isLoading: isSubmittingCode, mutateAsync: mutateCheckOtp } = useMutation({
        mutationKey: ["check-otp"],
        mutationFn: checkOtp,
    });
    const SUBMIT_CODE = async (e) => {
        if (e) e.preventDefault();
        try {
            const response = await mutateCheckOtp({ phone: phoneNumber, otp });
            setOtp("");
            if (response?.data.token) {
                // login
                setCookie("TOKEN", response?.data.token, { expires: expiryDate });
                toast.success(response?.data.message);
                window.location.href = navigatedFrom;
                return;
            } else if (response?.data.phone) {
                // register
                toast.success(response?.data.message);
                setCookie("phoneNumber", response?.data.phone);
                replace(`/login/register?from=${navigatedFrom}`);
                return;
            }
        } catch (error) {
            if (error?.response?.data.otpNotValid) {
                return toast.error(error?.response?.data.otpNotValid);
            } else if (error?.response?.data.error) {
                setPhoneNumber("");
                setOtp("");
                setStepper(1);
                return toast.error(error?.response?.data.error);
            }
        }
    };
    const renderForm = (step) => {
        switch (step) {
            case 1: {
                return <FormPhone SUBMIT_PHONE={SUBMIT_PHONE} isSubmittingPhone={isSubmittingPhone} />;
            }
            case 2: {
                return (
                    <FormOtp
                        goBack={() => setStepper((step) => step - 1)}
                        otp={otp}
                        setOtp={setOtp}
                        SUBMIT_CODE={SUBMIT_CODE}
                        isSubmittingCode={isSubmittingCode}
                        phoneNumber={phoneNumber}
                    />
                );
            }
        }
    };
    return (
        <main className="grid h-full min-h-[90vh] items-start justify-items-center px-3 pt-40 sm:px-0">
            <div className="relative w-full max-w-sm">
                <hgroup className="relative grid w-full grid-cols-2 items-center justify-items-center pb-8 text-sm font-bold text-neutral-400">
                    <h1
                        className={`flex flex-col items-center justify-center ${
                            stepper === 1 ? "font-extrabold text-orange-500" : ""
                        }`}
                    >
                        <p
                            className={`mb-2 aspect-square rounded-xl px-2 font-serif text-xl font-black ${
                                stepper === 1 ? "bg-orange-500 text-white" : " bg-neutral-300 text-neutral-100"
                            }`}
                        >
                            1
                        </p>
                        ورود شماره موبایل
                    </h1>
                    <div className="absolute top-3 w-1/3 border-b border-orange-300"></div>
                    <h2
                        className={`flex flex-col items-center justify-center ${
                            stepper === 2 ? "font-extrabold text-orange-500" : ""
                        }`}
                    >
                        <p
                            className={`mb-2 aspect-square rounded-xl px-2 font-serif text-xl font-black ${
                                stepper === 2 ? "bg-orange-500 text-white" : " bg-neutral-300 text-neutral-100"
                            }`}
                        >
                            2
                        </p>
                        تایید کد پیامک شده
                    </h2>
                </hgroup>
                <section className="relative z-30 w-full rounded-xl border border-neutral-300 bg-neutral-100/10 p-5 backdrop-blur-sm backdrop-saturate-200">
                    {renderForm(stepper)}
                </section>
                <Image
                    src="/images/فلومکس.png"
                    alt="فلومکس"
                    width="100"
                    height="50"
                    quality={10}
                    style={{ objectFit: "contain", zIndex: "20" }}
                    className="absolute -bottom-3 left-0 -rotate-[10deg]"
                />
                <Image
                    src="/images/نفت-پارس.png"
                    alt="نفت پارس"
                    width="70"
                    height="50"
                    quality={10}
                    style={{ objectFit: "contain", zIndex: "20" }}
                    className="absolute -bottom-10 right-0 rotate-[10deg]"
                />
                <Image
                    src="/images/کاسپین.png"
                    alt="کاسپین"
                    width="80"
                    height="50"
                    quality={10}
                    style={{ objectFit: "contain", zIndex: "20" }}
                    className="absolute -bottom-14 left-36 -rotate-[15deg]"
                />
                <Image
                    src="/images/اسپیدیی.png"
                    alt="اسپیدی"
                    width="80"
                    height="60"
                    quality={10}
                    style={{ objectFit: "contain", zIndex: "20" }}
                    className="absolute -bottom-6 left-[4.5rem] -rotate-[15deg]"
                />
                <Image
                    src="/images/مگلوب.png"
                    alt="مگلوب"
                    width="60"
                    height="60"
                    quality={20}
                    style={{ objectFit: "contain", zIndex: "20" }}
                    className="absolute -bottom-14 right-[5.5rem] -rotate-[15deg]"
                />
            </div>
        </main>
    );
};

export default LoginPage;
