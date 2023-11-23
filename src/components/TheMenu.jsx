"use client";
//! Required
import { useState, useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import useCategoriesAndBrands from "@/app/product-list/useCategoriesAndBrands";

//! Components
import Link from "next/link";
import { InfoCircle, ArrowRight, ArrowLeft2, ArrowDown2 } from "iconsax-react";
import TheRadio from "./TheRadio";

const TheMenu = ({ isOpenMenuHandler, animateIt, selectedCategory, setCategory, selectedBrand, setBrand }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const {
        data: CATEGORIES_BRANDS,
        isLoading: isFetchingCategoriesBrands,
        isSuccess: fetchedCategoriesBrands,
        refetch: refetchCategoriesBrands,
    } = useCategoriesAndBrands();

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

    const categoryHandler = (e, cat) => {
        let value;
        if (cat) value = cat;
        if (e) value = e.target.value;
        if (selectedCategory === value) {
            setCategory("");
            router.push("/product-list" + "?" + createQueryString({ type: "DEL", name: "category" }), { scroll: true });
        } else {
            setCategory(value);
            router.push("/product-list" + "?" + createQueryString({ type: "ADD", name: "category", value: value }), {
                scroll: true,
            });
        }
    };

    const brandHandler = (e, brn) => {
        let value;
        if (e) value = e.target.value;
        if (brn) value = brn;
        if (selectedBrand === value) {
            setBrand("");
            router.push("/product-list" + "?" + createQueryString({ type: "DEL", name: "brand" }), { scroll: true });
        } else {
            setBrand(value);
            router.push("/product-list" + "?" + createQueryString({ type: "ADD", name: "brand", value: value }), {
                scroll: true,
            });
        }
    };

    const [openFilter, setOpenFilter] = useState(0);
    const openFilterHandler = (fil) => {
        if (openFilter === fil) {
            setOpenFilter(0);
        } else {
            setOpenFilter(fil);
        }
    };
    return (
        <aside
            onClick={(e) => e.stopPropagation()}
            id="aside-menu"
            className={`fixed z-[401] h-[100dvh] w-full max-w-[15.625rem] bg-neutral-100 md:max-w-xs ${
                !!animateIt ? "slide-in" : "slide-out"
            } flex flex-col`}
        >
            <div className="relative flex-grow overflow-y-auto pb-10">
                <header
                    onClick={isOpenMenuHandler}
                    className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 px-2.5 py-6"
                >
                    <button type="button" onClick={isOpenMenuHandler}>
                        <ArrowRight variant="Linear" className="h-6 w-6 text-neutral-600" />
                    </button>
                </header>
                <ul className="w-full space-y-2 border-b border-neutral-300 px-2 py-6 text-sm font-bold">
                    <li>
                        <Link href="/" className={pathname === "/" ? "text-orange-900" : "text-neutral-500"}>
                            <ArrowLeft2 variant="Bold" className="-mx-1 inline h-5 w-6" />
                            صفحه اصلی
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/product-list"
                            className={pathname === "/product-list" ? "text-orange-900" : "text-neutral-500"}
                        >
                            <ArrowLeft2 variant="Bold" className="-mx-1 inline h-5 w-6" />
                            لیست محصولات
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/guarantee-of-product-authenticity"
                            className={
                                pathname === "/guarantee-of-product-authenticity"
                                    ? "text-orange-900"
                                    : "text-neutral-500"
                            }
                        >
                            <ArrowLeft2 variant="Bold" className="-mx-1 inline h-5 w-6" />
                            ضمانت اصالت و سلامت تمامی کالاها
                        </Link>
                    </li>
                </ul>
                <div className="w-full px-1">
                    <section className="mt-5 rounded-xl bg-white">
                        <header
                            onClick={() => openFilterHandler(1)}
                            className="flex w-full items-center justify-between px-2 py-6"
                        >
                            <h4 className="text-base font-extrabold tracking-tight text-neutral-600">دسته‌بندی‌ها</h4>
                            <ArrowDown2
                                variant="Bold"
                                className={`-ml-1 h-6 w-6 text-neutral-500 duration-1000 ${
                                    openFilter === 1 ? "-rotate-180" : ""
                                }`}
                            />
                        </header>
                        {openFilter === 1 && (
                            <ul className="flex w-full flex-col items-stretch justify-start gap-y-2 px-2">
                                {!!fetchedCategoriesBrands &&
                                    CATEGORIES_BRANDS.categories
                                        .sort((a, b) => a.value - b.value)
                                        .map((i) => {
                                            return (
                                                <TheRadio
                                                    key={i.value}
                                                    name={i.value}
                                                    value={i.value}
                                                    label={i.field1}
                                                    id={i.value}
                                                    onChange={categoryHandler}
                                                    checked={selectedCategory == i.value}
                                                />
                                            );
                                        })}
                            </ul>
                        )}
                    </section>
                    <section className="mt-5 rounded-xl bg-white">
                        <header
                            onClick={() => openFilterHandler(2)}
                            className="flex w-full items-center justify-between px-2 py-6"
                        >
                            <h4 className="text-base font-extrabold tracking-tight text-neutral-600">برندها</h4>
                            <ArrowDown2
                                variant="Bold"
                                className={`-ml-1 h-6 w-6 text-neutral-500 duration-1000 ${
                                    openFilter === 2 ? "-rotate-180" : ""
                                }`}
                            />
                        </header>
                        {openFilter === 2 && (
                            <ul className="flex w-full flex-col items-stretch justify-start gap-y-2 px-2">
                                {!!fetchedCategoriesBrands &&
                                    CATEGORIES_BRANDS.brands
                                        .filter((i) => !i.soon)
                                        .map((i) => {
                                            return (
                                                <TheRadio
                                                    key={i.value}
                                                    name={i.value}
                                                    value={i.value}
                                                    label={i.field1}
                                                    enLabel={i.field10}
                                                    id={i.value}
                                                    onChange={brandHandler}
                                                    checked={selectedBrand == i.value}
                                                />
                                            );
                                        })}
                                <li className="mt-2 flex w-full items-center justify-between pl-1 pr-7 text-xs font-bold text-neutral-400">
                                    به زودی...
                                    <span dir="ltr" className="font-serif text-xs font-bold">
                                        Coming Soon...
                                    </span>
                                </li>
                                {!!fetchedCategoriesBrands &&
                                    CATEGORIES_BRANDS.brands
                                        .filter((i) => !!i.soon)
                                        .map((i) => {
                                            return (
                                                <TheRadio
                                                    key={i.value}
                                                    name={i.value}
                                                    value={i.value}
                                                    label={i.field1}
                                                    enLabel={i.field10}
                                                    id={i.value}
                                                    disabled={true}
                                                    onChange={brandHandler}
                                                    checked={selectedBrand == i.value}
                                                />
                                            );
                                        })}
                            </ul>
                        )}
                    </section>
                </div>
            </div>
            <footer className="w-full max-w-[15.625rem] bg-blue-100 md:max-w-xs">
                <Link href="/support?step=2" className="flex h-full w-full items-center justify-between px-2 py-5">
                    <p className="flex w-fit items-center justify-start text-sm font-bold text-blue-600">
                        <InfoCircle variant="Bold" className="h-6 w-6 text-blue-400" />
                        سوالی دارید؟
                    </p>
                    <p className="flex w-fit flex-col items-center justify-center text-xs font-bold text-blue-500">
                        <span>پاسخــگوی شماییم</span>
                        <span className="text-blue-400">از 8 صبــح تا 8 شــب</span>
                    </p>
                </Link>
            </footer>
        </aside>
    );
};

export default TheMenu;
