export default function getOrderActiveStep(step) {
    switch (+step) {
        case 1: {
            return "در انتظار تایید";
        }
        case 2: {
            return "در حال پردازش";
        }
        case 3: {
            return "در حال ارسال";
        }
        case 4: {
            return "تحویل شده";
        }
        default: {
            return "درج نشده";
        }
    }
}
