"use client";
//! Required
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSeSe from "@/app/useSeSe";

//! Components
import { ArrowLeft2, ArrowRight, SearchNormal1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

//! Template
const TheSearch = ({ isTheSearchHandler, searchTerms, setSearchTerms, inputRef, isDesktop }) => {
    const router = useRouter();
    const nowInPersian = new Date().toLocaleDateString("fa-IR");

    const {
        data: SEARCH_SECTION,
        isLoading: isFetchingSearchSection,
        isSuccess: fetchedSearchSection,
        refetch: refetchSearchSection,
    } = useSeSe();

    const [focusShadow, setFocusShadow] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        inputRef.current.blur();
        isTheSearchHandler();
        router.push(`/product-list?s=${searchTerms}`);
    };

    if (!isDesktop) {
        return (
            <>
                <form
                    onSubmit={submitHandler}
                    className="sticky top-0 z-[401] flex w-full items-center justify-start bg-white/5 px-1 py-3 shadow-xl shadow-black/5 backdrop-blur-md backdrop-saturate-[4] sm:rounded-b-lg"
                >
                    <button
                        type="button"
                        onClick={isTheSearchHandler}
                        className="ml-1 flex h-full flex-col items-center justify-center rounded-md bg-red-100 px-1 py-1 text-[10px] font-bold text-red-500"
                    >
                        <ArrowRight variant="Linear" className="-ml-1 -mr-1 h-6 w-6" />
                        بازگشت
                    </button>
                    <header
                        className={`grid grow grid-cols-[1fr_auto] items-center justify-items-center overflow-hidden rounded-lg border border-orange-300 bg-white pr-2 duration-200 ${
                            focusShadow ? "bg-white shadow-xl shadow-neutral-300" : "bg-neutral-100 shadow-none"
                        }`}
                    >
                        <input
                            type="text"
                            name="searchTerms"
                            id="searchTerms"
                            dir="rtl"
                            aria-autocomplete="none"
                            autoComplete="off"
                            placeholder="جستجو محصول..."
                            ref={inputRef}
                            value={searchTerms}
                            onFocus={() => setFocusShadow(true)}
                            onBlur={() => setFocusShadow(false)}
                            onChange={(e) => setSearchTerms(e.target.value)}
                            className="w-full bg-transparent py-5 text-sm font-bold tracking-tight text-neutral-600 outline-none placeholder:text-neutral-600 placeholder:duration-500 focus:placeholder:text-transparent"
                        />
                        <button type="submit" className="h-full">
                            <SearchNormal1 variant="Linear" className="ml-1.5 h-7 w-7 -scale-x-100 text-orange-500" />
                        </button>
                    </header>
                </form>
                {/* Popular Search Section */}
                <section className="mt-7 w-full">
                    <header className="mb-4 flex items-center justify-start gap-x-2 pr-2">
                        <h4 className="w-fit bg-gradient-to-l from-neutral-800 to-neutral-500 bg-clip-text font-extrabold tracking-tight text-transparent">
                            جستجوهای پرطرفدارِ امروز:
                        </h4>
                        <span className="text-sm font-extrabold text-orange-900">{nowInPersian}</span>
                    </header>
                    <ul className="flex w-full flex-wrap gap-2">
                        {!!fetchedSearchSection &&
                            SEARCH_SECTION.popularSearches.map((ps) => {
                                return (
                                    <li key={ps._id}>
                                        <Link
                                            href={`/product-list?s=${ps.value}`}
                                            className="flex items-center justify-start rounded-full bg-neutral-200 p-1.5 pl-2.5 text-sm font-bold text-neutral-600"
                                        >
                                            <ArrowLeft2 variant="Bold" className="h-5 w-5 text-neutral-400" />
                                            {ps.value}
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </section>
                {/* Popular Search Section */}
                <div className="mx-auto my-10 w-1/3 border-b border-neutral-300"></div>
                {/* Popular Product Section */}
                <section className="w-full">
                    <header className="mb-4 flex items-center justify-start gap-x-2 pr-2">
                        <h4 className="w-fit bg-gradient-to-l from-neutral-800 to-neutral-500 bg-clip-text font-extrabold tracking-tight text-transparent">
                            پرفروشترین‌های امروز:
                        </h4>
                        <span className="text-sm font-extrabold text-orange-900">{nowInPersian}</span>
                    </header>
                    <div className="grid w-full grid-cols-2 gap-3 pb-10 md:grid-cols-4">
                        {!!fetchedSearchSection &&
                            SEARCH_SECTION.popularProduct.map((pp) => {
                                return (
                                    <Link
                                        key={pp._id}
                                        href={"/product-list/" + pp.serialNumber}
                                        className="flex h-full w-full flex-col items-center justify-between gap-y-3 rounded-lg bg-white py-2 duration-200 lg:hover:scale-110 lg:hover:shadow-xl"
                                    >
                                        <hgroup className="order-2 flex h-full w-full flex-col items-center justify-between px-2">
                                            <h2 className="ellipsis-one-line text-start text-sm font-bold text-neutral-700">{pp.title}</h2>
                                            <h3 className="ellipsis-one-line text-start text-sm font-bold text-neutral-500">
                                                {pp.subtitle}
                                            </h3>
                                        </hgroup>
                                        <figure className="order-1">
                                            <Image
                                                src={pp.img || "/images/no-image.png"}
                                                alt={pp.title}
                                                sizes="100vw"
                                                width={100}
                                                height={100}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "contain",
                                                }}
                                                className={pp.img ? "" : "opacity-50"}
                                            />
                                        </figure>
                                    </Link>
                                );
                            })}
                    </div>
                </section>
                {/* Popular Product Section */}
            </>
        );
    }
    if (isDesktop) {
        return (
            <>
                <div className="mt-20 grid w-full items-start justify-items-stretch">
                    <div className="w-full pl-2 pr-4">
                        {/* Popular Search Section */}
                        <section className="w-full">
                            <header className="mb-4 flex items-center justify-start gap-x-2 pr-2">
                                <h4 className="w-fit bg-gradient-to-l from-neutral-800 to-neutral-500 bg-clip-text font-extrabold tracking-tight text-transparent">
                                    جستجوهای پرطرفدارِ امروز:
                                </h4>
                                <span className="text-sm font-extrabold text-orange-900">{nowInPersian}</span>
                            </header>
                            <ul className="flex w-full flex-wrap gap-2">
                                {!!fetchedSearchSection &&
                                    SEARCH_SECTION.popularSearches.map((ps) => {
                                        return (
                                            <li key={ps._id}>
                                                <Link
                                                    href={`/product-list?s=${ps.value}`}
                                                    className="flex items-center justify-start rounded-full bg-neutral-200 p-1.5 pl-2.5 text-sm font-bold text-neutral-600"
                                                >
                                                    <ArrowLeft2 variant="Bold" className="h-5 w-5 text-neutral-400" />
                                                    {ps.value}
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </section>
                        {/* Popular Search Section */}
                        <div className="mx-auto my-10 w-1/3 border-b border-neutral-300"></div>
                        {/* Popular Product Section */}
                        <section className="w-full">
                            <header className="mb-4 flex items-center justify-start gap-x-2 pr-2">
                                <h4 className="w-fit bg-gradient-to-l from-neutral-800 to-neutral-500 bg-clip-text font-extrabold tracking-tight text-transparent">
                                    پرفروشترین‌های امروز:
                                </h4>
                                <span className="text-sm font-extrabold text-orange-900">{nowInPersian}</span>
                            </header>
                            <div className="grid w-full grid-cols-2 items-stretch justify-items-stretch gap-3">
                                {!!fetchedSearchSection &&
                                    SEARCH_SECTION.popularProduct.map((pp) => {
                                        return (
                                            <Link
                                                key={pp._id}
                                                href={"/product-list/" + pp.serialNumber}
                                                className="flex h-full w-full flex-col items-center justify-between gap-y-3 rounded-lg bg-white py-2 duration-200 lg:hover:scale-110 lg:hover:shadow-xl"
                                            >
                                                <hgroup className="order-2 flex h-full w-full flex-col items-center justify-between px-2">
                                                    <h2 className="ellipsis-one-line text-start text-sm font-bold text-neutral-700">
                                                        {pp.title}
                                                    </h2>
                                                    <h3 className="ellipsis-one-line text-start text-sm font-bold text-neutral-500">
                                                        {pp.subtitle}
                                                    </h3>
                                                </hgroup>
                                                <figure className="order-1">
                                                    <Image
                                                        src={pp.img || "/images/no-image.png"}
                                                        alt={pp.title}
                                                        sizes="100vw"
                                                        width={100}
                                                        height={100}
                                                        style={{
                                                            width: "100px",
                                                            height: "100px",
                                                            objectFit: "contain",
                                                        }}
                                                        className={pp.img ? "" : "opacity-50"}
                                                    />
                                                </figure>
                                            </Link>
                                        );
                                    })}
                            </div>
                        </section>
                        {/* Popular Product Section */}
                    </div>
                </div>
            </>
        );
    }
};

export default TheSearch;
