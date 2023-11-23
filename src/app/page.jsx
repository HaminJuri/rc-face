//! Components
import EventsSection from "@/app/EventsSection";
import HorseMen from "@/components/HorseMen";
import Image from "next/image";
import Link from "next/link";
import FigToHorse from "./FigToHorse";

//! SEOMeta
let now = new Date().toLocaleDateString("fa-IR", {
    month: "long",
    day: "numeric",
});

export function generateMetadata() {
    return {
        title: `🚗 روغنی کار | ( ${now} ) قیمت روغن موتور | فیلتر هوا | روغن ترمز`,
        description:
            "روغنی کار، مرجع فروش انواع روغن موتور | فیلتر هوا | فیلتر روغن | روغن ترمز | فیلتر سوخت | فیلتر کابین | ضدیخ و آب رادیاتور | تمیز کننده جلو داشبورد | روغن هیدرولیک به سرتاسر ایران",
        openGraph: {
            title: `🚗 روغنی کار | ( ${now} ) قیمت روغن موتور | فیلتر هوا | روغن ترمز`,
            description:
                "روغنی کار، مرجع فروش انواع روغن موتور | فیلتر هوا | فیلتر روغن | روغن ترمز | فیلتر سوخت | فیلتر کابین | ضدیخ و آب رادیاتور | تمیز کننده جلو داشبورد | روغن هیدرولیک به سرتاسر ایران",
            type: "website",
            locale: "fa_IR",
            siteName: "@roghanicar_com",
            url: "https://roghanicar.com",
        },
        twitter: {
            title: `🚗 روغنی کار | ( ${now} ) قیمت روغن موتور | فیلتر هوا | روغن ترمز`,
            description:
                "روغنی کار، مرجع فروش انواع روغن موتور | فیلتر هوا | فیلتر روغن | روغن ترمز | فیلتر سوخت | فیلتر کابین | ضدیخ و آب رادیاتور | تمیز کننده جلو داشبورد | روغن هیدرولیک به سرتاسر ایران",
            card: "summary",
            site: "@roghanicar_com",
        },
    };
}

//! Template
const HomePage = () => {
    return (
        <>
            <main>
                <header className="container sticky top-0 z-[250] mx-auto mt-6 hidden w-full rounded-lg bg-gradient-to-l from-orange-900 to-orange-500 px-4 shadow-xl shadow-orange-900/50 sm:top-auto sm:z-auto sm:block sm:px-8 md:block">
                    <ul className="hidden w-full items-center justify-between md:flex">
                        <li>
                            <h2 className="block cursor-pointer py-2.5 text-base font-bold text-white underline-offset-2 lg:hover:underline">
                                <Link
                                    href={{
                                        pathname: "/product-list",
                                        query: { s: "روغن موتور" },
                                    }}
                                >
                                    روغن موتور
                                </Link>
                            </h2>
                        </li>
                        <li>
                            <h2 className="block cursor-pointer py-2.5 text-base font-bold text-white underline-offset-2 lg:hover:underline">
                                <Link
                                    href={{
                                        pathname: "/product-list",
                                        query: { s: "فیلتر هوا" },
                                    }}
                                >
                                    فیلتر هوای موتور
                                </Link>
                            </h2>
                        </li>
                        <li className="hidden lg:inline">
                            <h2 className="block cursor-pointer py-2.5 text-base font-bold text-white underline-offset-2 lg:hover:underline">
                                <Link
                                    href={{
                                        pathname: "/product-list",
                                        query: { s: "ضد یخ و آب رادیاتور" },
                                    }}
                                >
                                    ضد یخ و آب رادیاتور
                                </Link>
                            </h2>
                        </li>
                        <li>
                            <h2 className="block cursor-pointer py-2.5 text-base font-bold text-white underline-offset-2 lg:hover:underline">
                                <Link
                                    href={{
                                        pathname: "/product-list",
                                        query: { s: "روغن ترمز" },
                                    }}
                                >
                                    روغن ترمز
                                </Link>
                            </h2>
                        </li>
                        <li>
                            <h2 className="block cursor-pointer py-2.5 text-base font-bold text-white underline-offset-2 lg:hover:underline">
                                <Link
                                    href={{
                                        pathname: "/product-list",
                                        query: { s: "مکمل سوخت اکتان" },
                                    }}
                                >
                                    مکمل سوخت (اکتان)
                                </Link>
                            </h2>
                        </li>
                        <li>
                            <h2 className="block cursor-pointer py-2.5 text-base font-bold text-white underline-offset-2 lg:hover:underline">
                                <Link href="/support">پشتیبانی</Link>
                            </h2>
                        </li>
                    </ul>
                </header>
                <div className="container">
                    <EventsSection />
                    {/* 4 HorseMen */}
                    <section className="mx-auto grid max-w-[22.188rem] grid-cols-1 items-center justify-items-stretch gap-5 border-b-4 border-dotted border-orange-500 py-10 lg:max-w-none lg:grid-cols-[16.5rem_1fr_1fr]">
                        <FigToHorse />
                        <HorseMen />
                    </section>
                    {/* /4 HorseMen */}
                    {/* Category Section */}
                    <article className="grid w-full auto-rows-[7.5rem] grid-cols-1 items-stretch justify-items-stretch gap-6 border-b-4 border-dotted border-orange-500 py-10 md:grid-cols-2 lg:grid-cols-4 lg:pb-10">
                        <article className="mx-auto w-full max-w-xs rounded-xl border border-neutral-200 bg-white shadow-xl shadow-black/10 duration-200 lg:hover:shadow-none">
                            <Link
                                href={{
                                    pathname: "/product-list",
                                    query: { s: "فیلتر هوا" },
                                }}
                                className="grid h-full w-full max-w-[19rem] grid-cols-[auto_1fr] items-center justify-items-center md:max-w-none"
                            >
                                <figure className="relative aspect-square w-[120px] lg:w-[100px]">
                                    <Image
                                        src="/images/فیلتر-هوا.png"
                                        alt="خرید فیلتر هوا ماشین"
                                        fill
                                        sizes="(max-width: 768px) 10vw, 10vw"
                                        loading="lazy"
                                        className="object-contain p-2"
                                    />
                                </figure>
                                <h4 className="text-lg font-extrabold text-neutral-700">فیلتر هوا</h4>
                            </Link>
                        </article>
                        <article className="mx-auto w-full max-w-xs rounded-xl border border-neutral-200 bg-white shadow-xl shadow-black/10 duration-200 lg:hover:shadow-none">
                            <Link
                                href={{
                                    pathname: "/product-list",
                                    query: { s: "روغن ترمز" },
                                }}
                                className="grid h-full w-full max-w-[19rem] grid-cols-[auto_1fr] items-center justify-items-center md:max-w-none"
                            >
                                <figure className="relative aspect-square w-[120px] lg:w-[100px]">
                                    <Image
                                        src="/images/روغن-ترمز.png"
                                        alt="خرید روغن ترمز ماشین"
                                        fill
                                        sizes="(max-width: 768px) 10vw, 10vw"
                                        loading="lazy"
                                        className="object-contain p-2"
                                    />
                                </figure>
                                <h4 className="text-lg font-extrabold text-neutral-700">روغن ترمز</h4>
                            </Link>
                        </article>
                        <article className="mx-auto w-full max-w-xs rounded-xl border border-neutral-200 bg-white shadow-xl shadow-black/10 duration-200 lg:hover:shadow-none">
                            <Link
                                href={{
                                    pathname: "/product-list",
                                    query: { s: "فیلتر روغن" },
                                }}
                                className="grid h-full w-full max-w-[19rem] grid-cols-[auto_1fr] items-center justify-items-center md:max-w-none"
                            >
                                <figure className="relative aspect-square w-[120px] lg:w-[100px]">
                                    <Image
                                        src="/images/فیلتر-روغن.png"
                                        alt="خرید فیلتر روغن ماشین"
                                        fill
                                        sizes="(max-width: 768px) 10vw, 10vw"
                                        loading="lazy"
                                        className="object-contain p-2"
                                    />
                                </figure>
                                <h4 className="text-lg font-extrabold text-neutral-700">فیلتر روغن</h4>
                            </Link>
                        </article>
                        <article className="mx-auto w-full max-w-xs rounded-xl border border-neutral-200 bg-white shadow-xl shadow-black/10 duration-200 lg:hover:shadow-none">
                            <Link
                                href={{
                                    pathname: "/product-list",
                                    query: { s: "روغن موتور" },
                                }}
                                className="grid h-full w-full max-w-[19rem] grid-cols-[auto_1fr] items-center justify-items-center md:max-w-none"
                            >
                                <figure className="relative aspect-square w-[120px] lg:w-[100px]">
                                    <Image
                                        src="/images/روغن-موتور.png"
                                        alt="خرید روغن موتور ماشین"
                                        fill
                                        sizes="(max-width: 768px) 10vw, 10vw"
                                        loading="lazy"
                                        className="object-contain p-2"
                                    />
                                </figure>
                                <h4 className="text-lg font-extrabold text-neutral-700">روغن موتور</h4>
                            </Link>
                        </article>
                    </article>
                    {/* Category Section */}
                    {/* Brand Section */}
                    <section className="grid w-full grid-cols-2 items-stretch justify-items-stretch gap-10 px-6 py-10 sm:grid-cols-4 lg:grid-cols-6">
                        <Link href={{ pathname: "/product-list", query: { brand: "کاسپین" } }}>
                            <figure className="relative grid aspect-square cursor-pointer place-items-center rounded-xl border border-neutral-200 bg-white p-1 shadow-black/20 duration-300 lg:hover:scale-110 lg:hover:shadow-xl">
                                <Image
                                    src="/images/کاسپین.png"
                                    alt="کاسپین"
                                    fill
                                    sizes="(max-width: 768px) 10vw, 20vw"
                                    loading="lazy"
                                    className="object-contain p-2"
                                />
                            </figure>
                        </Link>
                        <Link href={{ pathname: "/product-list", query: { brand: "ارو" } }}>
                            <figure className="relative grid aspect-square cursor-pointer place-items-center rounded-xl border border-neutral-200 bg-white p-1 shadow-black/20 duration-300 lg:hover:scale-110 lg:hover:shadow-xl">
                                <Image
                                    src="/images/ارو.png"
                                    alt="آرو"
                                    fill
                                    sizes="(max-width: 768px) 10vw, 20vw"
                                    loading="lazy"
                                    className="object-contain p-5 opacity-75"
                                />
                            </figure>
                        </Link>
                        <Link href={{ pathname: "/product-list", query: { brand: "فلومکس" } }}>
                            <figure className="relative grid aspect-square cursor-pointer place-items-center rounded-xl border border-neutral-200 bg-white p-1 shadow-black/20 duration-300 lg:hover:scale-110 lg:hover:shadow-xl">
                                <Image
                                    src="/images/فلومکس.png"
                                    alt="فلومکس"
                                    fill
                                    sizes="(max-width: 768px) 10vw, 20vw"
                                    loading="lazy"
                                    className="object-contain p-2"
                                />
                            </figure>
                        </Link>
                        <Link href={{ pathname: "/product-list", query: { brand: "نفت پارس" } }}>
                            <figure className="relative grid aspect-square cursor-pointer place-items-center rounded-xl border border-neutral-200 bg-white p-1 shadow-black/20 duration-300 lg:hover:scale-110 lg:hover:shadow-xl">
                                <Image
                                    src="/images/نفت-پارس.png"
                                    alt="نفت پارس"
                                    fill
                                    sizes="(max-width: 768px) 10vw, 20vw"
                                    loading="lazy"
                                    className="object-contain p-3"
                                />
                            </figure>
                        </Link>
                        <Link href={{ pathname: "/product-list", query: { brand: "اسپیدی" } }}>
                            <figure className="relative grid aspect-square cursor-pointer place-items-center rounded-xl border border-neutral-200 bg-white p-1 shadow-black/20 duration-300 lg:hover:scale-110 lg:hover:shadow-xl">
                                <Image
                                    src="/images/اسپیدی.png"
                                    alt="اسپیدی"
                                    fill
                                    sizes="(max-width: 768px) 10vw, 20vw"
                                    loading="lazy"
                                    className="object-contain p-3"
                                />
                            </figure>
                        </Link>
                        <Link href={{ pathname: "/product-list", query: { brand: "مگلوب" } }}>
                            <figure className="relative grid aspect-square cursor-pointer place-items-center rounded-xl border border-neutral-200 bg-white p-1 shadow-black/20 duration-300 lg:hover:scale-110 lg:hover:shadow-xl">
                                <Image
                                    src="/images/مگلوب.png"
                                    alt="مگلوب"
                                    fill
                                    sizes="(max-width: 768px) 10vw, 20vw"
                                    loading="lazy"
                                    className="object-contain p-3 pt-2"
                                />
                            </figure>
                        </Link>
                    </section>
                    {/* Brand Section */}
                </div>
            </main>
        </>
    );
};
export default HomePage;
