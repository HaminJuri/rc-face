import dynamic from "next/dynamic";

const ClientProductList = dynamic(() => import("./ClientProductList"), {
    ssr: false,
});

export const metadata = {
    title: "لیست محصولات | انواع روغن و فیلتر خودروهای سبک و سنگین | روغنی کار",
    description:
        "خرید اینترنتی انواع روغن، فیلتر و دیگر موارد مصرفی خودروهای سبک و خودروهای سنگین از تمامی برندها این بازار در فروشگاه اینترنتی روغنی کار",
    openGraph: {
        title: "لیست محصولات | انواع روغن و فیلتر خودروهای سبک و سنگین | روغنی کار",
        description:
            "خرید اینترنتی انواع روغن، فیلتر و دیگر موارد مصرفی خودروهای سبک و خودروهای سنگین از تمامی برندها این بازار در فروشگاه اینترنتی روغنی کار",
        locale: "fa_IR",
        siteName: "@roghanicar_com",
        url: "https://roghanicar.com/product-list",
    },
    twitter: {
        title: "لیست محصولات | انواع روغن و فیلتر خودروهای سبک و سنگین | روغنی کار",
        description:
            "خرید اینترنتی انواع روغن، فیلتر و دیگر موارد مصرفی خودروهای سبک و خودروهای سنگین از تمامی برندها این بازار در فروشگاه اینترنتی روغنی کار",
        card: "summary_large_image",
        site: "@roghanicar_com",
    },
};

//! Template
const ProductListPage = () => {
    return <ClientProductList />;
};

export default ProductListPage;
