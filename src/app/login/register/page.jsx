"use client";
//! Required
import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "@/services/user.services";
import { toast } from "react-hot-toast";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

//! Components
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import NormalizeInput from "@/hooks/NormalizeInput";

const VALID_FORM = object().shape({
    firstName: string()
        .required("خطا: لطفا نام خود را وارد کنید")
        .min(2, "خطا: نام وارد شده اشتباه است")
        .matches(/^[\u0600-\u06FF\s]+$/, "خطا: لطفا از حروف فارسی استفاده کنید"),
    lastName: string()
        .required("خطا: لطفا نام خانوادگی خود را وارد کنید")
        .min(2, "خطا: نام خانوادگی وارد شده اشتباه است")
        .matches(/^[\u0600-\u06FF\s]+$/, "خطا: لطفا از حروف فارسی استفاده کنید"),
    national: string()
        .required("خطا: لطفا کد ملی خود را وارد کنید")
        .min(10, "خطا: کد ملی وارد شده اشتباه است")
        .max(10, "خطا: کد ملی وارد شده اشبتاه است")
        .matches(/^\d+$/, "خطا: فقط اعداد قابل قبول است"),
    known: string().required("لطفا روش آشنایی با روغنی کار رو وارد کنید"),
});

//! Template
const RegisterPage = () => {
    const searchParams = useSearchParams();
    let expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 3);

    const { isLoading: isSubmittingProfile, mutateAsync: mutateCompleteProfile } = useMutation({
        mutationFn: completeProfile,
    });

    const [navigatedFrom, setNavigatedFrom] = useState("");
    useEffect(() => {
        if (searchParams.has("from")) {
            setNavigatedFrom(searchParams.get("from"));
        } else {
            setNavigatedFrom("/profile");
        }
    }, []);

    const REGISTER = async (body) => {
        body.firstName = NormalizeInput(body.firstName);
        body.lastName = NormalizeInput(body.lastName);
        body.national = NormalizeInput(body.national);
        body.known = NormalizeInput(body.known);
        body.phone = getCookie("phoneNumber");
        try {
            const res = await mutateCompleteProfile(body);
            toast.success("تکمیل اطلاعات و دسترسی به ثبت سفارش با موفقیت صورت گرفت");
            deleteCookie("phoneNumber");
            setCookie("TOKEN", res?.data.token, { expires: expiryDate });
            window.location.href = navigatedFrom;
        } catch (error) {
            toast.error(error?.response?.data.error);
        }
    };
    return (
        <main className="grid h-full min-h-[90vh] items-start justify-items-center px-3 pt-20 sm:px-0">
            <div className="w-full max-w-sm lg:max-w-md">
                <header className="mb-1 flex w-full items-center justify-between px-3 text-lg font-medium tracking-tight text-orange-500">
                    <h1>تکمیل اطلاعات:</h1>
                </header>
                <section className="w-full rounded-xl border border-neutral-300 p-5">
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            national: "",
                            known: "",
                        }}
                        validationSchema={VALID_FORM}
                        onSubmit={REGISTER}
                        validateOnChange
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-5 flex w-full flex-col">
                                    <label htmlFor="firstName" className="mb-2 pr-1 text-sm font-bold tracking-tight text-neutral-500">
                                        نام:
                                    </label>
                                    <Field
                                        name="firstName"
                                        type="text"
                                        dir="rtl"
                                        aria-autocomplete="none"
                                        autoComplete="off"
                                        onFocus={(e) => e.target.select()}
                                        style={
                                            errors.firstName && touched.firstName
                                                ? { border: "1px solid #f43f5e", background: "#fff1f2" }
                                                : null
                                        }
                                        className="w-full rounded-lg border bg-white py-2.5 text-center text-base font-bold text-neutral-600 outline-none duration-200 hover:border-orange-300 focus:border-orange-300 focus:bg-white focus:shadow-xl focus:shadow-orange-500/20"
                                    />
                                    <p className="mt-1 text-center text-sm font-bold text-rose-500">
                                        <ErrorMessage name="firstName" />
                                    </p>
                                </div>
                                <div className="mb-5 flex w-full flex-col">
                                    <label htmlFor="lastName" className="mb-2 pr-1 text-sm font-bold tracking-tight text-neutral-500">
                                        نام خانوادگی:
                                    </label>
                                    <Field
                                        name="lastName"
                                        type="text"
                                        dir="rtl"
                                        aria-autocomplete="none"
                                        autoComplete="off"
                                        onFocus={(e) => e.target.select()}
                                        style={
                                            errors.lastName && touched.lastName
                                                ? { border: "1px solid #f43f5e", background: "#fff1f2" }
                                                : null
                                        }
                                        className="w-full rounded-lg border bg-white py-2.5 text-center text-base font-bold text-neutral-600 outline-none duration-200 hover:border-orange-300 focus:border-orange-300 focus:bg-white focus:shadow-xl focus:shadow-orange-500/20"
                                    />
                                    <p className="mt-1 text-center text-sm font-bold text-rose-500">
                                        <ErrorMessage name="lastName" />
                                    </p>
                                </div>
                                <div className="mb-5 flex w-full flex-col">
                                    <label htmlFor="national" className="mb-2 pr-1 text-sm font-bold tracking-tight text-neutral-500">
                                        کد ملی: <span className="text-xs text-neutral-400">( جهت ثبت فاکتور در هر سفارش )</span>
                                    </label>
                                    <Field
                                        name="national"
                                        type="text"
                                        dir="ltr"
                                        inputMode="numeric"
                                        aria-autocomplete="none"
                                        autoComplete="off"
                                        onFocus={(e) => e.target.select()}
                                        style={
                                            errors.national && touched.national
                                                ? { border: "1px solid #f43f5e", background: "#fff1f2" }
                                                : null
                                        }
                                        className="w-full rounded-lg border bg-white pb-2 pt-3 text-center text-base font-bold tracking-widest text-neutral-600 outline-none duration-200 hover:border-orange-300 focus:border-orange-300 focus:bg-white focus:shadow-xl focus:shadow-orange-500/20"
                                    />
                                    <p className="mt-1 text-center text-sm font-bold text-rose-500">
                                        <ErrorMessage name="national" />
                                    </p>
                                </div>
                                <div className="mb-5 flex w-full flex-col">
                                    <label htmlFor="known" className="mb-2 pr-1 text-sm font-bold tracking-tight text-neutral-500">
                                        نحوه آشنایی شما با روغنی کار:
                                    </label>
                                    <Field
                                        as="select"
                                        name="known"
                                        style={
                                            errors.known && touched.known ? { border: "1px solid #f43f5e", background: "#fff1f2" } : null
                                        }
                                        className="w-full rounded-lg border bg-white py-2.5 text-center text-sm font-bold text-neutral-600 outline-none duration-200 hover:border-orange-300 focus:border-orange-300 focus:bg-white focus:shadow-xl focus:shadow-orange-500/20"
                                    >
                                        <option hidden aria-hidden />
                                        <option value="1">جستجو (مثلا گوگل)</option>
                                        <option value="2">به پیشنهاد دیگری (مثلا همکار)</option>
                                        <option value="3">شبکه های اجتماعی (مثلا اینستاگرام)</option>
                                        <option value="4">مشاهده تبلیغات</option>
                                    </Field>
                                    <p className="mt-1 text-center text-sm font-bold text-rose-500">
                                        <ErrorMessage name="known" />
                                    </p>
                                </div>
                                {!isSubmittingProfile ? (
                                    <button
                                        type="submit"
                                        className="w-full rounded-lg bg-gradient-to-l from-orange-900 to-orange-400 py-3 text-center text-sm font-bold text-white"
                                    >
                                        ثبت نام
                                    </button>
                                ) : (
                                    <div className="flex w-full justify-center">
                                        <div className="lds-ellipsis">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>
                                )}
                                <p className="mt-4 text-center text-xs font-bold text-neutral-600">
                                    ثبت نام شما به معنای پذیرش{" "}
                                    <Link href="/terms-and-rules" className="px-0.5 italic underline underline-offset-2">
                                        قوانین
                                    </Link>{" "}
                                    استفاده از سایت است
                                </p>
                            </Form>
                        )}
                    </Formik>
                </section>
            </div>
        </main>
    );
};
export default RegisterPage;
