import { Calendar2, Drop, MedalStar, ShoppingCart, Tag2, Verify } from "iconsax-react";

export const metadata = {
    title: "تامین کیفیت | ضمانت اصالت | تمامی کالاها | مرجع فروش انواع روغن، فیلتر و دیگر موارد مصرفی وسایل نقلیه",
    description:
        "ما به مشتریان خود تضمین می‌دهیم که هرگز از ما کالای تقلبی یا با کیفیت پایین نخواهند گرفت، و از اینکه از محصولاتی با قیمت روی بسته بندی خود لذت می‌برند و می‌توانند اصالت آنها را با اطمینان بررسی کنند، اطمینان داریم.",
    openGraph: {
        title: "تامین کیفیت | ضمانت اصالت | تمامی کالاها | مرجع فروش انواع روغن، فیلتر و دیگر موارد مصرفی وسایل نقلیه",
        description:
            "ما به مشتریان خود تضمین می‌دهیم که هرگز از ما کالای تقلبی یا با کیفیت پایین نخواهند گرفت، و از اینکه از محصولاتی با قیمت روی بسته بندی خود لذت می‌برند و می‌توانند اصالت آنها را با اطمینان بررسی کنند، اطمینان داریم.",
        locale: "fa_IR",
        siteName: "@roghanicar_com",
        url: "https://roghanicar.com/guarantee-of-product-authenticity",
    },
    twitter: {
        title: "تامین کیفیت | ضمانت اصالت | تمامی کالاها | مرجع فروش انواع روغن، فیلتر و دیگر موارد مصرفی وسایل نقلیه",
        description:
            "ما به مشتریان خود تضمین می‌دهیم که هرگز از ما کالای تقلبی یا با کیفیت پایین نخواهند گرفت، و از اینکه از محصولاتی با قیمت روی بسته بندی خود لذت می‌برند و می‌توانند اصالت آنها را با اطمینان بررسی کنند، اطمینان داریم.",
        card: "summary",
        site: "@roghanicar_com",
    },
};

const GuaranteeOfProductAuthenticity = () => {
    return (
        <main className="container mt-6 grid w-full grid-cols-1 items-start gap-x-14 gap-y-8 justify-self-stretch px-3 lg:mt-12 lg:grid-cols-[2fr_1fr]">
            <section>
                <header className="mb-2 flex w-full flex-col items-start justify-center gap-y-1 border-b-2 border-dashed border-orange-500 pb-2 tracking-tight">
                    <h1 className="w-fit bg-gradient-to-l from-orange-900 to-orange-400 bg-clip-text text-lg font-black text-transparent">
                        ضمانت و اصالت تمامی کالاها:
                    </h1>
                </header>
                <p className="text-justify text-sm font-bold leading-7 tracking-tight text-neutral-600">
                    تضمین ضمانت و اصالت کالا برای مشتریان ما از اهمیت بالایی برخوردار است. ما اصالت کالای مورد فروش را به عنوان اولین اولویت
                    خود قرار می‌دهیم و به صورت دقیق و کامل برای اطمینان از <span className="text-orange-900">کیفیت 100% کالا</span> تلاش
                    می‌کنیم. هر محصولی که از طرف ما به شما ارائه می‌شود، با قیمت روی بسته بندی خود تطابق دارد تا شما به آسانی بتوانید کالای
                    اصلی را تشخیص دهید. همچنین، برای افزایش اطمینان شما، تمام محصولات ما دارای کد اختصاصی روی بسته بندی هستند که به شما این
                    امکان را می‌دهد تا اصالت محصول را با استفاده از این کد بررسی کنید و از اینکه کالایی با کیفیت و اصلی را دریافت می‌کنید،
                    اطمینان حاصل کنید.
                </p>
                <p className="mt-5 text-justify text-sm font-bold leading-7 tracking-tight text-neutral-600">
                    از این روی، ما به مشتریان خود تضمین می‌دهیم که هرگز از ما کالای تقلبی یا با کیفیت پایین نخواهند گرفت، و از اینکه از
                    محصولاتی با قیمت روی بسته بندی خود لذت می‌برند و می‌توانند اصالت آنها را با اطمینان بررسی کنند، اطمینان داریم.
                </p>
            </section>
            <section>
                <div className="w-full rounded-xl border border-neutral-300 bg-gradient-to-tr from-neutral-200 to-neutral-100 p-2 pb-5 lg:mt-8">
                    <ul className="flex w-full flex-col items-stretch justify-start gap-y-5">
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
                            <p className="font-extrabold tracking-tight text-neutral-600">تولید کننده</p>
                        </li>
                        <li className="flex w-full items-center justify-between text-sm font-bold">
                            <p className="flex items-center justify-center gap-x-0.5 text-neutral-500">
                                <Verify variant="Bulk" className="h-6 w-6" />
                                تضمین‌کننده کیفیت کالا:
                            </p>
                            <p className="font-extrabold tracking-tight text-neutral-600">تولید کننده</p>
                        </li>
                        <li className="flex w-full items-center justify-between text-sm font-bold">
                            <p className="flex items-center justify-center gap-x-0.5 text-neutral-500">
                                <MedalStar variant="Bulk" className="h-6 w-6" />
                                تضمین‌کننده اصالت کالا:
                            </p>
                            <p className="font-extrabold tracking-tight text-neutral-600">تولید کننده</p>
                        </li>
                        <li className="flex w-full items-center justify-between text-sm font-bold">
                            <p className="flex items-center justify-center gap-x-0.5 text-neutral-500">
                                <Calendar2 variant="Bulk" className="h-6 w-6" />
                                قیمتِ امروز: (<span className="text-xs">{new Date().toLocaleDateString("fa-IR")}</span>)
                            </p>
                            <p
                                dir="ltr"
                                className="w-fit bg-gradient-to-r from-orange-900 to-orange-500 bg-clip-text text-lg font-extrabold tracking-tight text-transparent"
                            >
                                251,900 <span className="text-xs">تومان</span>
                            </p>
                        </li>
                    </ul>
                    <button
                        type="button"
                        className="mt-5 flex w-full items-center justify-center gap-x-0.5 rounded-2xl bg-gradient-to-l from-orange-900 to-orange-400 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-900/40 duration-200 lg:py-2.5 lg:hover:translate-y-1 lg:hover:shadow-none"
                    >
                        <ShoppingCart variant="Bulk" className="h-6 w-6" />
                        افزودن به سبد خرید
                    </button>
                </div>
                <p className="mt-5 text-justify text-xs font-extrabold leading-6 tracking-tight text-neutral-600 lg:mt-2">
                    اطمینان حاصل شده از تامین کننده معتبر، تضمین کننده کیفیت و تضمین کننده اصالت کالا،{" "}
                    <span className="text-orange-900">کلید اعتماد شما</span> به خرید را افزایش می‌دهد. این اطلاعات، در صفحه همه کالاهای
                    فروشگاه قرار گرفته است، تا از کیفیت و اصالت بدون ‌شک محصولات مطمئن شوید.
                </p>
            </section>
        </main>
    );
};
export default GuaranteeOfProductAuthenticity;
