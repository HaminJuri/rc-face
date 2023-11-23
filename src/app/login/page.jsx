import dynamic from "next/dynamic";

const ClientLoginPage = dynamic(() => import("./ClientLoginPage"), {
    ssr: false,
});

export const metadata = {
    title: "ورود به حساب کاربری | دسترسی به خرید و ثبت سفارش | روغنی کار",
    description:
        "با استفاده از این صفحه، می‌توانید به سادگی و فقط با وارد کردن یک شماره تلفن وارد حساب کاربری خود شوید | روغنی کار فروش اینترنتی محصولات مصرفی وسایل نقلیه",
    openGraph: {
        title: "ورود به حساب کاربری | دسترسی به خرید و ثبت سفارش | روغنی کار",
        description:
            "با استفاده از این صفحه، می‌توانید به سادگی و فقط با وارد کردن یک شماره تلفن وارد حساب کاربری خود شوید | روغنی کار فروش اینترنتی محصولات مصرفی وسایل نقلیه",
        url: "https://roghanicar.com/login",
    },
    twitter: {
        title: "ورود به حساب کاربری | دسترسی به خرید و ثبت سفارش | روغنی کار",
        description:
            "با استفاده از این صفحه، می‌توانید به سادگی و فقط با وارد کردن یک شماره تلفن وارد حساب کاربری خود شوید | روغنی کار فروش اینترنتی محصولات مصرفی وسایل نقلیه",
    },
};

//! Template
const LoginPage = () => {
    return <ClientLoginPage />;
};

export default LoginPage;
