"use client";
//! Components
import Link from "next/link";
import Image from "next/image";

//! Template
const ProductCard = ({ title, serialNumber, rcPrice, image, quantity, tags, hexColor, hexBg }) => {
    const renderPriceSection = ({ price, productQuantity }) => {
        if (!!productQuantity && productQuantity > 0) {
            return (
                <footer className="flex items-center justify-end gap-x-1 rounded-md bg-neutral-100 px-2 font-bold">
                    <span className="text-xs text-neutral-500">تومان</span>
                    <p className="text-sm font-extrabold text-neutral-600">{price.toLocaleString()}</p>
                </footer>
            );
        } else if (productQuantity <= 0) {
            return (
                <footer className="flex items-center justify-end rounded-md bg-neutral-100 px-2 font-bold">
                    <p className="text-sm font-bold text-neutral-400">ناموجود</p>
                </footer>
            );
        }
    };
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
                {renderPriceSection({
                    price: +rcPrice,
                    productQuantity: +quantity,
                })}
            </Link>
        </article>
    );
};

export default ProductCard;
