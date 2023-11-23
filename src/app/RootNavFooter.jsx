"use client";
//! Required
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isUser } from "@/services/user.services";
import dynamic from "next/dynamic";
import { getCookie, deleteCookie, hasCookie } from "cookies-next";

//! Components
import Link from "next/link";
import Image from "next/image";
import { Bag2, Home2, SearchNormal1, User, UserSquare } from "iconsax-react";
import GetCategoryName from "@/hooks/GetCategoryName";
import { HambergerMenu } from "iconsax-react";
const TheSearch = dynamic(() => import("./../components/TheSearch"), { ssr: false });
const TheMenu = dynamic(() => import("./../components/TheMenu"), { ssr: false });

//! Template
const RootNavFooter = ({ children }) => {
    const getCategoryName = GetCategoryName();
    const token = getCookie("TOKEN");
    const [isCheckingUser, setIsCheckingUser] = useState(true);
    const [isAUser, setIsAUser] = useState(false);

    const inputRef = useRef();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [inputFocus, setInputFocus] = useState(false);
    const [searchTerms, setSearchTerms] = useState("");
    const [selectedBrand, setBrand] = useState("");
    const [selectedCategory, setCategory] = useState("");
    const { categoryName } = getCategoryName[selectedCategory] || {};

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

    const [isOpenMenuAnimate, setIsOpenMenuAnimate] = useState(false);
    const [isOpenMenuDisplay, setIsOpenMenuDisplay] = useState(false);
    const isOpenMenuHandler = () => {
        if (!!isOpenMenuAnimate) {
            router.push(pathname + "?" + createQueryString({ type: "DEL", name: "menu" }), { scroll: false });
        } else if (!isOpenMenuAnimate) {
            router.push(pathname + "?" + createQueryString({ type: "ADD", name: "menu", value: "show" }), {
                scroll: false,
            });
        }
    };

    const [isTheSearchAnimate, setIsTheSearchAnimate] = useState(false);
    const [isTheSearchDisplay, setIsTheSearchDisplay] = useState(false);
    const isTheSearchHandler = () => {
        if (!!isTheSearchAnimate) {
            router.push(pathname + "?" + createQueryString({ type: "DEL", name: "ss" }), { scroll: false });
        } else if (!isTheSearchAnimate) {
            router.push(pathname + "?" + createQueryString({ type: "ADD", name: "ss", value: "show" }), {
                scroll: false,
            });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        isTheSearchHandler();
        inputRef.current.blur();
        router.push(`/product-list?s=${searchTerms}`);
    };

    const checkingUser = async () => {
        try {
            setIsCheckingUser(true);
            const res = await isUser({ token });
            if (res?.status === 200) {
                setIsAUser(true);
            }
            setIsCheckingUser(false);
        } catch {
            deleteCookie("TOKEN");
            setIsAUser(false);
            setIsCheckingUser(false);
        }
    };

    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        if (hasCookie("TOKEN")) {
            checkingUser();
        } else if (!hasCookie("TOKEN")) {
            setIsCheckingUser(false);
            setIsAUser(false);
        }
        if (window.screen.width >= 1024) {
            setIsDesktop(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (searchParams.has("s")) {
            setSearchTerms(searchParams.get("s"));
        } else if (!searchParams.has("s")) {
            setSearchTerms("");
        }
        if (searchParams.has("ss")) {
            setIsTheSearchAnimate(true);
            setIsTheSearchDisplay(true);
        } else if (!searchParams.has("ss")) {
            setIsTheSearchAnimate(false);
            setTimeout(() => {
                setIsTheSearchDisplay(false);
            }, 400);
        }
        if (searchParams.has("menu")) {
            document.body.classList.add("overflow-hidden");
            setIsOpenMenuAnimate(true);
            setIsOpenMenuDisplay(true);
        } else if (!searchParams.has("menu")) {
            document.body.classList.remove("overflow-hidden");
            setIsOpenMenuAnimate(false);
            setTimeout(() => {
                setIsOpenMenuDisplay(false);
            }, 400);
        }
        if (searchParams.has("category")) {
            setCategory(searchParams.get("category"));
        } else if (!searchParams.has("category")) {
            setCategory("");
        }
        if (searchParams.has("brand")) {
            setBrand(searchParams.get("brand"));
        } else if (!searchParams.has("brand")) {
            setBrand("");
        }
        return () => setSearchTerms("");
    }, [searchParams]);

    if (!isDesktop) {
        return (
            <>
                {!!isOpenMenuDisplay && (
                    <div
                        onClick={isOpenMenuHandler}
                        className={`fixed right-0 top-0 z-[401] h-full w-full duration-[400ms] ${
                            !!isOpenMenuAnimate ? "bg-black/30 backdrop-blur-sm" : "bg-black/0 backdrop-blur-0"
                        }`}
                    >
                        <TheMenu
                            selectedCategory={selectedCategory}
                            setCategory={setCategory}
                            selectedBrand={selectedBrand}
                            setBrand={setBrand}
                            isOpenMenuHandler={isOpenMenuHandler}
                            animateIt={isOpenMenuAnimate}
                        />
                    </div>
                )}
                <nav
                    className="fixed bottom-0 right-1/2 z-[200] w-full max-w-xl translate-x-1/2 p-2 lg:hidden"
                    style={{
                        display:
                            (pathname === "/login" ||
                                pathname === "/login/register" ||
                                pathname === "/checkout/invoice" ||
                                pathname === "/payment/verify") &&
                            "none",
                    }}
                >
                    <ul className="grid w-full grid-cols-4 items-stretch justify-items-stretch rounded-2xl border border-neutral-300 bg-white/50 backdrop-blur-lg backdrop-saturate-150">
                        <li>
                            <Link
                                href="/"
                                className={`flex flex-col items-center justify-center pb-3 pt-4 text-sm font-extrabold ${
                                    pathname === "/" ? "text-orange-500" : "text-neutral-600"
                                }`}
                            >
                                <Home2
                                    variant={pathname === "/" ? "Bold" : "Broken"}
                                    className={`h-10 w-10 rounded-xl bg-gradient-to-tl p-1 text-neutral-600 ${
                                        pathname === "/"
                                            ? "from-orange-900 to-orange-500 text-white shadow-xl shadow-orange-900/50"
                                            : ""
                                    }`}
                                />
                                خانـــــه
                            </Link>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={isOpenMenuHandler}
                                className="flex h-full w-full flex-col items-center justify-center text-sm font-extrabold text-neutral-600"
                            >
                                <HambergerMenu
                                    variant="Broken"
                                    className="h-10 w-10 rounded-xl p-0.5 text-neutral-600"
                                />
                                فهرست
                            </button>
                        </li>
                        <li>
                            <Link
                                href="/cart"
                                className={`flex h-full flex-col items-center justify-center text-sm font-extrabold ${
                                    pathname === "/cart" ? "text-orange-500" : "text-neutral-600"
                                }`}
                            >
                                <Bag2
                                    variant={pathname === "/cart" ? "Bulk" : "Broken"}
                                    className={`h-10 w-10 rounded-xl bg-gradient-to-tl p-1 text-neutral-600 ${
                                        pathname === "/cart"
                                            ? "from-orange-900 to-orange-500 text-white shadow-xl shadow-orange-900/50"
                                            : ""
                                    }`}
                                />
                                سبدخرید
                            </Link>
                        </li>
                        <li className={`duration-500 ${isCheckingUser ? "blur-sm" : "blur-none"}`}>
                            {isAUser ? (
                                <Link
                                    href="/profile/order-list"
                                    className={`flex h-full flex-col items-center justify-center text-sm font-extrabold ${
                                        pathname.includes("/profile") ? "text-orange-500" : "text-neutral-600"
                                    }`}
                                >
                                    <UserSquare
                                        variant={pathname.includes("/profile") ? "Bulk" : "Broken"}
                                        className={`h-10 w-10 rounded-xl bg-gradient-to-tl p-1 text-neutral-600 ${
                                            pathname.includes("/profile")
                                                ? "from-orange-900 to-orange-500 text-white shadow-xl shadow-orange-900/50"
                                                : ""
                                        }`}
                                    />
                                    سفارشات
                                </Link>
                            ) : (
                                <Link
                                    href={{ pathname: "/login", query: { from: pathname } }}
                                    className={`flex h-full flex-col items-center justify-center text-sm font-extrabold ${
                                        pathname === "/login" ? "text-orange-500" : "text-neutral-600"
                                    }`}
                                >
                                    <User
                                        variant={pathname === "/login" ? "Bold" : "Linear"}
                                        className={`h-10 w-10 rounded-xl bg-gradient-to-tl p-1 text-neutral-600 ${
                                            pathname === "/login"
                                                ? "from-orange-900 to-orange-500 text-white shadow-xl shadow-orange-900/50"
                                                : ""
                                        }`}
                                    />
                                    ورود
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
                {/* Search Section */}
                <section
                    className="sticky top-0 z-[400] mx-auto w-full shadow-md shadow-black/20"
                    style={{
                        display:
                            (pathname === "/login" ||
                                pathname === "/login/register" ||
                                pathname === "/checkout/invoice" ||
                                pathname === "/payment/verify") &&
                            "none",
                    }}
                >
                    <header className="flex w-full flex-col items-stretch justify-center bg-white/75 px-3 py-1.5 backdrop-blur-md backdrop-saturate-200">
                        <button
                            type="button"
                            onClick={isTheSearchHandler}
                            className="mx-auto flex w-full max-w-md items-center justify-between rounded-lg bg-neutral-200/50 px-2.5 py-3 sm:max-w-xl"
                        >
                            <h4 className="flex grow items-center justify-start gap-x-1 text-base font-bold tracking-tight text-neutral-500">
                                {!searchTerms ? (
                                    <>
                                        {" "}
                                        جستجو در
                                        <span className="bg-gradient-to-l from-orange-900 to-orange-500 bg-clip-text text-lg font-black text-transparent">
                                            روغنیـــ‌کار
                                        </span>{" "}
                                    </>
                                ) : (
                                    searchTerms
                                )}
                            </h4>
                            <SearchNormal1 variant="Linear" className="h-7 w-7 -scale-x-100 text-neutral-500" />
                        </button>
                        {!!selectedCategory && (
                            <div className="mt-2 flex w-full items-center justify-between text-sm font-bold text-neutral-600">
                                <p>دسته‌بندی انتخاب شده:</p>
                                <button type="button" className="rounded-lg bg-rose-100 px-1.5 py-1 text-rose-600">
                                    {categoryName}
                                </button>
                            </div>
                        )}
                        {!!selectedBrand && (
                            <div className="mt-2 flex w-full items-center justify-between text-sm font-bold text-neutral-600">
                                <p>برند انتخاب شده:</p>
                                <button type="button" className="rounded-lg bg-rose-100 px-1.5 py-1 text-rose-600">
                                    {selectedBrand}
                                </button>
                            </div>
                        )}
                    </header>
                    {!!isTheSearchDisplay && (
                        <div
                            className={`fixed left-1/2 z-[400] h-full w-full max-w-lg -translate-x-1/2 overflow-y-auto bg-neutral-100 px-1 md:max-w-none lg:hidden ${
                                isTheSearchAnimate ? "fade-in" : "fade-out"
                            }`}
                        >
                            <TheSearch
                                isTheSearchHandler={isTheSearchHandler}
                                searchTerms={searchTerms}
                                setSearchTerms={setSearchTerms}
                                inputRef={inputRef}
                                isDesktop={isDesktop}
                            />
                        </div>
                    )}
                </section>
                {/* Search Section */}
                {children}
                <footer
                    style={{
                        display:
                            (pathname === "/login" ||
                                pathname === "/login/register" ||
                                pathname === "/checkout/invoice" ||
                                pathname === "/payment/verify") &&
                            "none",
                    }}
                    className="w-full bg-neutral-300 px-4 pb-32 lg:hidden"
                >
                    <div className="mx-auto flex max-w-md flex-col py-4">
                        {/* دسترسی سریعتر */}
                        <section>
                            <header className="flex w-full cursor-pointer items-center justify-start py-5">
                                <h4 className="text-base font-extrabold text-neutral-600">دسترسی سریعتر</h4>
                            </header>

                            <ul className="flex w-full flex-col items-start justify-center gap-y-4 pb-5">
                                <li className="flex w-full items-center justify-start">
                                    <Link
                                        href="/"
                                        className="text-base font-bold text-neutral-500 duration-200 hover:opacity-75"
                                    >
                                        صفحه اصلی
                                    </Link>
                                </li>
                                <li className="flex w-full items-center justify-start">
                                    <Link
                                        href="/product-list"
                                        className="text-base font-bold text-neutral-500 duration-200 hover:opacity-75"
                                    >
                                        لیست محصولات
                                    </Link>
                                </li>
                                <li className="flex w-full items-center justify-start">
                                    <Link
                                        href="/support"
                                        className="text-base font-bold text-neutral-500 duration-200 hover:opacity-75"
                                    >
                                        پشتیبانی و راه‌های ارتباطی
                                    </Link>
                                </li>
                                <li className="flex w-full items-center justify-start">
                                    <Link
                                        href="/terms-and-rules"
                                        className="text-base font-bold text-neutral-500 duration-200 hover:opacity-75"
                                    >
                                        قوانین سایت
                                    </Link>
                                </li>
                            </ul>
                        </section>
                        {/* دسترسی سریعتر */}

                        <div className="mx-auto w-4/5 border-t-2 border-dashed border-neutral-400"></div>

                        {/* اعتماد به روغنی کار */}
                        <section>
                            <header className="flex w-full cursor-pointer items-center justify-start py-5">
                                <h4 className="text-base font-extrabold text-neutral-600">اعتماد به روغنی کار</h4>
                            </header>
                            <p className="text-sm font-medium text-neutral-500">
                                روغنی کار به شما این اطمینان را میدهد که سبد خرید شما با بهترین کیفیت و سریع‌ترین روش
                                ارسال، تحویل شما می‌گردد.
                            </p>
                            <footer className="mx-auto my-4 grid w-full max-w-[12.5rem] grid-cols-2 gap-2 md:max-w-none md:grid-cols-4">
                                <a
                                    referrerPolicy="origin"
                                    target="_blank"
                                    href="https://trustseal.enamad.ir/?id=265418&amp;Code=NipgTAKNuA3UhTmlBKNP"
                                    className="grid w-full place-items-center overflow-hidden rounded-xl bg-white"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        referrerPolicy="origin"
                                        height="100px"
                                        width="100px"
                                        src="https://Trustseal.eNamad.ir/logo.aspx?id=265418&amp;Code=NipgTAKNuA3UhTmlBKNP"
                                        alt="نماد اعتماد الکترونیک روغنی کار"
                                        className="h-24 w-24 object-contain"
                                        id="NipgTAKNuA3UhTmlBKNP"
                                    />
                                </a>
                                <div className="grid aspect-square place-items-center overflow-hidden rounded-xl bg-white">
                                    {/* PF */}
                                    <div className="grid place-items-center overflow-hidden rounded-xl bg-rose-100">
                                        <a
                                            title="نماد اعتماد پی فا"
                                            target="_blank"
                                            href="https://payfa.com/verify/74aa282371b1ea19c45350459193d042c70108265b2d354fa2bdcdc3b1af97bf"
                                        >
                                            <img
                                                height="100px"
                                                width="100px"
                                                className="h-24 w-24 object-contain mix-blend-multiply"
                                                src="https://payfa.com/img/enemad.JPG"
                                                alt="تصویر نماد اعتماد پی فا"
                                            />
                                        </a>
                                    </div>
                                    {/* PF */}
                                </div>
                                <Link href="/" className="aspect-square w-full overflow-hidden rounded-xl">
                                    <figure className="flex h-full w-full items-center justify-center bg-white"></figure>
                                </Link>
                                <Link href="/" className="aspect-square w-full overflow-hidden rounded-xl">
                                    <figure className="flex h-full w-full items-center justify-center bg-white"></figure>
                                </Link>
                            </footer>
                        </section>
                        {/* اعتماد به روغنی کار */}

                        <div className="mx-auto w-4/5 border-t-2 border-dashed border-neutral-400"></div>

                        {/* درباره روغنی کار */}
                        <section>
                            <header className="flex w-full cursor-pointer items-center justify-start py-5">
                                <h4 className="text-base font-extrabold text-neutral-600">درباره روغنی کار</h4>
                            </header>
                            <p className="text-sm font-[600] leading-6 text-neutral-500">
                                از ویژگی‌های ما میتوان به فروش محصولات با قیمت مناسب، کیفیت نضمین شده محصول و ارسال کالا
                                به اقصی نقاط کشور اشاره کرد.
                            </p>
                        </section>
                        {/* درباره روغنی کار */}
                    </div>
                </footer>
            </>
        );
    }

    if (isDesktop) {
        return (
            <>
                {!!isTheSearchDisplay && (
                    <div
                        onClick={() => setIsTheSearchDisplay(false)}
                        className="fixed right-0 top-0 z-[198] h-full max-h-screen min-h-screen w-full bg-black/30 backdrop-blur-sm"
                    />
                )}
                {!!isOpenMenuDisplay && (
                    <div
                        onClick={isOpenMenuHandler}
                        className={`fixed right-0 top-0 z-[201] h-full max-h-screen min-h-screen w-full duration-[400ms] ${
                            !!isOpenMenuAnimate ? "bg-black/30 backdrop-blur-sm" : "bg-black/0 backdrop-blur-0"
                        }`}
                    >
                        <TheMenu
                            selectedCategory={selectedCategory}
                            setCategory={setCategory}
                            selectedBrand={selectedBrand}
                            setBrand={setBrand}
                            isOpenMenuHandler={isOpenMenuHandler}
                            animateIt={isOpenMenuAnimate}
                        />
                    </div>
                )}
                <nav
                    style={{
                        display:
                            (pathname === "/login" ||
                                pathname === "/login/register" ||
                                pathname === "/checkout/invoice" ||
                                pathname === "/payment/verify") &&
                            "none",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="sticky top-3 z-[200] mx-auto hidden w-full max-w-5/5xl items-center justify-start rounded-2xl bg-white/80 px-3 shadow-xl shadow-black/10 backdrop-blur-lg backdrop-saturate-150 lg:flex"
                >
                    {/* Logo Part */}
                    <div className="flex w-fit items-center justify-start gap-5 py-3 pl-5">
                        <button
                            type="button"
                            onClick={isOpenMenuHandler}
                            className="grid aspect-square h-12 shrink-0 place-items-center rounded-lg bg-orange-100 duration-300 hover:bg-transparent"
                        >
                            <HambergerMenu variant="Linear" className="h-10 w-10 text-orange-900" />
                        </button>
                        <figure
                            onClick={() => router.push("/")}
                            className="flex shrink-0 cursor-pointer justify-center"
                        >
                            <Image
                                src="/images/LogoCool.png"
                                alt="لوگو روغنی کار"
                                width={120}
                                height={40}
                                style={{ objectFit: "contain" }}
                            />
                        </figure>
                    </div>
                    {/* Logo Part */}
                    <div className="h-12 border-l border-neutral-400"></div>
                    {/* Search Part */}
                    <div className="relative z-[300] w-[28rem] shrink-0">
                        <form onSubmit={submitHandler} className="relative z-[302] mx-auto px-4 py-3">
                            <div
                                className={`grid grid-cols-[1fr_auto] items-center justify-items-center rounded-lg backdrop-blur-md backdrop-saturate-[4] duration-500 ${
                                    inputFocus ? "bg-white shadow-xl shadow-black/10" : "bg-neutral-100"
                                }`}
                            >
                                <input
                                    type="text"
                                    name="searchTerms"
                                    id="searchTerms"
                                    ref={inputRef}
                                    value={searchTerms}
                                    aria-autocomplete="none"
                                    autoComplete="off"
                                    placeholder="جستجو..."
                                    onFocus={(e) => {
                                        e.target.select();
                                        setIsTheSearchDisplay(true);
                                        setInputFocus(true);
                                    }}
                                    onBlur={() => setInputFocus(false)}
                                    onChange={({ target }) => setSearchTerms(target.value)}
                                    className="w-full bg-transparent py-3 pr-2 text-sm font-bold text-neutral-600 outline-none placeholder:text-neutral-500 placeholder:duration-200 focus:placeholder:text-transparent"
                                />
                                <SearchNormal1
                                    variant="Linear"
                                    className="ml-2 h-6 w-6 -scale-x-100 text-neutral-400"
                                />
                            </div>
                        </form>
                        {!!isTheSearchDisplay && (
                            <div className="fixed top-0.5 z-[301] max-h-[95vh] w-full max-w-md overflow-y-auto rounded-xl bg-neutral-100 px-1 pb-4 shadow-md shadow-black/30">
                                <TheSearch
                                    isTheSearchHandler={isTheSearchHandler}
                                    searchTerms={searchTerms}
                                    setSearchTerms={setSearchTerms}
                                    inputRef={inputRef}
                                    isDesktop={isDesktop}
                                />
                            </div>
                        )}
                    </div>
                    {/* Search Part */}
                    {/* Links Part */}
                    <div className="flex grow items-center justify-end gap-6">
                        <Link
                            href="/cart"
                            className={`flex h-full items-center justify-center font-bold ${
                                pathname.includes("cart") ? "text-orange-600" : "text-neutral-500"
                            }`}
                        >
                            <Bag2
                                variant={pathname.includes("cart") ? "Bold" : "Broken"}
                                className={`h-10 w-10 rounded-xl bg-gradient-to-tl p-1 text-neutral-500 ${
                                    pathname.includes("cart")
                                        ? "from-orange-900 to-orange-500 text-white shadow-lg shadow-orange-900/50"
                                        : ""
                                }`}
                            />
                            سبدخرید
                        </Link>
                        <span className={isCheckingUser ? "opacity-50 blur-sm" : "opacity-100 blur-none"}>
                            {!isAUser ? (
                                <Link
                                    href={{ pathname: "/login", query: { from: pathname } }}
                                    className="flex items-center justify-center gap-x-1 rounded-xl bg-gradient-to-r from-orange-900 to-orange-500 py-1 pl-2.5 pr-1 font-bold text-white"
                                >
                                    <UserSquare variant="Bold" className="h-8 w-8 text-white" />
                                    ورود
                                </Link>
                            ) : (
                                <Link
                                    href="/profile/order-list"
                                    className="flex items-center justify-center rounded-xl bg-orange-50 py-1.5 pl-2 pr-1 text-sm font-bold text-orange-900 duration-200 hover:bg-transparent"
                                >
                                    <User variant="Linear" className="h-7 w-7 -translate-y-[1px] text-orange-900" />
                                    سفارشات
                                </Link>
                            )}
                        </span>
                    </div>
                    {/* Links Part */}
                </nav>
                {children}
                <footer
                    style={{
                        display:
                            (pathname === "/login" ||
                                pathname === "/login/register" ||
                                pathname === "/checkout/invoice" ||
                                pathname === "/payment/verify") &&
                            "none",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="hidden w-full bg-neutral-300 lg:block"
                >
                    <div className="mx-auto hidden max-w-5xl grid-cols-3 grid-rows-[auto_1fr] items-start justify-items-start gap-x-20 lg:grid">
                        {/* دسترسی سریع */}
                        <header className="col-span-2 w-full">
                            <ul className="flex w-full items-center justify-between">
                                <li className="py-10">
                                    <Link
                                        href="/"
                                        className="text-base font-bold text-neutral-500 duration-200 hover:opacity-75"
                                    >
                                        صفحه اصلی
                                    </Link>
                                </li>
                                <li className="py-10">
                                    <Link
                                        href="/product-list"
                                        className="text-base font-bold text-neutral-500 duration-200 hover:opacity-75"
                                    >
                                        لیست محصولات
                                    </Link>
                                </li>
                                <li className="py-10">
                                    <Link
                                        href="/support"
                                        className="text-base font-bold text-neutral-500 duration-200 hover:opacity-75"
                                    >
                                        پشتیبانی و راه‌های ارتباطی
                                    </Link>
                                </li>
                                <li className="py-10">
                                    <Link
                                        href="/terms-and-rules"
                                        className="text-base font-bold text-neutral-500 duration-200 hover:opacity-75"
                                    >
                                        قوانین سایت
                                    </Link>
                                </li>
                            </ul>
                        </header>
                        {/* دسترسی سریع */}

                        {/* اعتماد به روغنی کار */}
                        <section className="row-span-2 flex w-full flex-col items-start justify-start pb-5 pt-10">
                            <header>
                                <h5 className="text-lg font-black tracking-tight text-neutral-600">
                                    اعتماد به روغنیــــ‌کار
                                </h5>
                            </header>
                            <p className="mt-4 text-sm font-medium text-neutral-500">
                                روغنی کار به شما این اطمینان را میدهد که سبد خرید شما با بهترین کیفیت و سریع‌ترین روش
                                ارسال، تحویل شما می‌گردد.
                            </p>
                            <footer className="mt-4 grid w-full max-w-[12.5rem] grid-cols-2 items-stretch justify-items-stretch gap-2">
                                {/* E-Namad */}
                                <a
                                    referrerPolicy="origin"
                                    target="_blank"
                                    href="https://trustseal.enamad.ir/?id=265418&amp;Code=NipgTAKNuA3UhTmlBKNP"
                                    className="grid w-full place-items-center overflow-hidden rounded-xl bg-white"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        referrerPolicy="origin"
                                        height="100px"
                                        width="100px"
                                        src="https://Trustseal.eNamad.ir/logo.aspx?id=265418&amp;Code=NipgTAKNuA3UhTmlBKNP"
                                        alt="نماد اعتماد الکترونیک روغنی کار"
                                        className="h-24 w-24 object-contain"
                                        id="NipgTAKNuA3UhTmlBKNP"
                                    />
                                </a>
                                <div className="grid aspect-square place-items-center overflow-hidden rounded-xl bg-white">
                                    {/* PF */}
                                    <div className="grid place-items-center overflow-hidden rounded-xl bg-rose-100">
                                        <a
                                            title="نماد اعتماد پی فا"
                                            target="_blank"
                                            href="https://payfa.com/verify/74aa282371b1ea19c45350459193d042c70108265b2d354fa2bdcdc3b1af97bf"
                                        >
                                            <img
                                                height="100px"
                                                width="100px"
                                                className="h-24 w-24 object-contain mix-blend-multiply"
                                                src="https://payfa.com/img/enemad.JPG"
                                                alt="تصویر نماد اعتماد پی فا"
                                            />
                                        </a>
                                    </div>
                                    {/* PF */}
                                </div>
                                <Link href="/" className="aspect-square w-full overflow-hidden rounded-xl">
                                    <figure className="flex h-full w-full items-center justify-center bg-white"></figure>
                                </Link>
                                <Link href="/" className="aspect-square w-full overflow-hidden rounded-xl">
                                    <figure className="flex h-full w-full items-center justify-center bg-white"></figure>
                                </Link>
                            </footer>
                        </section>
                        {/* اعتماد به روغنی کار */}

                        {/* درباره روغنی کار */}
                        <section className="flex w-full flex-col items-start justify-start">
                            <header>
                                <h5 className="text-lg font-black tracking-tight text-neutral-600">
                                    درباره روغنیــــ‌کار
                                </h5>
                            </header>
                            <p className="mt-3 text-sm font-[600] leading-6 text-neutral-500">
                                از ویژگی‌های ما میتوان به فروش محصولات با قیمت مناسب، کیفیت نضمین شده محصول و ارسال کالا
                                به اقصی نقاط کشور اشاره کرد.
                            </p>
                            <Link
                                href="/support?step=2"
                                className="mt-3 text-sm font-bold text-neutral-500 underline underline-offset-2"
                            >
                                پشتیبانی و راه‌های ارتباطی
                            </Link>
                        </section>
                        {/* درباره روغنی کار */}
                        <footer className="col-span-3 flex w-full items-center justify-between border-t-2 border-neutral-400 py-5">
                            <p className="text-sm font-bold text-neutral-500">
                                تمام حقوق اين وب‌سايت متعلق به شرکت یدک پیشگام اطلس (فروشگاه اینترنتی روغنی‌کار) است.
                            </p>
                            <p className="text-xl font-thin text-neutral-400/60">روغنیــــ‌کار</p>
                            <p className="text-sm font-bold text-neutral-500">
                                آدرس: بازار
                                <span className="text-base font-black">بزرگ</span> تهران
                            </p>
                        </footer>
                    </div>
                </footer>
            </>
        );
    }
};
export default RootNavFooter;
