//! Components
import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("./ClientCartPage"), { ssr: false });

export const metadata = {
    title: "سبد خرید من | اعمال تغییرات سبد خرید | روغنی کار",
    description:
        "با استفاده از این صفحه، شما میتوانید تمامی کنترل های لازمه برای افزودن، تغییر و یا حذف محصولات سبد خرید خود را دارا باشید. | روغنی کار، مرجع انواع روغن، فیلتر و دیگر مصرفی های وسایل نقلیه",
    openGraph: {
        title: "سبد خرید من | اعمال تغییرات سبد خرید | روغنی کار",
        locale: "fa_IR",
        description:
            "با استفاده از این صفحه، شما میتوانید تمامی کنترل های لازمه برای افزودن، تغییر و یا حذف محصولات سبد خرید خود را دارا باشید. | روغنی کار، مرجع انواع روغن، فیلتر و دیگر مصرفی های وسایل نقلیه",
        siteName: "@roghanicar_com",
        url: "https://roghanicar.com/cart",
    },
    twitter: {
        title: "سبد خرید من | اعمال تغییرات سبد خرید | روغنی کار",
        description:
            "با استفاده از این صفحه، شما میتوانید تمامی کنترل های لازمه برای افزودن، تغییر و یا حذف محصولات سبد خرید خود را دارا باشید. | روغنی کار، مرجع انواع روغن، فیلتر و دیگر مصرفی های وسایل نقلیه",
        card: "summary",
        site: "@roghanicar_com",
    },
};

const CartPage = () => {
    return <NoSSR />;
};

export default CartPage;
