"use client";
import { ErrorMessage, Field } from "formik";

const TheField = ({
    name,
    label,
    type,
    dir,
    inputMode,
    containerClass,
    inputClass,
    maxLength,
    isRequired,
    forExample,
    labelClass,
    errorHandling,
}) => {
    return (
        <div className={`flex w-full flex-col items-stretch justify-center ${containerClass || ""}`}>
            <label htmlFor={name} className={`pr-2 text-start text-sm font-extrabold text-neutral-600 ${labelClass || ""}`}>
                {label || ""}
                {isRequired && <span className="text-base text-orange-900">*</span>}
            </label>
            <Field
                name={name}
                id={name}
                type={type || "text"}
                dir={dir || "rtl"}
                inputMode={inputMode || "text"}
                aria-autocomplete="none"
                autoComplete="off"
                maxLength={maxLength || "auto"}
                className={`w-full rounded-xl border border-neutral-200 bg-neutral-100 py-3 text-center text-sm font-bold tracking-widest text-neutral-600 outline-none duration-200 focus:border-neutral-500 focus:bg-white lg:hover:border-neutral-500 ${
                    inputClass || ""
                }`}
            />
            {!!forExample && <p className="mt-1 grow pr-2 text-start text-xs font-bold text-neutral-400">{forExample}</p>}
            {!!errorHandling && (
                <span className="mt-1 text-center text-sm font-bold text-rose-500">
                    <ErrorMessage name={name} />
                </span>
            )}
        </div>
    );
};

export default TheField;
