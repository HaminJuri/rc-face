"use client";
//! Required
import GetTagColor from "@/hooks/GetTagColor";

//! Components
import Link from "next/link";
import Image from "next/image";
import Countdown, { zeroPad } from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return "تمام شد!";
    } else {
        return `${days ? days + ":" : ""}${hours ? zeroPad(hours) + ":" : ""}${zeroPad(minutes)}:${zeroPad(seconds)}`;
    }
};

//! Template
const HorsemenCard = ({
    title,
    serialNumber,
    productPrice,
    userProfit,
    rcPrice,
    category,
    image,
    tags,
    expireDate,
}) => {
    const getTagColor = GetTagColor();
    const { hexColor, hexBg } = getTagColor[+category] || {};
    return (
        <article className="h-full rounded-lg bg-white p-2 shadow-black duration-200 lg:hover:z-[199] lg:hover:scale-110 lg:hover:shadow-2xl">
            <Link
                href={`/product-list/${serialNumber}`}
                target="_blank"
                className="grid h-full w-full grid-cols-1 grid-rows-[1fr_2.5rem] items-stretch justify-items-stretch gap-y-2"
            >
                <div className="grid h-full w-full grid-cols-[auto_1fr] items-start justify-items-start gap-2">
                    <header className="order-2 flex h-full w-full flex-col items-start justify-between">
                        <h2 className="ellipsis text-start text-sm font-bold text-neutral-600">{title}</h2>
                        {!!tags && (
                            <ul className="flex w-full flex-wrap items-center justify-end gap-1">
                                {tags.map((tag) => {
                                    return (
                                        <li
                                            key={tag}
                                            className="rounded-md px-1 py-0.5 text-xs font-bold"
                                            style={{
                                                background: hexBg,
                                                color: hexColor,
                                            }}
                                        >
                                            {tag}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </header>
                    <figure className="order-1 -translate-y-5 rounded-lg border border-neutral-100 bg-white shadow-xl shadow-black/10">
                        <Image
                            src={image ? image : "/images/no-image.png"}
                            alt={title}
                            sizes="100vw"
                            width={100}
                            height={100}
                            style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "contain",
                            }}
                            className={image ? "p-1" : "p-5 opacity-50"}
                        />
                    </figure>
                </div>
                <footer className="grid grid-cols-[1fr_1.2fr_0.8fr_1fr] items-center justify-items-center gap-x-0.5 rounded-md bg-red-100 px-1 font-bold md:px-2">
                    <p className="text-xs font-extrabold text-rose-500">
                        <Countdown date={expireDate} renderer={renderer} />
                    </p>
                    <p className="flex items-center justify-center gap-x-0.5 rounded-lg bg-gradient-to-l from-red-600 to-red-500 px-2 py-1 text-xs font-bold text-white md:text-sm">
                        {userProfit.toLocaleString()}
                        <span className="text-[10px]">سود</span>
                    </p>
                    <p className="text-xs text-rose-400 line-through md:text-sm">{productPrice.toLocaleString()}</p>
                    <div className="flex items-end justify-start justify-self-end">
                        <span className="ml-0.5 text-[10px] text-rose-600 md:text-[11px]">تومان</span>
                        <p className="text-sm font-extrabold text-rose-600">{rcPrice.toLocaleString()}</p>
                    </div>
                </footer>
            </Link>
        </article>
    );
};

export default HorsemenCard;
