//! Required
import Image from "next/image";
import { getProduct } from "@/services/product.services";
import { default as impDynamic } from "next/dynamic";

const CartButton = impDynamic(() => import("./CartButton"), { ssr: false });
const TheUseFor = impDynamic(() => import("./TheUseFor"), { ssr: false });

import { Calendar2, CardPos, Drop, MedalStar, ReceiptDisscount, Tag2, TruckFast, Verify } from "iconsax-react";
import CategoryName from "./CategoryName";
import ProductVerifyPop from "./ProductVerifyPop";

//! SSR
export const dynamic = "force-dynamic";
const today = new Date().toLocaleDateString("fa-IR", {
    month: "long",
    day: "numeric",
});
export async function generateMetadata({ params }) {
    const response = await getProduct(params.serialNumber);
    return {
        title: `خرید و قیمت ${today} ${response?.data?.product?.title} در روغنی کار`,
        description: `خرید ${response?.data?.product?.title} و لیست محصولات مصرفی خودرو به قیمت روز از فروشگاه اینترنتی روغنی کار`,
        openGraph: {
            locale: "fa_IR",
            image: response?.data?.product?.image || "",
            imageAlt: response?.data?.product?.title,
            availability: "in stock",
            siteName: "@roghanicar_com",
            url: `https://roghanicar.com/product-list/${response?.data?.product?.serialNumber}`,
        },
        twitter: {
            title: `خرید و قیمت ${today} ${response?.data?.product?.title} در روغنی کار`,
            description: `خرید ${response?.data?.product?.title} و لیست محصولات مصرفی خودرو به قیمت روز از فروشگاه اینترنتی روغنی کار`,
            card: "summary_large_image",
            site: "@roghanicar_com",
            image: response?.data?.product?.image || "",
            imageAlt: response?.data?.product?.title,
        },
    };
}

//! Template
const ProductPage = async ({ params }) => {
    const response = await getProduct(params.serialNumber);
    return (
        <main className="lg:max-w-5/5xl container grid w-full max-w-md grid-cols-1 items-start justify-items-stretch gap-5 px-4 py-4 sm:px-0 lg:grid-cols-3 lg:pb-10 lg:pt-20">
            {/* Product Table */}
            <div className="order-2 flex w-full flex-col">
                <header className="w-full">
                    <h1 className="px-2 pb-4 text-base font-bold tracking-tight text-neutral-600">{response?.data?.product.title}</h1>
                </header>
                <ul id="product-info-table" className="w-full">
                    <CategoryName category={response?.data?.product.category} />
                    <li className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-bold text-neutral-600">
                        <p className="font-medium">برند:</p>
                        <p>{response?.data?.product.brand}</p>
                    </li>
                    <li className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-bold text-neutral-600">
                        <p className="font-medium">ساخت:</p>
                        <p>{response?.data?.product.madeIn}</p>
                    </li>
                    <li className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-bold text-neutral-600">
                        <p className="font-medium">مشخصات:</p>
                        <p>{response?.data?.product.specifications}</p>
                    </li>
                    <li className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-bold text-neutral-600">
                        <p className="font-medium">شماره سریال:</p>
                        <p>{response?.data?.product.serialNumber}</p>
                    </li>
                    {response?.data?.product.volume && (
                        <li className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-bold text-neutral-600">
                            <p className="font-medium">حجم:</p>
                            <p>{response?.data?.product.volume}</p>
                        </li>
                    )}
                    {response?.data?.product.packagingType && (
                        <li className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-bold text-neutral-600">
                            <p className="font-medium">نوع بسته‌بندی:</p>
                            <p>{response?.data?.product?.packagingType}</p>
                        </li>
                    )}
                </ul>
                <ProductVerifyPop title={response?.data?.product.title} />
            </div>
            {/* Product Table */}
            {!!response?.data.product.cars.length && (
                <TheUseFor carList={response?.data?.product?.cars} showSentence={response?.data?.product.category == 1001} />
            )}
            {/* Description */}
            {!!response?.data?.product.description && (
                <section className="order-4 lg:order-5 lg:col-span-3">
                    <h2 className="pr-2.5 text-base font-bold tracking-tight text-neutral-600">توضیحات:</h2>
                    <p className="whitespace-pre-wrap rounded-xl border border-neutral-200 bg-white px-2.5 py-2 text-sm font-bold leading-7 text-neutral-500">
                        {response?.data?.product.description}
                    </p>
                </section>
            )}
            {/* Description */}
            {/* Image */}
            <figure className="relative order-1 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-neutral-300 bg-white">
                <Image
                    src={response?.data?.product?.image ? response?.data?.product?.image : "/images/no-image.png"}
                    alt={response?.data?.product?.title}
                    priority
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "contain" }}
                    className={`aspect-square w-full object-contain ${response?.data?.product?.image ? "p-3" : "p-10 opacity-40"}`}
                />
            </figure>
            {/* Image */}
            {/* Cart */}
            <footer className="order-5 w-full rounded-xl border border-neutral-300 bg-gradient-to-tr from-neutral-200 to-neutral-100 p-2 pb-5 lg:order-3">
                <ul className="flex w-full flex-col items-stretch justify-start gap-y-5">
                    {!!response?.data?.product?.isFreeShipping && (
                        <li className="flex w-full items-center justify-between text-sm font-bold">
                            <p className="flex items-center justify-center gap-x-0.5 text-neutral-500">
                                <TruckFast variant="Bulk" className="h-6 w-6" />
                                ارسال رایگان:
                            </p>
                            <p className="font-extrabold tracking-tight text-neutral-600">دارد</p>
                        </li>
                    )}
                    <li className="flex w-full items-center justify-between text-sm font-bold">
                        <p className="flex items-center justify-center gap-x-0.5 text-neutral-500">
                            <Drop variant="Bulk" className="h-6 w-6" />
                            فروشنده کالا:
                        </p>
                        <p className="font-extrabold tracking-tight text-neutral-600">روغنیــ‌کار</p>
                    </li>
                    <li className="flex w-full items-center justify-between text-sm font-bold">
                        <p className="flex items-center justify-center gap-x-0.5 text-neutral-500">
                            <Tag2 variant="Bulk" className="h-6 w-6" />
                            تامین کننده کالا:
                        </p>
                        <p className="font-extrabold tracking-tight text-neutral-600">{response?.data.product.supplier}</p>
                    </li>
                    <li className="flex w-full items-center justify-between text-sm font-bold">
                        <p className="flex items-center justify-center gap-x-0.5 text-neutral-500">
                            <Verify variant="Bulk" className="h-6 w-6" />
                            تضمین‌کننده کیفیت کالا:
                        </p>
                        <p className="font-extrabold tracking-tight text-neutral-600">{response?.data.product.qualityGuarantor}</p>
                    </li>
                    <li className="flex w-full items-center justify-between text-sm font-bold">
                        <p className="flex items-center justify-center gap-x-0.5 text-neutral-500">
                            <MedalStar variant="Bulk" className="h-6 w-6" />
                            تضمین‌کننده اصالت کالا:
                        </p>
                        <p className="font-extrabold tracking-tight text-neutral-600">{response?.data.product.authenticityGuarantor}</p>
                    </li>
                    {!!response?.data?.product.quantity > 0 ? (
                        <>
                            {response?.data?.product.productPrice >= response?.data?.product.rcPrice && (
                                <li className="flex w-full items-center justify-between text-sm font-bold">
                                    <p className="flex items-center justify-center gap-x-0.5 text-neutral-500">
                                        <Calendar2 variant="Bulk" className="h-6 w-6" />
                                        قیمت روی کالا: (<span className="text-xs">{new Date().toLocaleDateString("fa-IR")}</span>)
                                    </p>
                                    <p dir="ltr" className="w-fit text-base font-bold tracking-tight text-neutral-500">
                                        {response?.data?.product.productPrice.toLocaleString()}{" "}
                                        <span className="text-[10px] text-neutral-400">تومان</span>
                                    </p>
                                </li>
                            )}
                            {response?.data?.product.productPrice > response?.data?.product.rcPrice && (
                                <li className="flex w-full items-center justify-between text-sm font-bold">
                                    <p className="flex items-center justify-center gap-x-0.5 text-neutral-500">
                                        <ReceiptDisscount variant="Bulk" className="h-6 w-6" />
                                        سود شما: (<span className="text-xs tracking-tighter">در هر عدد</span>)
                                    </p>
                                    <p dir="ltr" className="w-fit text-base font-extrabold text-rose-500">
                                        {response?.data?.product.userProfit.toLocaleString()}
                                        <span className="ml-1 text-xs text-rose-400">تومان</span>
                                    </p>
                                </li>
                            )}

                            <li className="flex w-full items-center justify-between text-sm font-bold">
                                <p className="flex items-center justify-center gap-x-0.5 text-neutral-500">
                                    <CardPos variant="Bulk" className="h-6 w-6" />
                                    قیمت فروش روغنیــ‌کار:
                                </p>
                                <p dir="ltr" className="w-fit text-lg font-extrabold text-rose-500">
                                    {response?.data?.product.rcPrice.toLocaleString()}
                                    <span className="ml-1 text-xs text-rose-400">تومان</span>
                                </p>
                            </li>
                        </>
                    ) : (
                        <li className="flex w-full items-center justify-between text-sm font-bold">
                            <p className="flex items-center justify-center gap-x-0.5 text-neutral-500">
                                <MedalStar variant="Bulk" className="h-6 w-6" />
                                وضعیت کالا:
                            </p>
                            <p className="font-extrabold tracking-tight text-neutral-600">ناموجود</p>
                        </li>
                    )}
                </ul>
                <CartButton shopState={response?.data?.shopState} product={response?.data?.product} serialNumber={params.serialNumber} />
            </footer>
            {/* Cart */}
        </main>
    );
};

export default ProductPage;
