import LocalFont from "next/font/local";
const RobotoFamily = LocalFont({
    src: [
        {
            path: "./../../public/fonts/roboto/Roboto-Thin.woff2",
            weight: "200",
            style: "normal",
        },
        {
            path: "./../../public/fonts/roboto/Roboto-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "./../../public/fonts/roboto/Roboto-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "./../../public/fonts/roboto/Roboto-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "./../../public/fonts/roboto/Roboto-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "./../../public/fonts/roboto/Roboto-Black.woff2",
            weight: "900",
            style: "normal",
        },
    ],
    variable: "--font-roboto",
    style: "normal",
});

export default RobotoFamily;
