"use client";
import { ErrorMessage, Field } from "formik";

const TheTextArea = ({ name, label, type, dir, inputMode, rows, containerClass, inputClass, placeholder, isRequired, errorHandling }) => {
    return (
        <div className={`flex w-full flex-col items-stretch justify-center ${containerClass || ""}`}>
            <label htmlFor={name} className="pr-2 text-start text-sm font-extrabold text-neutral-600">
                {label || ""}
                {isRequired && <span className="text-base text-orange-900">*</span>}
            </label>
            <Field
                as="textarea"
                name={name}
                id={name}
                type={type}
                dir={dir || "rtl"}
                inputMode={inputMode || "text"}
                aria-autocomplete="none"
                autoComplete="off"
                rows={rows || "4"}
                placeholder={placeholder || ""}
                className={`w-full rounded-xl border border-neutral-200 bg-neutral-100 px-2 py-1 text-right text-sm font-bold leading-7 text-neutral-600 outline-none duration-200 focus:border-neutral-500 focus:bg-white lg:hover:border-neutral-500 ${
                    inputClass || ""
                }`}
            />
            {!!errorHandling && (
                <span className="mt-1 text-center text-sm font-bold text-rose-500">
                    <ErrorMessage name={name} />
                </span>
            )}
        </div>
    );
};

export default TheTextArea;
