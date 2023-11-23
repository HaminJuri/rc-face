"use client";
import { hasCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { addToCart } from "@/services/cart.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Notification1, ShoppingCart } from "iconsax-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ShopDescription = dynamic(() => import("./ShopDescription"));

const CartButton = ({ product, shopState }) => {
    const token = getCookie("TOKEN");
    const router = useRouter();
    const pathname = usePathname();

    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        if (show) {
            setDisplay(true);
        } else if (!show) {
            setTimeout(() => {
                setDisplay(false);
            }, 400);
        }
    }, [show]);

    const { isLoading: isAdding, mutateAsync: mutateAddToCart } = useMutation({
        mutationFn: addToCart,
    });

    const innerTextBtn = () => {
        if (!hasCookie("TOKEN")) {
            return "ابتدا، وارد حساب کاربری خود شوید";
        } else if (process.env.NODE_ENV === "production" && !!shopState.isOffline) {
            return "فروشگاه بسته است";
        } else if (hasCookie("TOKEN") && !hasCookie(product?._id)) {
            return "افزودن به سبد خرید";
        } else if (hasCookie("TOKEN") && hasCookie(product?._id)) {
            return "افزوده شد، مشاهده سبد خرید";
        }
    };

    const innerActionBtn = async () => {
        if (!hasCookie("TOKEN")) {
            router.push(`/login/?from=${pathname}`);
            return;
        } else if (process.env.NODE_ENV === "production" && !!shopState.isOffline) {
            setShow(true);
            return;
        } else if (hasCookie("TOKEN") && !hasCookie(product?._id)) {
            try {
                const res = await mutateAddToCart({
                    data: { productID: product._id },
                    token,
                });
                if (res?.status === 201) {
                    setCookie(product?._id, true, { maxAge: 1800 });
                    return toast.success("محصول با موفقیت به سبد خرید افزوده شد");
                }
            } catch (error) {
                if (error?.response?.data?.error) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error("خطا در برقراری ارتباط با سامانه، لطفا دوباره تلاش کنید");
                }
            }
        } else if (hasCookie("TOKEN") && hasCookie(product?._id)) {
            router.push("/cart");
        }
    };

    const renderCartButton = () => {
        if (!!product.quantity && product.quantity > 0) {
            if (!isAdding) {
                return (
                    <button
                        onClick={() => innerActionBtn()}
                        disabled={product.quantity <= 0}
                        className="mt-4 flex w-full items-center justify-center gap-x-0.5 rounded-2xl bg-gradient-to-l from-orange-900 to-rose-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-500/60 duration-200 lg:py-2.5 lg:hover:translate-y-1 lg:hover:shadow-none"
                    >
                        <ShoppingCart variant="Bulk" className="h-6 w-6" />
                        {innerTextBtn()}
                    </button>
                );
            } else if (isAdding) {
                return (
                    <div className="flex w-full justify-center">
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                );
            }
        } else if (product.quantity <= 0) {
            return (
                <button
                    disabled={product.quantity > 0}
                    className="mt-4 flex w-full items-center justify-center gap-x-0.5 rounded-2xl bg-orange-500/20 py-3.5 text-sm font-bold text-orange-900 lg:py-2.5"
                >
                    <Notification1 variant="Broken" className="h-6 w-6" />
                    موجود شد بهم خبر بدین
                </button>
            );
        }
    };
    return (
        <>
            {renderCartButton()}
            {!!display && <ShopDescription description={shopState?.description} show={show} setShow={setShow} />}
        </>
    );
};
export default CartButton;
