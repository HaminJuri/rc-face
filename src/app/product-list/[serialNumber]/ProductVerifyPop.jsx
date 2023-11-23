"use client";
import { CloseCircle, Verify } from "iconsax-react";
import { useEffect, useState } from "react";

//! Template
const ProductVerifyPop = ({ title }) => {
    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if (show) {
            setDisplay(true);
        } else if (!show) {
            setTimeout(() => {
                setDisplay(false);
            }, 400);
        }
    }, [show]);

    return (
        <>
            <button
                type="button"
                onClick={() => setShow(true)}
                className="relative mt-5 flex w-full items-center justify-center rounded-xl border border-amber-500 bg-orange-50 py-4 text-sm font-bold text-amber-600 lg:py-3"
            >
                <Verify variant="Bulk" className="h-7 w-7 text-amber-600" />
                ضمانت اصالت و کیفیت کالا
            </button>
            {!!display && (
                <section
                    onClick={() => setShow(false)}
                    className={`fixed right-0 top-0 z-[400] flex h-full w-full items-start justify-center overflow-y-auto bg-black/25 p-3 backdrop-blur-md lg:items-center ${
                        show ? "show-verify-pop" : "not-show-verify-pop"
                    }`}
                >
                    <div className="w-full rounded-2xl bg-white px-3 py-4 lg:max-w-lg">
                        <hgroup className="mb-3 flex w-full flex-col items-start justify-center gap-y-1 tracking-tight">
                            <h3 className="w-fit bg-gradient-to-l from-orange-900 to-orange-400 bg-clip-text text-lg font-black text-transparent">
                                حرف اوّل: <span className="text-[17px] font-extrabold">تضمین اصالت و تامین کیفیت کالا</span>
                            </h3>
                            <h4 className="ellipsis-one-line text-justify text-xs font-bold text-neutral-400">{title}</h4>
                        </hgroup>
                        <p className="text-justify text-sm font-bold leading-7 tracking-tight text-neutral-600">
                            تضمین ضمانت و اصالت کالا برای مشتریان ما از اهمیت بالایی برخوردار است. ما اصالت کالای مورد فروش را به عنوان
                            اولین اولویت خود قرار می‌دهیم و به صورت دقیق و کامل برای اطمینان از{" "}
                            <span className="font-extrabold text-orange-500">کیفیت 100% کالا</span> تلاش می‌کنیم. هر محصولی که از طرف ما به
                            شما ارائه می‌شود، با قیمت روی بسته بندی خود تطابق دارد تا شما به آسانی بتوانید کالای اصلی را تشخیص دهید. همچنین،
                            برای افزایش اطمینان شما، تمام محصولات ما دارای کد اختصاصی روی بسته بندی هستند که به شما این امکان را می‌دهد تا
                            اصالت محصول را با استفاده از این کد بررسی کنید و از اینکه کالایی با کیفیت و اصلی را دریافت می‌کنید، اطمینان حاصل
                            کنید.
                        </p>
                        <button
                            type="button"
                            className="mt-4 flex w-full items-center justify-center gap-x-0.5 rounded-lg border border-orange-500 py-3 text-sm font-bold text-orange-900"
                        >
                            <CloseCircle variant="Linear" className="h-5 w-5 text-orange-500" />
                            بستن
                        </button>
                    </div>
                </section>
            )}
        </>
    );
};

export default ProductVerifyPop;
