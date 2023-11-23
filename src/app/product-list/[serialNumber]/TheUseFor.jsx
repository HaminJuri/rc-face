"use client";
import { useState } from "react";

//! Template
export default function TheUseFor({ carList, showSentence }) {
    const [showUseFor, setShowUseFor] = useState(false);
    function showUseForHandler() {
        setShowUseFor((prev) => !prev);
    }

    return (
        <section className="order-3 flex flex-col items-start justify-start gap-x-2 rounded-lg border border-neutral-300 bg-white px-2 py-2 text-sm font-bold text-neutral-600 lg:order-4 lg:col-span-3">
            <header
                onClick={() => showUseForHandler()}
                className="flex w-full items-center justify-between py-3 text-base font-bold tracking-tight"
            >
                <h3>لیست وسایل‌نقلیه مناسب این محصول</h3>
                <i className={`ri-arrow-down-s-line text-2xl font-medium duration-500 ${showUseFor ? "-rotate-180" : ""}`}></i>
            </header>
            {showUseFor ? (
                <span className="mt-2 w-full">
                    <ul className="mb-2 flex w-full grow flex-wrap items-start justify-start gap-1 tracking-tight text-emerald-600">
                        {!!showSentence && (
                            <li className="mb-2 w-full grow py-1 leading-7">
                                خودروهای این لیست با معیار گرانروی روغن موتور و حداقل سطح کیفی لازم خودرو، مورد بررسی قرار گرفته‌اند تا
                                تجربه رانندگی شما به بهترین شکل ممکن باشد.
                            </li>
                        )}
                        {carList.map((car) => {
                            return (
                                <li key={car} className="w-fit rounded-full bg-neutral-200 px-2 py-0.5 text-neutral-600">
                                    {car}
                                </li>
                            );
                        })}
                    </ul>
                </span>
            ) : (
                <></>
            )}
        </section>
    );
}
