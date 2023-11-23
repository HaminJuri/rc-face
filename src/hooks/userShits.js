export default function UserShits() {
    const getKnown = (num) => {
        switch (num) {
            case 1: {
                return "جستجو (مثلا گوگل)";
            }
            case 2: {
                return "به پیشنهاد دیگری (مثلا همکار)";
            }
            case 3: {
                return "شبکه های اجتماعی (مثلا اینستاگرام)";
            }
            case 4: {
                return "مشاهده تبلیغات";
            }
            default: {
                return "درج نشده";
            }
        }
    };
    return { getKnown };
}
