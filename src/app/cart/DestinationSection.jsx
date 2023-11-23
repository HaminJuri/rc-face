"use client";
//! Required
import { useEffect, useState } from "react";
import { allProvinces, searchByName } from "iran-city";
import { object, string } from "yup";
import { useMutation } from "@tanstack/react-query";
import NormalizeInput from "@/hooks/NormalizeInput";
import "./checkbox.css";

const provinceList = allProvinces();

const VALID_FORM = object().shape({
    title: string().required("خطا: لطفا عنوان آدرس را وارد کنید"),
    postal: string()
        .required("خطا: لطفا کد پستی خود را وارد کنید")
        .min(10, "خطا: کد پستی وارد شده اشتباه است")
        .max(10, "خطا: کد پستی وارد شده اشتباه است")
        .matches(/^\d+$/, "خطا: فقط اعداد قابل قبول است"),
    receiverName: string()
        .required("خطا: لطفا نام تحویل گیرنده را وارد کنید")
        .min(2, "خطا: نام وارد شده اشتباه است")
        .matches(/^[\u0600-\u06FF\s]+$/, "خطا: لطفا از حروف فارسی استفاده کنید"),
    receiverPhone: string()
        .required("خطا: لطفا شماره تحویل گیرنده را وارد کنید")
        .matches(/^\d+$/, "خطا: فقط اعداد قابل قبول است")
        .min(11, "خطا: شماره وارد شده اشتباه است")
        .max(11, "خطا: شماره وارد شده اشتباه است"),
    address: string().required("خطا: لطفا آدرس دقیق محل تحویل را وارد کنید").min(10, "خطا: آدرس وارد شده اشتباه است"),
});

//! Component
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LocationAdd, LocationTick, Trash } from "iconsax-react";
import { addingUserAddressService, deleteUserAddressService } from "@/services/user.services";
import { getCookie } from "cookies-next";
import { toast } from "react-hot-toast";

//! Template
const DestinationForm = ({
    CALC_FREIGHT,
    isDestination,
    receiverName,
    receiverPhone,
    addresses,
    refetchCart,
    selectedAdrID,
}) => {
    const [citiesList, setCitiesList] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    useEffect(() => {
        setSelectedAddress(selectedAdrID);
    }, [selectedAdrID]);
    const selectAddressHandler = (id) => {
        if (selectedAddress === id) {
            setSelectedAddress("");
            CALC_FREIGHT({ adrID: 1234 });
        } else {
            setSelectedAddress(id);
            CALC_FREIGHT({ adrID: id });
        }
    };

    const [showDeleteAddress, setShowDeleteAddress] = useState(false);
    const deleteAddressHandler = (id) => {
        setShowDeleteAddress(true);
        setSelectedAddress(id);
    };

    useEffect(() => {
        setCitiesList(searchByName(selectedProvince));
    }, [selectedProvince]);

    useEffect(() => {
        if (showAddressForm || showDeleteAddress) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [showAddressForm, showDeleteAddress]);

    const { mutateAsync: mutateAddingAddress } = useMutation({
        mutationKey: ["add-address"],
        mutationFn: addingUserAddressService,
    });
    const ADD_ADDRESS = async (body) => {
        body = {
            ...body,
            title: NormalizeInput(body.title),
            postal: NormalizeInput(body.postal),
            receiverName: NormalizeInput(body.receiverName),
            receiverPhone: NormalizeInput(body.receiverPhone),
            address: NormalizeInput(body.address),
        };
        try {
            const response = await mutateAddingAddress({ token: getCookie("TOKEN"), body });
            toast.success(response?.data?.message);
            setShowAddressForm(false);
            setSelectedAddress(response?.data.addedAddress.id);
            refetchCart();
        } catch (error) {
            toast.error(error?.response?.data.error);
        }
    };

    const { mutateAsync: mutateDeleteUserAddress } = useMutation({
        mutationKey: ["delete-address"],
        mutationFn: deleteUserAddressService,
    });
    const DELETE_ADDRESS = async () => {
        try {
            await mutateDeleteUserAddress({ token: getCookie("TOKEN"), addressID: selectedAddress });
            toast.success("آدرس با موفقیت حذف شد");
            setShowDeleteAddress(false);
            setSelectedAddress("");
            CALC_FREIGHT({ adrID: 1234 });
        } catch (error) {
            setShowDeleteAddress(false);
            setSelectedAddress("");
            toast.error(error?.response?.data.error);
        }
    };

    return (
        <>
            <section className="mt-2.5 grid w-full grid-cols-1 items-start justify-items-stretch gap-4 sm:grid-cols-2">
                {addresses.map((adr) => (
                    <div
                        onClick={() => selectAddressHandler(adr._id)}
                        key={adr._id}
                        className={`flex cursor-pointer flex-col items-start justify-center gap-y-5 rounded-lg border p-2 text-sm font-extrabold text-neutral-500 ${
                            selectedAddress === adr._id
                                ? "border-blue-300 bg-blue-50/50"
                                : "border-neutral-200 bg-white"
                        }`}
                    >
                        <div className="flex w-full items-center justify-between">
                            <h6
                                className={`flex items-center justify-start gap-x-1 text-base font-bold tracking-tight ${
                                    selectedAddress === adr._id ? "text-blue-600" : "text-neutral-600"
                                }`}
                            >
                                <label className="containerrrr">
                                    <input checked={selectedAddress === adr._id} onChange={() => {}} type="checkbox" />
                                    <div className="checkmark"></div>
                                </label>
                                {adr.title}
                            </h6>
                            <button
                                type="button"
                                onClick={() => deleteAddressHandler(adr._id)}
                                className="ml-1 aspect-square rounded bg-rose-100 px-0.5 text-rose-600"
                            >
                                <Trash variant="Bulk" className="aspect-square h-5 w-5 rounded bg-rose-100" />
                            </button>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <p className="w-full text-start">
                                {adr.province} / {adr.city}
                            </p>
                            <p className="w-full text-end">
                                {adr.receiverName} - {adr.receiverPhone.slice(7)}***{adr.receiverPhone.slice(0, 4)}
                            </p>
                        </div>
                        <p className="flex flex-col items-start justify-start gap-1 text-sm font-bold">
                            <span className="font-extrabold">آدرس تحویل: </span>
                            {adr.address}
                        </p>
                    </div>
                ))}
                <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex h-full min-h-[6.25rem] items-center justify-center rounded-lg border border-blue-200 bg-blue-100 text-sm font-bold text-blue-600"
                >
                    <LocationAdd variant="Bulk" className="mb-0.5 h-7 w-7 text-blue-500" />
                    افزودن آدرس جدید
                </button>
            </section>
            {!!showDeleteAddress && (
                <div
                    onClick={() => setShowDeleteAddress(false)}
                    className="fixed right-0 top-0 z-[300] grid h-full max-h-screen min-h-screen w-full place-items-center bg-white/5 backdrop-blur-md backdrop-saturate-150"
                >
                    <div className="w-full max-w-xs rounded-lg border border-neutral-200 bg-white px-2.5 py-2">
                        <h6 className="mb-8 text-sm font-bold text-neutral-700">از حذف آدرس اطمینان دارین؟</h6>
                        <div className="grid w-full grid-cols-2 items-center justify-items-center">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    DELETE_ADDRESS();
                                }}
                                className="w-full rounded-lg bg-rose-50 py-1 text-center text-sm font-bold text-rose-500"
                            >
                                حذف شود
                            </button>
                            <button type="button" className="w-full py-1 text-center text-sm font-bold text-rose-500">
                                منصرف شدم
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {!!showAddressForm && (
                <div
                    onClick={() => setShowAddressForm(false)}
                    className="fixed right-0 top-0 z-[500] flex h-full max-h-screen min-h-screen w-full items-start justify-center overflow-y-auto bg-white/5 px-4 py-60 backdrop-blur-md backdrop-saturate-150 sm:px-0 lg:items-center"
                >
                    <section
                        onClick={(e) => e.stopPropagation()}
                        className="grid w-full max-w-2xl grid-cols-1 items-stretch justify-items-stretch overflow-hidden rounded-xl border-x border-t border-blue-200 bg-white pt-3 shadow-xl shadow-black/20 lg:my-5 lg:grid-cols-2"
                    >
                        <Formik
                            initialValues={{
                                title: "",
                                postal: "",
                                receiverName: receiverName || "",
                                receiverPhone: receiverPhone || "",
                                address: "",
                            }}
                            validationSchema={VALID_FORM}
                            onSubmit={(body) => {
                                body = {
                                    ...body,
                                    province: selectedProvince,
                                    city: selectedCity,
                                };
                                ADD_ADDRESS(body);
                            }}
                            enableReinitialize={true}
                        >
                            {({ errors, touched, isValid }) => (
                                <Form className="grid w-full grid-cols-1 items-stretch justify-items-stretch lg:col-span-2 lg:grid-cols-2">
                                    <div className="mb-3 flex w-full flex-col items-start justify-start px-3">
                                        <label
                                            htmlFor="title"
                                            className="mb-1 pr-4 text-sm font-extrabold text-neutral-600"
                                        >
                                            عنوان:<span className="text-base text-orange-900">*</span> (
                                            <span className="text-xs text-neutral-500">
                                                {" "}
                                                مثلا: منزل / محل کار / ...{" "}
                                            </span>
                                            )
                                        </label>
                                        <Field
                                            name="title"
                                            id="title"
                                            type="text"
                                            dir="rtl"
                                            aria-autocomplete="none"
                                            autoComplete="off"
                                            onFocus={(e) => e.target.select()}
                                            style={
                                                errors.title && touched.title
                                                    ? { border: "1px solid #f43f5e", background: "#fff1f2" }
                                                    : null
                                            }
                                            className="w-full rounded-lg border bg-white pb-2 pt-3 text-center text-base font-bold tracking-tight text-neutral-600 outline-none duration-200 hover:border-blue-300 focus:border-blue-300 focus:bg-white focus:shadow-xl focus:shadow-blue-500/20"
                                        />
                                        <p className="mt-2 w-full text-center text-sm font-bold text-rose-500">
                                            <ErrorMessage name="title" />
                                        </p>
                                    </div>
                                    <div className="mb-3 flex w-full flex-col items-start justify-start px-3">
                                        <label
                                            htmlFor="postal"
                                            className="mb-1 pr-4 text-sm font-extrabold text-neutral-600"
                                        >
                                            کد پستی:<span className="text-base text-orange-900">*</span>
                                        </label>
                                        <Field
                                            name="postal"
                                            id="postal"
                                            type="text"
                                            dir="ltr"
                                            inputMode="numeric"
                                            aria-autocomplete="none"
                                            autoComplete="off"
                                            onFocus={(e) => e.target.select()}
                                            style={
                                                errors.postal && touched.postal
                                                    ? { border: "1px solid #f43f5e", background: "#fff1f2" }
                                                    : null
                                            }
                                            className="w-full rounded-lg border bg-white pb-2 pt-3 text-center text-base font-bold tracking-widest text-neutral-600 outline-none duration-200 hover:border-blue-300 focus:border-blue-300 focus:bg-white focus:shadow-xl focus:shadow-blue-500/20 disabled:bg-neutral-100"
                                        />
                                        <p className="mt-2 w-full text-center text-sm font-bold text-rose-500">
                                            <ErrorMessage name="postal" />
                                        </p>
                                    </div>
                                    <div className="mb-4 flex w-full flex-col items-start justify-start px-3">
                                        <label
                                            htmlFor="receiverName"
                                            className="mb-1 pr-4 text-sm font-extrabold text-neutral-600"
                                        >
                                            نام گیرنده:<span className="text-base text-orange-900">*</span> (
                                            <span className="text-xs text-neutral-500">نام و نام خانوادگی</span>)
                                        </label>
                                        <Field
                                            name="receiverName"
                                            id="receiverName"
                                            type="text"
                                            dir="rtl"
                                            aria-autocomplete="none"
                                            autoComplete="off"
                                            onFocus={(e) => e.target.select()}
                                            style={
                                                errors.receiverName && touched.receiverName
                                                    ? { border: "1px solid #f43f5e", background: "#fff1f2" }
                                                    : null
                                            }
                                            className="w-full rounded-lg border bg-white pb-2 pt-3 text-center text-base font-bold tracking-tight text-neutral-600 outline-none duration-200 hover:border-blue-300 focus:border-blue-300 focus:bg-white focus:shadow-xl focus:shadow-blue-500/20"
                                        />
                                        <p className="mt-2 w-full text-center text-sm font-bold text-rose-500">
                                            <ErrorMessage name="receiverName" />
                                        </p>
                                    </div>
                                    <div className="mb-4 flex w-full flex-col items-start justify-start px-3">
                                        <label
                                            htmlFor="receiverPhone"
                                            className="mb-1 pr-4 text-sm font-extrabold text-neutral-600"
                                        >
                                            شماره گیرنده:<span className="text-base text-orange-900">*</span>
                                        </label>
                                        <Field
                                            name="receiverPhone"
                                            id="receiverPhone"
                                            type="text"
                                            dir="ltr"
                                            inputMode="numeric"
                                            aria-autocomplete="none"
                                            autoComplete="off"
                                            onFocus={(e) => e.target.select()}
                                            style={
                                                errors.receiverPhone && touched.receiverPhone
                                                    ? { border: "1px solid #f43f5e", background: "#fff1f2" }
                                                    : null
                                            }
                                            className="w-full rounded-lg border bg-white pb-2 pt-3 text-center text-base font-bold tracking-widest text-neutral-600 outline-none duration-200 hover:border-blue-300 focus:border-blue-300 focus:bg-white focus:shadow-xl focus:shadow-blue-500/20"
                                        />
                                        <p className="mt-2 w-full text-center text-sm font-bold text-rose-500">
                                            <ErrorMessage name="receiverPhone" />
                                        </p>
                                    </div>
                                    <div className="mb-4 flex w-full flex-col items-start justify-center px-3">
                                        <label
                                            htmlFor="province"
                                            className="mb-1 pr-4 text-sm font-extrabold text-neutral-600"
                                        >
                                            انتخاب استان:<span className="text-base text-orange-900">*</span>
                                        </label>
                                        <select
                                            name="province"
                                            id="province"
                                            value={selectedProvince}
                                            onChange={(e) => setSelectedProvince(e.target.value)}
                                            className="w-full rounded-lg border border-neutral-200 py-2 text-center text-sm font-extrabold text-neutral-600 outline-none"
                                        >
                                            {provinceList.map((province) => {
                                                return (
                                                    <option key={province.id} value={province.name}>
                                                        {province.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="mb-5 flex w-full flex-col items-start justify-center px-3">
                                        <label
                                            htmlFor="city"
                                            className="mb-1 pr-4 text-sm font-extrabold text-neutral-600"
                                        >
                                            انتخاب شهر:<span className="text-base text-orange-900">*</span>
                                        </label>
                                        <select
                                            name="city"
                                            id="city"
                                            disabled={!selectedProvince}
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.target.value)}
                                            className="w-full rounded-lg border border-neutral-200 py-2 text-center text-sm font-extrabold text-neutral-600 outline-none disabled:bg-neutral-100 disabled:text-neutral-400"
                                        >
                                            {citiesList.map((city) => {
                                                return (
                                                    <option key={city.id} value={city.name}>
                                                        {city.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="mb-4 flex w-full flex-col items-start justify-start px-3 lg:col-span-2">
                                        <label
                                            htmlFor="address"
                                            className="mb-1 pr-4 text-sm font-extrabold text-neutral-600"
                                        >
                                            آدرس دقیق محل:<span className="text-base text-orange-900">*</span>
                                        </label>
                                        <Field
                                            as="textarea"
                                            name="address"
                                            id="address"
                                            type="text"
                                            dir="rtl"
                                            rows="3"
                                            disabled={!selectedProvince}
                                            aria-autocomplete="none"
                                            autoComplete="off"
                                            style={
                                                errors.address && touched.address
                                                    ? { border: "1px solid #f43f5e", background: "#fff1f2" }
                                                    : null
                                            }
                                            className="w-full rounded-lg border bg-white px-4 py-2 text-start text-sm font-bold tracking-normal text-neutral-600 outline-none duration-200 hover:border-blue-300 focus:border-blue-300 focus:bg-white focus:shadow-xl focus:shadow-blue-500/20 disabled:bg-neutral-100"
                                        />
                                        <p className="mt-2 w-full text-center text-sm font-bold text-rose-500">
                                            <ErrorMessage name="address" />
                                        </p>
                                    </div>
                                    {!isDestination ? (
                                        <button
                                            type="submit"
                                            disabled={!isValid}
                                            className="flex w-full items-center justify-center bg-gradient-to-l from-blue-900 to-blue-400 pb-2.5 pt-3 text-center text-sm font-bold text-white shadow-xl shadow-blue-900/40 lg:col-span-2"
                                        >
                                            <LocationTick variant="Bold" className="mb-0.5 h-6 w-6" />
                                            افزودن آدرس
                                        </button>
                                    ) : (
                                        <div className="flex w-full justify-center">
                                            <div className="lds-ellipsis">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        </div>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </section>
                </div>
            )}
        </>
    );
};

export default DestinationForm;
