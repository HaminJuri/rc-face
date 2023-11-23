"use client";
import NormalizeString from "@/hooks/NormalizeInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";

const VALIDATION = object().shape({
    phone: string()
        .required("خطا: لطفا شماره خود را وارد کنید")
        .matches(/^\d+$/, "خطا: فقط اعداد قابل قبول است")
        .min(11, "خطا: شماره وارد شده اشتباه است")
        .max(11, "خطا: شماره وارد شده اشتباه است"),
});

//! Template
const FormPhone = ({ SUBMIT_PHONE, isSubmittingPhone }) => {
    return (
        <Formik
            initialValues={{ phone: "" }}
            validationSchema={VALIDATION}
            onSubmit={(body) => {
                body.phone = body.phone.trim();
                SUBMIT_PHONE(body);
            }}
            validateOnChange
        >
            {({ errors, touched, isValid }) => (
                <Form>
                    <div className="mb-10 flex w-full flex-col">
                        <header className="flex flex-col items-start justify-center">
                            <p className="mb-4 pr-2 text-sm font-bold text-neutral-500">سلام!</p>
                            <label
                                htmlFor="phone"
                                className="mb-2 pr-2 text-sm font-bold tracking-tight text-neutral-600"
                            >
                                لطفا شماره موبایل خود را وارد کنید:
                            </label>
                        </header>
                        <Field
                            name="phone"
                            id="phone"
                            type="text"
                            dir="ltr"
                            inputMode="numeric"
                            aria-autocomplete="none"
                            autoComplete="off"
                            maxLength="11"
                            onFocus={(e) => e.target.select()}
                            style={
                                errors.phone && touched.phone
                                    ? { border: "1px solid #f43f5e", background: "#fff1f2" }
                                    : null
                            }
                            className="w-full rounded-lg border bg-white pb-2 pt-3 text-center text-base font-bold tracking-widest text-neutral-600 outline-none duration-200 hover:border-orange-300 focus:border-orange-300 focus:bg-white focus:shadow-xl focus:shadow-orange-500/20"
                        />
                        <p className="mt-2 text-center text-sm font-bold text-rose-500">
                            <ErrorMessage name="phone" />
                        </p>
                    </div>
                    {!isSubmittingPhone ? (
                        <button
                            type="submit"
                            disabled={!isValid || isSubmittingPhone}
                            className="w-full rounded-lg bg-gradient-to-l from-orange-900 to-orange-400 pb-2.5 pt-3 text-center text-sm font-bold text-white shadow-xl shadow-orange-900/40"
                        >
                            دریافت کد
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
            )}
        </Formik>
    );
};
export default FormPhone;
