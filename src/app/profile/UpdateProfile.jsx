"use client";
import NormalizeInput from "@/hooks/NormalizeInput";
//! Required
import { updateProfile } from "@/services/user.services";
import { useMutation } from "@tanstack/react-query";

//! Components
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";
import { object, string, number } from "yup";

const VALIDATE = object().shape({
    firstName: string()
        .required("خطا: لطفا نام خود را وارد کنید")
        .min(3, "خطا: نام وارد شده اشتباه است")
        .matches(/^[\u0600-\u06FF\s]+$/, "خطا: لطفا از حروف فارسی استفاده کنید"),
    lastName: string()
        .required("خطا: لطفا نام خانوادگی خود را وارد کنید")
        .min(3, "خطا: نام خانوادگی وارد شده اشتباه است")
        .matches(/^[\u0600-\u06FF\s]+$/, "خطا: لطفا از حروف فارسی استفاده کنید"),
    national: string()
        .required("خطا: لطفا کد ملی خود را وارد کنید")
        .matches(/^\d+$/, "خطا: فقط اعداد قابل قبول است")
        .min(10, "خطا: کد ملی وارد شده اشتباه است")
        .max(10, "خطا: کد ملی وارد شده اشبتاه است"),
    landlinePhone: string()
        .min(11, "خطا: شماره وارد شده اشتباه است")
        .max(11, "خطا: شماره وارد شده اشتباه است")
        .matches(/^\d+$/, "خطا: فقط اعداد قابل قبول است"),
    credit: string()
        .min(16, "خطا: شماره کارت وارد شده اشتباه است")
        .max(16, "خطا: شماره کارت وارد شده اشتباه است")
        .matches(/^\d+$/, "خطا: فقط اعداد قابل قبول است"),
    year: number().min(1300, "خطا: سال وارد شده اشتباه است").max(1400, "خطا: سال وارد شده اشتباه است"),
    month: number().min(1, "خطا: ماه وارد شده اشتباه است").max(12, "خطا: ماه وارد شده اشتباه است"),
    day: number().min(1, "خطا: روز وارد شده اشتباه است").max(31, "خطا: روز وارد شده اشتباه است"),
});

//! Template
const UpdateProfileForm = ({ editingHandler, userInfo, token, refetch }) => {
    const { isLoading: isUpdatingProfile, mutateAsync: mutateUpdateProfile } = useMutation({
        mutationFn: updateProfile,
        mutationKey: ["update-profile"],
    });

    const UPDATE = async (body) => {
        body.firstName = NormalizeInput(body.firstName);
        body.lastName = NormalizeInput(body.lastName);
        body.national = NormalizeInput(body.national);
        body.landlinePhone = NormalizeInput(body.landlinePhone);
        body.credit = NormalizeInput(body.credit);
        body.birthday = {
            year: NormalizeInput(body.year),
            month: NormalizeInput(body.month),
            day: NormalizeInput(body.day),
        };
        const { year, month, day, ...restBody } = body;
        try {
            const res = await mutateUpdateProfile({ data: restBody, token });
            toast.success(res?.data?.statusMessage);
            refetch();
            editingHandler();
        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
    };
    return (
        <div
            onClick={editingHandler}
            className="fixed left-0 top-0 z-[500] grid h-full max-h-screen min-h-screen w-full items-start justify-items-center overflow-y-auto bg-white/10 p-4 pb-60 backdrop-blur-sm backdrop-saturate-200 sm:p-0 lg:place-items-center"
        >
            <Formik
                initialValues={{
                    firstName: userInfo?.firstName || "",
                    lastName: userInfo?.lastName || "",
                    national: userInfo?.national || "",
                    year: userInfo?.birthday?.year || "",
                    month: userInfo?.birthday?.month || "",
                    day: userInfo?.birthday?.day || "",
                    landlinePhone: userInfo?.landlinePhone || "",
                    credit: userInfo?.credit || "",
                }}
                validationSchema={VALIDATE}
                enableReinitialize={true}
                onSubmit={UPDATE}
            >
                {({ errors, touched }) => {
                    return (
                        <Form
                            onClick={(e) => e.stopPropagation()}
                            className="grid w-full max-w-3xl grid-cols-1 gap-4 rounded-lg bg-white p-5 lg:grid-cols-2"
                        >
                            <div className="flex w-full flex-col">
                                <label htmlFor="firstName" className="mb-2 pr-1 text-sm font-bold tracking-tight text-neutral-500">
                                    نام:<span className="text-base text-orange-900">*</span>
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
                            <div className="flex w-full flex-col">
                                <label htmlFor="lastName" className="mb-2 pr-1 text-sm font-bold tracking-tight text-neutral-500">
                                    نام خانوادگی:<span className="text-base text-orange-900">*</span>
                                </label>
                                <Field
                                    name="lastName"
                                    type="text"
                                    dir="rtl"
                                    aria-autocomplete="none"
                                    autoComplete="off"
                                    onFocus={(e) => e.target.select()}
                                    style={
                                        errors.lastName && touched.lastName ? { border: "1px solid #f43f5e", background: "#fff1f2" } : null
                                    }
                                    className="w-full rounded-lg border bg-white py-2.5 text-center text-base font-bold text-neutral-600 outline-none duration-200 hover:border-orange-300 focus:border-orange-300 focus:bg-white focus:shadow-xl focus:shadow-orange-500/20"
                                />
                                <p className="mt-1 text-center text-sm font-bold text-rose-500">
                                    <ErrorMessage name="lastName" />
                                </p>
                            </div>
                            <div className="flex w-full flex-col">
                                <label htmlFor="national" className="mb-2 pr-1 text-sm font-bold tracking-tight text-neutral-500">
                                    کد ملی:<span className="text-base text-orange-900">*</span>
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
                                        errors.national && touched.national ? { border: "1px solid #f43f5e", background: "#fff1f2" } : null
                                    }
                                    className="w-full rounded-lg border bg-white py-2.5 text-center text-base font-bold text-neutral-600 outline-none duration-200 hover:border-orange-300 focus:border-orange-300 focus:bg-white focus:shadow-xl focus:shadow-orange-500/20"
                                />
                                <p className="mt-1 text-center text-sm font-bold text-rose-500">
                                    <ErrorMessage name="national" />
                                </p>
                            </div>
                            <div className="flex w-full flex-col">
                                <label className="mb-2 pr-1 text-sm font-bold tracking-tight text-neutral-500">تاریخ تولد:</label>
                                <div className="grid w-full grid-cols-[1fr_0.5fr_1fr_0.5fr_2fr] items-center justify-items-center gap-1">
                                    <Field
                                        name="day"
                                        type="number"
                                        dir="ltr"
                                        inputMode="numeric"
                                        aria-autocomplete="none"
                                        autoComplete="off"
                                        onFocus={(e) => e.target.select()}
                                        style={errors.day && touched.day ? { border: "1px solid #f43f5e", background: "#fff1f2" } : null}
                                        className="h-full w-full rounded-lg border bg-white text-center text-base font-bold text-neutral-600 outline-none duration-200 hover:border-orange-300 focus:border-orange-300 focus:bg-white focus:shadow-xl focus:shadow-orange-500/20"
                                    />
                                    <span className="font-bold text-neutral-500">/</span>
                                    <Field
                                        name="month"
                                        type="number"
                                        dir="ltr"
                                        inputMode="numeric"
                                        aria-autocomplete="none"
                                        autoComplete="off"
                                        maxLength="2"
                                        onFocus={(e) => e.target.select()}
                                        style={
                                            errors.month && touched.month ? { border: "1px solid #f43f5e", background: "#fff1f2" } : null
                                        }
                                        className="h-full w-full rounded-lg border bg-white text-center text-base font-bold text-neutral-600 outline-none duration-200 hover:border-orange-300 focus:border-orange-300 focus:bg-white focus:shadow-xl focus:shadow-orange-500/20"
                                    />
                                    <span className="font-bold text-neutral-500">/</span>
                                    <Field
                                        name="year"
                                        type="number"
                                        dir="ltr"
                                        inputMode="numeric"
                                        aria-autocomplete="none"
                                        autoComplete="off"
                                        maxLength="4"
                                        onFocus={(e) => e.target.select()}
                                        style={errors.year && touched.year ? { border: "1px solid #f43f5e", background: "#fff1f2" } : null}
                                        className="h-full w-full rounded-lg border bg-white py-2.5 text-center text-base font-bold text-neutral-600 outline-none duration-200 hover:border-orange-300 focus:border-orange-300 focus:bg-white focus:shadow-xl focus:shadow-orange-500/20"
                                    />
                                </div>
                                <p className="mt-2 text-center text-sm font-bold text-rose-500">
                                    <ErrorMessage name="year" /> <ErrorMessage name="month" /> <ErrorMessage name="day" />
                                </p>
                            </div>
                            <div className="flex w-full flex-col">
                                <label htmlFor="landlinePhone" className="mb-2 pr-1 text-sm font-bold tracking-tight text-neutral-500">
                                    شماره تلفن ثابت: (با کد شهری)
                                </label>
                                <Field
                                    name="landlinePhone"
                                    type="text"
                                    dir="ltr"
                                    inputMode="numeric"
                                    aria-autocomplete="none"
                                    autoComplete="off"
                                    onFocus={(e) => e.target.select()}
                                    style={
                                        errors.landlinePhone && touched.landlinePhone
                                            ? { border: "1px solid #f43f5e", background: "#fff1f2" }
                                            : null
                                    }
                                    className="w-full rounded-lg border bg-white py-2.5 text-center text-base font-bold text-neutral-600 outline-none duration-200 hover:border-orange-300 focus:border-orange-300 focus:bg-white focus:shadow-xl focus:shadow-orange-500/20"
                                />
                                <p className="mt-1 text-center text-sm font-bold text-rose-500">
                                    <ErrorMessage name="landlinePhone" />
                                </p>
                            </div>
                            <div className="flex w-full flex-col">
                                <label htmlFor="credit" className="mb-2 pr-1 text-sm font-bold tracking-tight text-neutral-500">
                                    شماره کارت:
                                </label>
                                <Field
                                    name="credit"
                                    type="number"
                                    dir="ltr"
                                    aria-autocomplete="none"
                                    autoComplete="off"
                                    onFocus={(e) => e.target.select()}
                                    style={errors.credit && touched.credit ? { border: "1px solid #f43f5e", background: "#fff1f2" } : null}
                                    className="w-full rounded-lg border bg-white py-2.5 text-center text-base font-bold text-neutral-600 outline-none duration-200 hover:border-orange-300 focus:border-orange-300 focus:bg-white focus:shadow-xl focus:shadow-orange-500/20"
                                />
                                <p className="mt-1 text-center text-sm font-bold text-rose-500">
                                    <ErrorMessage name="credit" />
                                </p>
                            </div>
                            {!isUpdatingProfile ? (
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-gradient-to-l from-orange-900 to-orange-400 py-3 text-center text-sm font-bold text-white lg:col-span-2"
                                >
                                    به‌روزرسانی مشخصات
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
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default UpdateProfileForm;
