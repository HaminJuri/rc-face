import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "remixicon/fonts/remixicon.css";

//! Components
import { Toaster } from "react-hot-toast";
import QueryProvider from "./QueryProvider";
import RootNavFooter from "./RootNavFooter";

//! Fonts
import YekanBakhFaNum from "@/constants/YekanBakhFaNum";
import RobotoFamily from "@/constants/RobotoFamily";

export const metadata = {
    creator: "روغنی کار",
    themeColor: "#FF4800",
    twitter: {
        creator: "@roghanicar_com",
    },
    other: {
        fontIran: "8HD6PK",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="fa-IR" dir="rtl">
            <body className={`${YekanBakhFaNum.variable} font-sans ${RobotoFamily.variable}`}>
                <Toaster
                    containerClassName="font-sans font-bold text-sm"
                    position="top-left"
                    toastOptions={{
                        success: { className: "!text-neutral-600" },
                        error: { className: "!text-rose-600" },
                        duration: 5000,
                    }}
                />
                <QueryProvider>
                    <RootNavFooter>{children}</RootNavFooter>
                </QueryProvider>
            </body>
        </html>
    );
}
