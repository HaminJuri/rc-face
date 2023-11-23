import LocalFont from "next/font/local";
const YekanBakhFaNum = LocalFont({
  src: [
    {
      path: "./../../public/fonts/woff2/YekanBakhFaNum-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./../../public/fonts/woff2/YekanBakhFaNum-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./../../public/fonts/woff2/YekanBakhFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../../public/fonts/woff2/YekanBakhFaNum-SemiBold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./../../public/fonts/woff2/YekanBakhFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./../../public/fonts/woff2/YekanBakhFaNum-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./../../public/fonts/woff2/YekanBakhFaNum-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./../../public/fonts/woff2/YekanBakhFaNum-ExtraBlack.woff2",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-yekan-bakh",
  style: "normal",
});

export default YekanBakhFaNum;
