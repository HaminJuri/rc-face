"use client";
//! Required
import useCategoriesAndBrands from "./useCategoriesAndBrands";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import GetCategoryName from "@/hooks/GetCategoryName";

//! Components
import { ArrowSquareDown, Building, Category, CloseCircle } from "iconsax-react";
import TheRadio from "@/components/TheRadio";
import { useCallback } from "react";
import dynamic from "next/dynamic";
const DesktopEventsSlider = dynamic(() => import("./DesktopEventsSlider"));

//! Child Template
const Lists = ({ setBrand, setCategory, selectedBrand, selectedCategory, isDesktop }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const getCategoryName = GetCategoryName();
    const { categoryName } = getCategoryName[selectedCategory] || {};

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
            router.push(pathname + "?" + createQueryString({ type: "DEL", name: "category" }), { scroll: true });
        } else {
            setCategory(value);
            router.push(pathname + "?" + createQueryString({ type: "ADD", name: "category", value: value }), {
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
            router.push(pathname + "?" + createQueryString({ type: "DEL", name: "brand" }), { scroll: true });
        } else {
            setBrand(value);
            router.push(pathname + "?" + createQueryString({ type: "ADD", name: "brand", value: value }), {
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
        <div className="mt-5">
            {!!isDesktop && <DesktopEventsSlider />}
            <section className="mb-8 overflow-y-auto rounded-xl bg-white lg:max-h-96 lg:shadow-xl">
                <header
                    onClick={() => openFilterHandler(1)}
                    className="flex w-full items-center justify-between px-2 py-3"
                >
                    <h4 className="flex items-center justify-start text-base font-extrabold tracking-tight text-neutral-600">
                        <Category variant="Bulk" className="ml-1 h-6 w-6 text-neutral-400" />
                        دسته‌بندی‌ها
                    </h4>
                    <ArrowSquareDown
                        variant="Linear"
                        className={`h-6 w-6 text-neutral-500 duration-300 ${openFilter === 1 ? "-scale-y-100" : ""}`}
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
                                            enLabel={i.field12}
                                            id={i.value}
                                            onChange={categoryHandler}
                                            checked={selectedCategory == i.value}
                                        />
                                    );
                                })}
                    </ul>
                )}
            </section>
            <section className="mb-8 overflow-y-auto rounded-xl bg-white lg:max-h-72 lg:shadow-xl">
                <header
                    onClick={() => openFilterHandler(2)}
                    className="flex w-full items-center justify-between px-2 py-3"
                >
                    <h4 className="flex items-center justify-start text-base font-extrabold tracking-tight text-neutral-600">
                        <Building variant="Bulk" className="ml-1 h-6 w-6 text-neutral-400" />
                        برندها
                    </h4>
                    <ArrowSquareDown
                        variant="Linear"
                        className={`h-6 w-6 text-neutral-500 duration-300 ${openFilter === 2 ? "-scale-y-100" : ""}`}
                    />
                </header>
                {openFilter === 2 && (
                    <ul className="flex w-full flex-col items-stretch justify-start gap-y-2 px-2">
                        {!!fetchedCategoriesBrands &&
                            CATEGORIES_BRANDS.brands.map((i) => {
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
                    </ul>
                )}
            </section>
            {(!!selectedBrand || !!selectedCategory) && (
                <section className="mb-8 overflow-y-auto rounded-xl bg-white py-2 lg:max-h-72 lg:shadow-xl">
                    <ul className="flex w-full flex-col items-stretch justify-start gap-y-2 px-2">
                        {!!selectedCategory && (
                            <li className="flex w-full items-center justify-between text-sm font-bold text-neutral-600">
                                <p className="grow">دسته‌بندی انتخاب شده:</p>
                                <button
                                    type="button"
                                    onClick={() => categoryHandler("", selectedCategory)}
                                    className="flex w-fit items-center justify-center rounded-lg bg-rose-100 p-1 pl-1.5 text-rose-600"
                                >
                                    <CloseCircle variant="Bulk" className="ml-1 h-6 w-6 text-rose-500" />
                                    {categoryName}
                                </button>
                            </li>
                        )}
                        {!!selectedBrand && (
                            <li className="flex w-full items-center justify-between text-sm font-bold text-neutral-600">
                                <p>برند انتخاب شده:</p>
                                <button
                                    type="button"
                                    onClick={() => brandHandler("", selectedBrand)}
                                    className="flex w-fit items-center justify-center rounded-lg bg-rose-100 p-1 pl-1.5 text-rose-600"
                                >
                                    <CloseCircle variant="Bulk" className="ml-1 h-6 w-6 text-rose-500" />
                                    {selectedBrand}
                                </button>
                            </li>
                        )}
                    </ul>
                </section>
            )}
        </div>
    );
};

//! Template
const TheFilter = ({ setShowFilter, isDesktop, setBrand, setCategory, selectedCategory, selectedBrand }) => {
    if (!isDesktop) {
        return (
            <div
                onClick={() => setShowFilter(false)}
                className="fixed right-0 top-0 z-[400] max-h-screen min-h-screen w-full bg-white/10 backdrop-blur-md backdrop-saturate-150"
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="max-h-[70vh] min-h-[30vh] overflow-y-auto bg-neutral-100 px-2 shadow-2xl shadow-orange-900/20"
                >
                    <Lists
                        setBrand={setBrand}
                        setCategory={setCategory}
                        selectedBrand={selectedBrand}
                        selectedCategory={selectedCategory}
                        isDesktop={isDesktop}
                    />
                </div>
            </div>
        );
    }
    if (isDesktop) {
        return (
            <>
                <Lists
                    setBrand={setBrand}
                    setCategory={setCategory}
                    selectedBrand={selectedBrand}
                    selectedCategory={selectedCategory}
                    isDesktop={isDesktop}
                />
            </>
        );
    }
};

export default TheFilter;
