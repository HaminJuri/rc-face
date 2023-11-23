"use client";
import OTPInput from "react-otp-input";

//! Template
const FormOtp = ({ goBack, otp, setOtp, SUBMIT_CODE, isSubmittingCode, phoneNumber }) => {
    return (
        <form onSubmit={SUBMIT_CODE}>
            <div className="mb-5 flex w-full flex-col">
                <header className="flex flex-col items-start justify-center">
                    <button
                        onClick={goBack}
                        type="button"
                        className="mb-4 flex items-center justify-start text-xs font-bold text-neutral-500"
                    >
                        <i className="ri-arrow-right-s-line -ml-0.5 pb-0.5 text-lg font-medium"></i>
                        بازگشت
                    </button>
                    <p className="pr-1 text-[0.7rem] font-bold tracking-tighter text-neutral-500">
                        کد به شماره <span className="text-xs tracking-wider text-orange-900">{phoneNumber}</span> ارسال
                        گردید
                    </p>
                    <label htmlFor="code" className="mb-2 pr-1 text-sm font-bold tracking-tight text-neutral-600">
                        لطفا کد پیامک شــــــده را وارد کنید:
                    </label>
                </header>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    containerStyle="flex w-full flex-row-reverse justify-between items-center text-base font-bold text-neutral-600"
                    inputStyle={{
                        width: "2.5rem",
                        padding: "0.55rem 0.2rem 0.4rem",
                        border: "1px solid #d4d4d4",
                        borderRadius: "0.5rem",
                        transition: "all 200ms ease",
                    }}
                    renderInput={(props) => (
                        <div className="input-container-otp">
                            <input {...props} inputMode="numeric" />
                        </div>
                    )}
                />
            </div>
            {!isSubmittingCode ? (
                <button
                    type="submit"
                    disabled={otp.length !== 6}
                    className="w-full rounded-lg bg-gradient-to-l from-orange-900 to-orange-400 py-3 text-center text-sm font-bold text-white shadow-xl shadow-orange-900/40"
                >
                    تایید شماره موبایل
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
        </form>
    );
};

export default FormOtp;
