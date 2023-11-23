"use client";
import { CloseCircle } from "iconsax-react";

//! Template
const ShopDescription = ({ description, show, setShow }) => {
    return (
        <section
            onClick={() => setShow(false)}
            className={`fixed right-0 top-0 z-[400] grid h-full w-full place-items-center overflow-y-auto bg-black/25 p-3 backdrop-blur-md lg:items-center ${
                show ? "show-verify-pop" : "not-show-verify-pop"
            }`}
        >
            <div className="w-full rounded-2xl bg-white px-3 py-4 lg:max-w-lg">
                <p className="text-justify text-sm font-bold leading-7 tracking-tight text-neutral-600">{description}</p>
                <button
                    type="button"
                    className="mt-4 flex w-full items-center justify-center gap-x-0.5 rounded-lg border border-orange-500 py-3 text-sm font-bold text-orange-900"
                >
                    <CloseCircle variant="Linear" className="h-5 w-5 text-orange-500" />
                    بستن
                </button>
            </div>
        </section>
    );
};

export default ShopDescription;
