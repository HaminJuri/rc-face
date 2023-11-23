import dynamic from "next/dynamic";

const ClientSupportPage = dynamic(() => import("./ClientSupportPage"), {
    ssr: false,
});

export const metadata = {
    title: "تماس با ما | ارتباط با روغنی کار | مرجع فروش انواع روغن، فیلتر و دیگر موارد مصرفی وسایل نقلیه",
    description:
        "در صورت بروز هرگونه مشکل در هر بخش از مراحل و یا نیاز به پشتیبانی و راهنمایی استفاده از سایت میتوانید با ما از طریق راه های ارتباطی این صفحه، در تماس باشید",
    openGraph: {
        title: "تماس با ما | ارتباط با روغنی کار | مرجع فروش انواع روغن، فیلتر و دیگر موارد مصرفی وسایل نقلیه",
        description:
            "در صورت بروز هرگونه مشکل در هر بخش از مراحل و یا نیاز به پشتیبانی و راهنمایی استفاده از سایت میتوانید با ما از طریق راه های ارتباطی این صفحه، در تماس باشید",
        locale: "fa_IR",
        siteName: "@roghanicar_com",
        url: "https://roghanicar.com/support",
    },
    twitter: {
        title: "تماس با ما | ارتباط با روغنی کار | مرجع فروش انواع روغن، فیلتر و دیگر موارد مصرفی وسایل نقلیه",
        description:
            "در صورت بروز هرگونه مشکل در هر بخش از مراحل و یا نیاز به پشتیبانی و راهنمایی استفاده از سایت میتوانید با ما از طریق راه های ارتباطی این صفحه، در تماس باشید",
        card: "summary",
        site: "@roghanicar_com",
    },
};

//! Template
const SupportPage = () => {
    return <ClientSupportPage />;
};

export default SupportPage;
