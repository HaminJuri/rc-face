"use client";
//! Required
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

//! Components
import useProducts from "./useProducts";
import LoadingList from "./LoadingList";
import TheSort from "./TheSort";
import ProductCard from "@/components/ProductCard";
import GetTagColor from "@/hooks/GetTagColor";
import TheFilter from "./TheFilter";

//! Template
const ClientProductList = () => {
    const getTagColor = GetTagColor();
    const searchParams = useSearchParams();
    const [isDesktop, setIsDesktop] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [searchIt, setSearchIt] = useState("");
    const [selectedSort, setSelectedSort] = useState("1");
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCategory, setCategory] = useState("");
    const [selectedBrand, setBrand] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0 });
        if (window.screen.width >= 1024) {
            setIsDesktop(true);
        }
        setSearchIt(searchParams.has("s") ? searchParams.get("s") : "");
        setCategory(searchParams.has("category") ? searchParams.get("category") : "");
        setBrand(searchParams.has("brand") ? searchParams.get("brand") : "");
    }, [searchParams]);

    const { data, ref, isFetchingNextPage, isRefetching, isSuccess } = useProducts({
        sortBy: selectedSort,
        search: searchIt,
        categories: selectedCategory,
        brands: selectedBrand,
    }); // availableProducts, suggestionProducts, unavailableProducts

    return (
        <main className="container mx-auto grid min-h-screen w-full grid-cols-1 items-start justify-items-stretch gap-2 lg:grid-cols-[19rem_1fr] lg:pb-8 lg:pt-7">
            {(!!showFilter || !!isDesktop) && (
                <TheFilter
                    isDesktop={isDesktop}
                    setShowFilter={setShowFilter}
                    setBrand={setBrand}
                    setCategory={setCategory}
                    selectedBrand={selectedBrand}
                    selectedCategory={selectedCategory}
                />
            )}
            <article className="relative order-1 mx-auto mt-4 grid min-h-screen w-full max-w-xl auto-rows-[11.5rem] grid-cols-1 grid-rows-[3rem] items-start justify-items-stretch gap-x-2 gap-y-6 px-4 sm:px-0 lg:order-2 lg:max-w-none lg:grid-cols-2 lg:pb-0">
                <TheSort
                    showSort={showSort}
                    setShowSort={setShowSort}
                    setSort={setSelectedSort}
                    selectedSort={selectedSort}
                    isDesktop={JSON.parse(isDesktop)}
                />
                {isSuccess && !isRefetching ? (
                    data.pages.map((page) =>
                        page.map((product) => {
                            const { hexColor, hexBg } = getTagColor[product.category] || {};
                            return (
                                <ProductCard
                                    key={product._id}
                                    title={product.title}
                                    serialNumber={product.serialNumber}
                                    rcPrice={product.rcPrice}
                                    image={product.image}
                                    quantity={product.quantity}
                                    tags={product.tags}
                                    hexBg={hexBg}
                                    hexColor={hexColor}
                                />
                            );
                        }),
                    )
                ) : (
                    <LoadingList />
                )}
                {isFetchingNextPage ? <LoadingList /> : <></>}
            </article>
            <span className="order-7"></span>
            <div id="observer" ref={ref} className="order-8"></div>
            <button
                type="button"
                onClick={() => setShowFilter(true)}
                className="fixed bottom-28 left-5 z-[399] rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-bold text-orange-500 shadow-lg sm:left-20 md:left-36 lg:hidden"
            >
                دسته‌بندی‌ها / برندها
            </button>
        </main>
    );
};

export default ClientProductList;
