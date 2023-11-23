"use client";
//! Required
import React, { useState, useRef, useEffect } from "react";
import { listOfCategories, listOfBrands } from "@/constants/ListOfFilters";
import { getCategoryName } from "@/hooks/useCategory";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import convertPersianToEnglishNumber from "@/hooks/convertPersianToEnglishNum";

//! Components
import { ArrowDown2, CloseCircle, SearchNormal1 } from "iconsax-react";
import CarListItem from "@/components/CarListItem";
import dynamic from "next/dynamic";
const TheFilter = dynamic(() => import("./TheFilter"), { ssr: false });

const handleSpecialCharacter = (wordString) => {
    let wordsArray = wordString.split(" ");
    wordsArray = wordsArray.map((word) => (word.endsWith("ه") ? word.substring(0, word.length - 1) : word));
    return wordsArray.join(" ");
};

const convertToArrayOfWords = (string, type) => {
    const processedString = handleSpecialCharacter(string.replace(/\s\s+/g, " "));
    if (type === "remaining") {
        return processedString;
    }
    return processedString.split(" ");
};

const containsAllWords = (source, target) => {
    return target.every((word) => source.includes(word));
};

//! Template
const TheSearch = ({
    isDesktop,
    createQueryString,
    setCar,
    selectedCar,
    setCategory,
    selectedCategory,
    setBrand,
    selectedBrand,
    cars,
    setRemainingSearchTerms,
    remainingSearchTerms,
}) => {
    const inputRef = useRef();
    const searchCarRef = useRef();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.has("s")) {
            handleSearch(searchParams.get("s"));
        }
        if (searchParams.has("car")) {
            setCar(searchParams.get("car"));
        }
        // cuz i wan'it only on mount, not update to prevent errors
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [isFocused, setIsFocused] = useState(false);
    const [focusShadow, setFocusShadow] = useState(false);
    const [isShowFilter, setIsShowFilter] = useState(false);

    const [showCarList, setShowCarList] = useState(false);
    const showCarListHandler = () => {
        if (showCarList) {
            setShowCarList(false);
        } else {
            setShowCarList(true);
        }
    };
    const [searchCar, setSearchCar] = useState("");
    const carHandler = (e, car) => {
        let value;
        if (car) {
            value = car;
        } else if (!car) {
            value = e.target.value;
        }
        if (selectedCar === value) {
            setCar("");
            router.push(pathname + "?" + createQueryString({ type: "DEL", name: "car" }), { scroll: true });
        } else {
            setCar(value);
            router.push(pathname + "?" + createQueryString({ type: "ADD", name: "car", value: value }), {
                scroll: true,
            });
        }
    };

    const [searchTerms, setSearchTerms] = useState("");

    // filter handlers
    const handleSearch = (search) => {
        let searchWordsArray;
        if (typeof search === "string") {
            searchWordsArray = convertToArrayOfWords(search.trim());
        }

        // Searching in categories
        listOfCategories.forEach((item) => {
            const persianWordsArray = convertToArrayOfWords(item.persian);
            const persian2WordsArray = convertToArrayOfWords(item.persian2 || "");
            const persian3WordsArray = convertToArrayOfWords(item.persian3 || "");
            const persian4WordsArray = convertToArrayOfWords(item.persian4 || "");
            const persian5WordsArray = convertToArrayOfWords(item.persian5 || "");
            const persian6WordsArray = convertToArrayOfWords(item.persian6 || "");

            if (
                containsAllWords(searchWordsArray, persianWordsArray) ||
                containsAllWords(searchWordsArray, persian2WordsArray) ||
                containsAllWords(searchWordsArray, persian3WordsArray) ||
                containsAllWords(searchWordsArray, persian4WordsArray) ||
                containsAllWords(searchWordsArray, persian5WordsArray) ||
                containsAllWords(searchWordsArray, persian6WordsArray)
            ) {
                setCategory(item.value);
                return; // If found in categories, end this iteration.
            }
        });

        // Searching in brands
        listOfBrands.forEach((item) => {
            const persianWordsArray = convertToArrayOfWords(item.persian);
            const persian2WordsArray = convertToArrayOfWords(item.persian2 || "");
            const persian3WordsArray = convertToArrayOfWords(item.persian3 || "");
            const persian4WordsArray = convertToArrayOfWords(item.persian4 || "");

            if (
                containsAllWords(searchWordsArray, persianWordsArray) ||
                containsAllWords(searchWordsArray, persian2WordsArray) ||
                containsAllWords(searchWordsArray, persian3WordsArray) ||
                containsAllWords(searchWordsArray, persian4WordsArray)
            ) {
                setBrand(item.value);
                return; // If found in brands, end this iteration.
            }
        });

        // Iterate over the searchWordsArray
        let remainingTerms = [];
        for (let searchWord of searchWordsArray) {
            let foundInCategories = listOfCategories.some((item) => {
                const persianWordsArray = convertToArrayOfWords(item.persian);
                const persian2WordsArray = convertToArrayOfWords(item.persian2 || "");
                const persian3WordsArray = convertToArrayOfWords(item.persian3 || "");
                const persian4WordsArray = convertToArrayOfWords(item.persian4 || "");
                const persian5WordsArray = convertToArrayOfWords(item.persian5 || "");
                const persian6WordsArray = convertToArrayOfWords(item.persian6 || "");

                return (
                    persianWordsArray.includes(searchWord) ||
                    persian2WordsArray.includes(searchWord) ||
                    persian3WordsArray.includes(searchWord) ||
                    persian4WordsArray.includes(searchWord) ||
                    persian5WordsArray.includes(searchWord) ||
                    persian6WordsArray.includes(searchWord)
                );
            });

            let foundInBrands = listOfBrands.some((item) => {
                const persianWordsArray = convertToArrayOfWords(item.persian);
                const persian2WordsArray = convertToArrayOfWords(item.persian2 ? item.persian2 : "");
                const persian3WordsArray = convertToArrayOfWords(item.persian3 ? item.persian3 : "");
                const persian4WordsArray = convertToArrayOfWords(item.persian4 ? item.persian4 : "");

                return (
                    persianWordsArray.includes(searchWord) ||
                    persian2WordsArray.includes(searchWord) ||
                    persian3WordsArray.includes(searchWord) ||
                    persian4WordsArray.includes(searchWord)
                );
            });

            // If the search term is not found in either categories or brands, add it to remainingTerms
            if (!foundInCategories && !foundInBrands) {
                remainingTerms.push(searchWord);
            }
        }

        // Set the remainingSearchTerms state with the remaining terms
        setRemainingSearchTerms(remainingTerms);

        router.push(pathname + "?" + createQueryString({ type: "ADD", name: "s", value: searchWordsArray.join(" ") }), { scroll: true });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setBrand("");
        setCategory("");
        handleSearch(searchTerms);
        setFocusShadow(false);
        setIsFocused(false);
        setSearchTerms("");
        inputRef.current.blur();
    };

    useEffect(() => {
        if (isFocused || showCarList) {
            document.body.classList.add("overflow-y-hidden");
        } else if (!isFocused || !showCarList) {
            document.body.classList.remove("overflow-y-hidden");
        }
    }, [isFocused, showCarList]);

    return (
        <>
            <div className="sticky top-0 z-[202] order-1 mx-auto w-full max-w-xl lg:top-28">
                <section className="bg-white/70 shadow-xl shadow-orange-900/10 backdrop-blur-md backdrop-saturate-200 sm:rounded-lg lg:bg-white">
                    <form onSubmit={submitHandler} className="w-full p-3 pb-0 sm:rounded-b-lg">
                        <header
                            className={`grid grid-cols-[1fr_auto] items-center justify-items-center rounded-lg border border-neutral-300 pr-2 duration-200 ${
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
                                placeholder="جستجو در روغنیـــ‌کار..."
                                onFocus={() => {
                                    setIsFocused(true);
                                    setFocusShadow(true);
                                }}
                                onBlur={() => setFocusShadow(false)}
                                ref={inputRef}
                                value={searchTerms}
                                onChange={(e) => setSearchTerms(e.target.value)}
                                className="w-full bg-transparent py-4 text-sm font-bold tracking-tight text-neutral-600 outline-none placeholder:text-neutral-500 placeholder:duration-200 focus:placeholder:text-transparent"
                            />
                            <SearchNormal1 variant="Linear" className="ml-2 h-7 w-7 -scale-x-100 text-neutral-400" />
                        </header>
                        {(isDesktop || isFocused) && (
                            <>
                                <section className="relative mt-5 flex w-full flex-col items-end justify-center pb-3">
                                    <button
                                        type="submit"
                                        disabled={!searchTerms.trim()}
                                        className="w-fit rounded-xl bg-gradient-to-l from-orange-900 to-orange-500 px-3 py-3 text-sm font-bold text-white shadow-xl shadow-orange-900/50 duration-300 disabled:from-neutral-200 disabled:to-transparent disabled:text-neutral-400 disabled:shadow-none lg:shadow-none"
                                    >
                                        جستجو و نمایش محصولات
                                    </button>
                                </section>
                            </>
                        )}
                    </form>
                    <section className="px-3.5 py-1 lg:px-2">
                        <ul className="flex w-full flex-col gap-y-2.5">
                            {!!selectedCar ? (
                                <li
                                    onClick={showCarListHandler}
                                    className="flex w-full items-center justify-between py-1.5 text-sm font-extrabold"
                                >
                                    <p className="text-neutral-600">وسیله نقلیه انتخاب شده:</p>
                                    <p
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            carHandler("", selectedCar);
                                        }}
                                        className="flex items-center justify-center gap-x-1 rounded-md bg-rose-100 py-0.5 pl-1.5 pr-0.5 text-rose-500"
                                    >
                                        <CloseCircle variant="Bulk" className="h-5 w-5 text-rose-500" />
                                        {selectedCar}
                                    </p>
                                </li>
                            ) : (
                                <li
                                    onClick={showCarListHandler}
                                    className={`mt-2 flex w-full items-center justify-between py-1.5 pr-1.5 text-sm font-extrabold ${
                                        showCarList ? "" : "rounded-lg bg-rose-50"
                                    }`}
                                >
                                    <p className="flex items-center justify-start gap-x-0.5 text-neutral-600">
                                        <i
                                            className={`ri-roadster-fill text-2xl font-medium duration-200 ${
                                                showCarList ? "text-neutral-500" : "text-rose-400"
                                            }`}
                                        ></i>
                                        جستجو وسیله نقلیه
                                    </p>
                                    <p className="flex items-center justify-end text-xs font-bold text-rose-400">
                                        {showCarList ? "بستن" : "مشاهده"}
                                        <ArrowDown2
                                            variant="Bold"
                                            className={`h-5 w-5 duration-300 ${showCarList ? "-rotate-180 pt-1" : "rotate-0 pb-1"}`}
                                        />
                                    </p>
                                </li>
                            )}
                            {!showCarList && !!selectedCategory && (
                                <li className="flex w-full items-center justify-between text-sm font-extrabold">
                                    <p className="text-neutral-600">دسته‌بندی انتخاب شده:</p>
                                    <p
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCategory("");
                                        }}
                                        className="flex items-center justify-center gap-x-1 rounded-md bg-rose-100 py-0.5 pl-1.5 pr-0.5 text-rose-500"
                                    >
                                        <CloseCircle variant="Bulk" className="h-5 w-5 text-rose-500" />
                                        {getCategoryName(+selectedCategory)}
                                    </p>
                                </li>
                            )}
                            {!showCarList && !!selectedBrand && (
                                <li className="flex w-full items-center justify-between text-sm font-extrabold">
                                    <p className="text-neutral-600">برند یا تولید کننده انتخاب شده:</p>
                                    <p
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setBrand("");
                                        }}
                                        className="flex items-center justify-center gap-x-1 rounded-md bg-rose-100 py-0.5 pl-1.5 pr-0.5 text-rose-500"
                                    >
                                        <CloseCircle variant="Bulk" className="h-5 w-5 text-rose-500" />
                                        {selectedBrand}
                                    </p>
                                </li>
                            )}
                            {!showCarList && !!remainingSearchTerms.length && (
                                <li className="flex w-full items-center justify-between text-sm font-bold">
                                    <p className="text-neutral-600">جستجو شما:</p>
                                    <p
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setRemainingSearchTerms([]);
                                        }}
                                        className="flex items-center justify-center gap-x-1 rounded-md bg-rose-100 py-0.5 pl-1.5 pr-0.5 text-rose-500"
                                    >
                                        <CloseCircle variant="Bulk" className="h-5 w-5 text-rose-500" />
                                        {remainingSearchTerms.join(" ")}
                                    </p>
                                </li>
                            )}
                        </ul>
                        {showCarList && (
                            <section className="relative mt-2 flex h-[50vh] max-h-[60vh] w-full flex-col items-center justify-start lg:h-[50vh] lg:max-h-[50vh]">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        searchCarRef.current.blur();
                                    }}
                                    className="grid w-full grid-cols-[1fr_auto] items-center justify-items-center rounded-lg border border-orange-200 bg-orange-50 pr-2 duration-200"
                                >
                                    <input
                                        type="text"
                                        name="searchCar"
                                        id="searchCar"
                                        dir="rtl"
                                        aria-autocomplete="none"
                                        autoComplete="off"
                                        placeholder="جستجو مدل یا کمپانی وسیله ..."
                                        value={searchCar}
                                        ref={searchCarRef}
                                        onChange={(e) => setSearchCar(convertPersianToEnglishNumber(e.target.value))}
                                        className="w-full bg-transparent py-3 text-sm font-bold tracking-tight text-neutral-600 outline-none placeholder:text-orange-400 placeholder:duration-200 focus:placeholder:text-transparent"
                                    />
                                    <i className="ri-car-fill px-2 text-2xl font-medium text-orange-400"></i>
                                </form>
                                <p className="mr-2 mt-4 self-start text-xs font-bold text-neutral-500">
                                    جستجو از <span className="font-extrabold text-neutral-600">سایپا</span> تا{" "}
                                    <span className="font-serif text-[11px] font-extrabold text-neutral-600">LEXUS</span>
                                </p>
                                <ul className="mt-5 flex w-full flex-col items-stretch justify-start gap-y-2 overflow-y-auto">
                                    {cars
                                        .filter(
                                            (i) =>
                                                i.persian.includes(searchCar) || i.english.toUpperCase().includes(searchCar.toUpperCase()),
                                        )
                                        .map((car) => {
                                            return (
                                                <CarListItem
                                                    key={car?._id}
                                                    value={car?.persian}
                                                    persian={car?.persian}
                                                    checked={car?.persian === selectedCar}
                                                    onChange={carHandler}
                                                />
                                            );
                                        })}
                                </ul>
                                <button
                                    type="button"
                                    onClick={() => setShowCarList(false)}
                                    className="fixed bottom-0 w-full bg-neutral-100 py-2.5 text-center text-sm font-extrabold text-orange-500 lg:rounded-b-lg"
                                >
                                    نمایش محصولات
                                </button>
                            </section>
                        )}
                    </section>
                </section>
                <button
                    type="button"
                    onClick={() => setIsShowFilter(true)}
                    className="fixed bottom-28 left-3.5 z-[250] rounded-xl border border-blue-200 bg-blue-100/50 p-3.5 text-sm font-extrabold text-orange-900 backdrop-blur-md backdrop-saturate-150 md:left-28 lg:hidden"
                >
                    برندها / دسته‌بندی‌ها
                </button>
                {(isDesktop || isShowFilter) && (
                    <TheFilter
                        selectedCategory={selectedCategory}
                        selectedBrand={selectedBrand}
                        setBrand={setBrand}
                        setCategory={setCategory}
                        isDesktop={isDesktop}
                        createQueryString={createQueryString}
                        setIsShowFilter={setIsShowFilter}
                    />
                )}
            </div>
            {!!(showCarList || isFocused) && (
                <div
                    onClick={() => {
                        setIsFocused(false);
                        setShowCarList(false);
                    }}
                    className="fixed right-0 top-0 z-[201] h-full max-h-screen min-h-screen w-full bg-white/5 backdrop-blur-sm backdrop-saturate-150"
                ></div>
            )}
        </>
    );
};

export default TheSearch;
