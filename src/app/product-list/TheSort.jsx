"use client";
import { StatusUp } from "iconsax-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useEffect } from "react";

const TheSort = ({ showSort, setShowSort, selectedSort, setSort, isDesktop }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        ({ name, value, type }) => {
            const params = new URLSearchParams(searchParams);
            switch (type) {
                case "DEL": {
                    params.delete(name);
                    return params.toString();
                }
                case "ADD": {
                    params.set(name, value);
                    return params.toString();
                }
            }
        },
        [searchParams],
    );

    useEffect(() => {
        if (showSort) {
            document.body.classList.add("overflow-y-hidden");
        } else if (!showSort) {
            document.body.classList.remove("overflow-y-hidden");
        }
    }, [showSort]);

    const sortHandler = (sort) => {
        setSort(sort);
        router.push(pathname + "?" + createQueryString({ type: "ADD", name: "sort", value: sort }), {
            scroll: true,
        });
        setShowSort(false);
    };

    const mobileInnerSelectedSort = (num) => {
        switch (+num) {
            case 1: {
                return "پیشنهاد روغنیـ‌کار";
            }
            case 2: {
                return "پرفروش‌ترین‌ها";
            }
            case 3: {
                return "گران‌ترین‌ها";
            }
            case 4: {
                return "ارزان‌ترین‌ها";
            }
        }
    };

    if (!isDesktop) {
        return (
            <>
                <header className="flex w-full items-center justify-between pb-2 lg:hidden">
                    <h2 className="bg-gradient-to-l from-orange-900 to-orange-500 bg-clip-text text-lg font-black tracking-tight text-transparent">
                        لیست محصولات
                    </h2>
                    <button
                        onClick={() => setShowSort(true)}
                        className="flex items-center justify-center rounded-lg bg-neutral-100/50 px-2 py-2.5 text-sm font-extrabold text-orange-500 backdrop-blur-md lg:hidden"
                    >
                        <StatusUp variant="Bulk" className="h-7 w-7 -rotate-90 -scale-x-100 text-orange-500" />
                        {mobileInnerSelectedSort(selectedSort)}
                    </button>
                </header>
                {showSort ? (
                    <>
                        <section
                            onClick={() => setShowSort(false)}
                            className="fixed left-0 right-0 top-0 z-[205] grid h-full max-h-screen min-h-screen w-full place-items-center backdrop-blur-sm"
                        >
                            <div className="z-[202] w-full max-w-xs overflow-hidden rounded-xl border border-neutral-200 bg-white">
                                <ul className="flex flex-col items-stretch justify-stretch text-sm font-bold text-neutral-500">
                                    <li>
                                        <button
                                            onClick={() => sortHandler("1")}
                                            className={`h-full w-full py-4 ${
                                                selectedSort === "1" ? "bg-orange-100 font-extrabold text-orange-500" : ""
                                            }`}
                                        >
                                            پیشنهاد روغنیـ‌کار
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => sortHandler("2")}
                                            className={`h-full w-full py-4 ${
                                                selectedSort === "2" ? "bg-orange-100 font-extrabold text-orange-500" : ""
                                            }`}
                                        >
                                            پرفروش‌ترین‌ها
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => sortHandler("3")}
                                            className={`h-full w-full py-4 ${
                                                selectedSort === "4" ? "bg-orange-100 font-extrabold text-orange-500" : ""
                                            }`}
                                        >
                                            گران‌ترین‌ها
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => sortHandler("4")}
                                            className={`h-full w-full py-4 ${
                                                selectedSort === "4" ? "bg-orange-100 font-extrabold text-orange-500" : ""
                                            }`}
                                        >
                                            ارزان‌ترین‌ها
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => setShowSort(false)} className="h-full w-full bg-rose-50 py-3 text-rose-500">
                                            بستن
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </>
                ) : (
                    <></>
                )}
            </>
        );
    }

    if (isDesktop) {
        return (
            <header className="hidden h-full w-full items-center justify-between border-b-2 border-dashed border-orange-300 lg:col-span-2 lg:flex">
                <h5 className="text-base font-extrabold tracking-tight text-neutral-500">مرتب‌سازی لیست:</h5>
                <div className="flex w-fit items-center justify-end gap-x-5 text-sm font-bold text-neutral-500">
                    <button
                        onClick={() => sortHandler("1")}
                        className={selectedSort === "1" ? "bg-half-light-2 font-extrabold text-orange-900" : ""}
                    >
                        پیشنهاد روغنی‌کار
                    </button>
                    <button
                        onClick={() => sortHandler("2")}
                        className={selectedSort === "2" ? "bg-half-light-2 font-extrabold text-orange-900" : ""}
                    >
                        پرفروش‌ترین‌ها
                    </button>
                    <button
                        onClick={() => sortHandler("3")}
                        className={selectedSort === "3" ? "bg-half-light-2 font-extrabold text-orange-900" : ""}
                    >
                        گران‌ترین‌ها
                    </button>
                    <button
                        onClick={() => sortHandler("4")}
                        className={selectedSort === "4" ? "bg-half-light-2 font-extrabold text-orange-900" : ""}
                    >
                        ارزانترین‌ها
                    </button>
                </div>
            </header>
        );
    }
};

export default TheSort;
