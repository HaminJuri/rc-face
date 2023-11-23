"use client";
//! Required
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

//! Components
import Image from "next/image";
import Link from "next/link";
import TheField from "@/components/TheField";
import { Call, Send, Send2 } from "iconsax-react";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import TheTextArea from "@/components/TheTextarea";
import ListOfApps from "./ListOfApps";
import addNewTicketService from "@/services/ticket.service";
import NormalizeInput from "@/hooks/NormalizeInput";
import toast from "react-hot-toast";

const VALID_FORM = object().shape({
    firstName: string()
        .required("خطا: لطفا نام خود را وارد کنید")
        .min(2, "خطا: نام وارد شده اشتباه است")
        .matches(/^[\u0600-\u06FF\s]+$/, "خطا: لطفا از حروف فارسی استفاده کنید"),
    lastName: string()
        .required("خطا: لطفا نام خانوادگی خود را وارد کنید")
        .min(2, "خطا: نام خانوادگی وارد شده اشتباه است")
        .matches(/^[\u0600-\u06FF\s]+$/, "خطا: لطفا از حروف فارسی استفاده کنید"),
    phone: string()
        .matches(/^\d+$/, "خطا: فقط اعداد قابل قبول است")
        .min(11, "خطا: شماره وارد شده اشتباه است")
        .max(11, "خطا: شماره وارد شده اشتباه است"),
    subject: string().required("خطا: لطفا موضوع مد نظر خود را وارد کنید"),
    message: string().required("خطا: لطفا متن مد نظر خود را وارد کنید"),
});
//! Template
const ClientSupportPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const step = searchParams.get("step");
    const [isDesktop, setIsDesktop] = useState(false);
    const { isLoading: isAddingTicket, mutateAsync: mutateAddTicket } = useMutation({
        mutationKey: ["add-ticket"],
        mutationFn: addNewTicketService,
    });
    const ADD_TICKET = async (body) => {
        body = {
            phone: body.phone,
            firstName: NormalizeInput(body.firstName),
            lastName: NormalizeInput(body.lastName),
            subject: NormalizeInput(body.subject),
            message: NormalizeInput(body.message),
        };
        try {
            const response = await mutateAddTicket(body);
            toast.success(response?.data?.message);
        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0 });
        if (window.screen.width >= 1024) {
            setIsDesktop(true);
        } else if (!searchParams.has("step")) {
            router.push(pathname + "?" + "step=1", { scroll: true });
        }
    }, []);

    return (
        <main className="container pb-8 lg:grid lg:grid-cols-3 lg:gap-x-4 lg:pt-14">
            <header className="mx-auto w-full max-w-md sm:mt-2 sm:overflow-hidden sm:rounded-2xl lg:hidden">
                <figure className="h-full w-full">
                    <Image
                        src={"/images/Mobile_Support.jpg"}
                        alt="پشتیبانی روغنی کار و راه های ارتباطی"
                        width={448}
                        height={99}
                        sizes="100vw"
                        style={{
                            width: "448px",
                            height: "99px",
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                    />
                </figure>
            </header>
            {/* Stepper */}
            {!isDesktop && (
                <div className="relative my-8 grid w-full grid-cols-2 items-center justify-items-center text-sm lg:hidden">
                    <h1
                        className={`flex flex-col items-center justify-center ${
                            step == 1 ? "font-extrabold text-orange-500" : "font-bold text-neutral-400"
                        }`}
                    >
                        <Link href="/support?step=1" className="flex flex-col items-center justify-center">
                            <Send2 variant="Bulk" className="mb-2 h-7 w-7" />
                            ارسال پیام به پشتیبانی
                        </Link>
                    </h1>
                    <div className="absolute top-4 w-1/3 border-b border-neutral-300"></div>
                    <h2>
                        <Link
                            href="/support?step=2"
                            className={`flex flex-col items-center justify-center ${
                                step == 2 ? "font-extrabold text-orange-500" : "font-bold text-neutral-400"
                            }`}
                        >
                            <Call variant="Bulk" className="mb-2 h-7 w-7" />
                            راه‌های ارتباطی
                        </Link>
                    </h2>
                </div>
            )}
            {/* Stepper */}
            {/* Support Form */}
            {(step == 1 || !!isDesktop) && (
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        phone: "",
                        subject: "",
                        message: "",
                    }}
                    validationSchema={VALID_FORM}
                    onSubmit={ADD_TICKET}
                    enableReinitialize={true}
                >
                    {({ touched, isValid }) => (
                        // layout / loading btn / validation
                        <Form className="px-2 lg:order-1 lg:col-span-2">
                            <div className="grid grid-cols-1 items-start justify-items-stretch gap-5 rounded-xl bg-white p-2.5 pb-3.5 lg:grid-cols-2">
                                <TheField
                                    label="نام:"
                                    name="firstName"
                                    inputClass="!tracking-tight"
                                    isRequired={true}
                                    errorHandling={true}
                                />
                                <TheField
                                    label="نام خانوادگی:"
                                    name="lastName"
                                    inputClass="!tracking-tight"
                                    isRequired={true}
                                    errorHandling={true}
                                />
                                <TheField
                                    label="شماره تماس: (اختیاری)"
                                    name="phone"
                                    labelClass="py-0.5"
                                    inputMode="numeric"
                                    dir="ltr"
                                    maxLength="11"
                                    errorHandling={true}
                                />
                                <TheField
                                    label="موضوع:"
                                    name="subject"
                                    isRequired={true}
                                    inputClass="!tracking-tight"
                                    forExample="مثلا: پیشنهاد / انتقاد / تماس با مدیریت / امور مالی / ..."
                                    errorHandling={true}
                                />
                                <TheTextArea
                                    label="متن پیام:"
                                    name="message"
                                    containerClass="lg:col-span-2"
                                    inputClass="!tracking-tight"
                                    isRequired={true}
                                    errorHandling={true}
                                />
                                <div className="flex w-full items-center justify-between lg:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={touched && !isValid}
                                        className="flex w-fit items-center justify-center rounded-lg bg-orange-100 py-1.5 pl-3.5 text-sm font-bold text-orange-900 disabled:bg-neutral-100 disabled:text-neutral-400"
                                    >
                                        <Send variant="Bulk" className="mx-1 h-6 w-6" />
                                        ثبت و ارسال پیام
                                    </button>
                                    <a
                                        href="tel:09202870073"
                                        rel="external"
                                        className="flex w-fit items-center justify-center rounded-lg bg-emerald-50 py-1.5 pl-2 text-sm font-bold text-emerald-600"
                                    >
                                        <Call variant="Bulk" className="-ml-1 mr-1 h-6 w-6 rotate-[-135deg]" />
                                        تماس با پشتیبانی
                                    </a>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
            {/* Support Form */}
            {/* Phone, Address, Social */}
            {(step == 2 || !!isDesktop) && (
                <section className="flex w-full flex-col items-stretch justify-start gap-y-4 px-2 lg:order-2 lg:px-0">
                    <figure className="hidden h-fit w-full overflow-hidden rounded-xl lg:block">
                        <Image
                            src={"/images/Desktop_Support.jpg"}
                            alt="پشتیبانی روغنی کار و راه های ارتباطی"
                            width={382}
                            height={99}
                            sizes="100vw"
                            style={{
                                width: "382px",
                                height: "99px",
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
                    </figure>
                    <ul className="flex w-full flex-col items-center justify-center gap-y-5 rounded-xl bg-white px-2.5 py-2">
                        <li className="flex w-full items-center justify-between text-sm font-extrabold text-neutral-600">
                            پشتیبانی و مشاوره فروشگاه:
                            <p
                                dir="ltr"
                                className="w-fit bg-gradient-to-r from-orange-900 to-orange-500 bg-clip-text text-base font-black tracking-widest text-transparent"
                            >
                                021-88505073
                            </p>
                        </li>
                        <li className="flex w-full items-center justify-between text-sm font-extrabold text-neutral-600">
                            پیگیری سفارش:
                            <p
                                dir="ltr"
                                className="w-fit bg-gradient-to-r from-orange-900 to-orange-500 bg-clip-text text-base font-black tracking-widest text-transparent"
                            >
                                021-88739914
                            </p>
                        </li>
                        <li className="flex w-full items-center justify-between text-sm font-extrabold text-neutral-600">
                            پشتیبانی سایت:
                            <p
                                dir="ltr"
                                className="w-fit bg-gradient-to-r from-orange-900 to-orange-500 bg-clip-text text-base font-black tracking-widest text-transparent"
                            >
                                09108803727
                            </p>
                        </li>
                        <li className="flex w-full items-center justify-between text-sm font-extrabold text-neutral-600">
                            شماره فکس:
                            <p
                                dir="ltr"
                                className="w-fit bg-gradient-to-r from-orange-900 to-orange-500 bg-clip-text text-base font-black tracking-widest text-transparent"
                            >
                                021-88863791
                            </p>
                        </li>
                    </ul>
                    <div className="flex w-full flex-col items-stretch justify-start rounded-xl bg-white py-2 pr-2.5">
                        <h6 className="text-sm font-extrabold text-neutral-600">آدرس دفتر:</h6>
                        <p className="mt-2 text-xs font-extrabold text-neutral-500">
                            تهران، محله باغ صبا (سهروردی)، خیابان قابوسنامه، خیابان زهره، پلاک ۲۹، ساختمان ۳۵، طبقه سوم،
                            واحد7، یدک پیشگام اطلس
                        </p>
                    </div>
                    <ul className="flex w-full flex-wrap gap-3">
                        {ListOfApps.map((app) => (
                            <li key={app.primaryColor}>
                                <a
                                    href={app.href}
                                    style={{
                                        background: app.secondColor,
                                        color: app.primaryColor,
                                        boxShadow: app.shadow,
                                    }}
                                    className="flex items-center justify-center gap-x-1 rounded-xl px-2.5 py-2 text-sm font-extrabold"
                                >
                                    <figure>
                                        <Image
                                            src={app.iconSrc}
                                            alt={app.label}
                                            width={22}
                                            height={22}
                                            sizes="10vw"
                                            quality={30}
                                            style={{
                                                width: "22px",
                                                height: "22px",
                                                objectFit: "cover",
                                                objectPosition: "center",
                                            }}
                                        />
                                    </figure>
                                    {app.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {/* Phone, Address, Social */}
            {!!isAddingTicket && (
                <div className="fixed right-0 top-0 z-[400] grid max-h-screen min-h-screen w-full place-items-center bg-black/20 backdrop-blur-md backdrop-saturate-200">
                    <div className="flex w-full max-w-[15rem] flex-col items-center justify-center gap-y-5 rounded-xl bg-neutral-100 py-8">
                        <figure className="flex w-full justify-center">
                            <Image
                                src="/images/LogoCool.png"
                                alt="لوگو روغنی کار"
                                width={180}
                                height={58}
                                styles={{ objectFit: "contain" }}
                            />
                        </figure>
                        <p className="text-center text-base font-bold text-neutral-700">در حال ارسال ...</p>
                    </div>
                </div>
            )}
        </main>
    );
};

export default ClientSupportPage;
