"use client";
//! Components
import HorsemenCard from "@/components/HorseMenCard";
import useHorseMen from "./useHorseMen";
import Image from "next/image";

//! Template
const HorseMen = () => {
    const { data: HORSEMEN, isSuccess: isFetchedHorsemen, isFetching: fetchingHorsemen } = useHorseMen();
    return (
        <>
            {!!fetchingHorsemen && (
                <div className=" mx-auto flex w-full max-w-[15rem] flex-col items-center justify-center gap-y-5 rounded-xl bg-white py-8 lg:col-span-2">
                    <figure className="flex w-full justify-center">
                        <Image
                            src="/images/LogoCool.png"
                            alt="لوگو روغنی کار"
                            width={180}
                            height={58}
                            styles={{ objectFit: "contain" }}
                        />
                    </figure>
                    <p className="text-center text-base font-bold text-neutral-500">در حال دریافت ...</p>
                </div>
            )}
            <section
                id="horse-men"
                className="mt-5 grid h-full grid-cols-1 items-start justify-items-stretch gap-y-10 lg:col-span-2 lg:mt-0 lg:grid-cols-2 lg:gap-4"
            >
                {!fetchingHorsemen &&
                    !!isFetchedHorsemen &&
                    HORSEMEN?.data.map((man) => {
                        return (
                            <HorsemenCard
                                key={man._id}
                                title={man.title}
                                category={man.category}
                                productPrice={man.productPrice}
                                userProfit={man.userProfit}
                                rcPrice={man.rcPrice}
                                expireDate={man.expireDate}
                                horseID={man._id}
                                image={man.image}
                                productID={man.productID}
                                serialNumber={man.serialNumber}
                                tags={man.tags}
                            />
                        );
                    })}
            </section>
        </>
    );
};

export default HorseMen;
