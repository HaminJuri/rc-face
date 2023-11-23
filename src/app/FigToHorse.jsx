"use client";
import Image from "next/image";

const FigToHorse = () => {
    return (
        <figure
            onClick={() => {
                const element = document.getElementById("horse-men");
                const offset = 8 * parseFloat(getComputedStyle(document.documentElement).fontSize);
                const y = element.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }}
        >
            <Image
                src="/images/daily-special-offers-desktop.jpg"
                alt="پیشنهاد ویژه امروز"
                width="264"
                height="355"
                style={{ objectFit: "contain", borderRadius: "8px" }}
                className="hidden lg:block"
            />
            <Image
                src="/images/daily-special-offers-mobile.jpg"
                alt="پیشنهاد ویژه امروز"
                width="355"
                height="200"
                style={{ objectFit: "contain", borderRadius: "8px" }}
                className="block lg:hidden"
            />
        </figure>
    );
};
export default FigToHorse;
