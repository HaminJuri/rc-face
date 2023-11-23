//! Template
import { TickCircle, ArrowCircleLeft, RecordCircle } from "iconsax-react";

//! INITIALIZE
const steps = [
    { id: 1, text: "1. در انتظار تایید" },
    { id: 2, text: "2. در حال پردازش" },
    { id: 3, text: "3. ارسال مرسوله" },
    { id: 4, text: "4. تحویل به مشتری" },
];

const TheStepper = ({ activeStep = 1 }) => {
    const renderClassName = (step) => {
        if (step > activeStep) return "order-future-step";
        if (step < activeStep) return "order-past-step";
        if (step === activeStep) return "order-active-step";
    };
    const renderIcon = (step) => {
        if (step > activeStep) return <RecordCircle variant="Bold" className="h-8 w-8" />;
        if (step < activeStep) return <TickCircle variant="Bold" className="h-8 w-8" />;
        if (step === activeStep) return <ArrowCircleLeft variant="Bold" className="h-8 w-8" />;
    };
    return (
        <header className="flex flex-col items-start justify-start gap-5 border-b-2 border-dotted border-orange-500 py-5 text-base font-bold md:flex-row md:pb-10">
            {steps.map((step) => (
                <h4 key={step.id} className={renderClassName(step.id)}>
                    {renderIcon(step.id)}
                    {step.text}
                    <div className="line"></div>
                </h4>
            ))}
        </header>
    );
};

export default TheStepper;
