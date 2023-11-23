import dynamic from "next/dynamic";

const ClientProfilePage = dynamic(() => import("./ClientProfilePage"), {
    ssr: false,
});

export const metadata = {
    title: "مشاهده آخرین وضعیت سفارشات | مشخصات من | به‌روزرسانی مشخصات و یا مشاهده وضعیت سفارشات | روغنی کار",
    description:
        "با استفاده از این صفحه، شما میتوانید جز شماره تلفن خود، تمامی مشخصات خود را بروزرسانی کنید و یا از آخرین وضعیت سفارشات خود با خبر شوید",
    openGraph: {
        title: "مشاهده آخرین وضعیت سفارشات | مشخصات من | به‌روزرسانی مشخصات و یا مشاهده وضعیت سفارشات | روغنی کار",
        description:
            "با استفاده از این صفحه، شما میتوانید جز شماره تلفن خود، تمامی مشخصات خود را بروزرسانی کنید و یا از آخرین وضعیت سفارشات خود با خبر شوید",
        locale: "fa_IR",
        siteName: "@roghanicar_com",
        url: "https://roghanicar.com/profile",
    },
    twitter: {
        title: "مشاهده آخرین وضعیت سفارشات | مشخصات من | به‌روزرسانی مشخصات و یا مشاهده وضعیت سفارشات | روغنی کار",
        description:
            "با استفاده از این صفحه، شما میتوانید جز شماره تلفن خود، تمامی مشخصات خود را بروزرسانی کنید و یا از آخرین وضعیت سفارشات خود با خبر شوید",
        card: "summary_large_image",
        site: "@roghanicar_com",
    },
};

//! Template
const ProfilePage = () => {
    return <ClientProfilePage />;
};

export default ProfilePage;
