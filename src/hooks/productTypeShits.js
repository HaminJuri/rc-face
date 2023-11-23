export const getProductType = (num) => {
    switch (num) {
        case 1000:
            return "روغن";
        case 1001:
            return "روغن موتور";
        case 1002:
            return "روغن گیربکس";
        case 1003:
            return "روغن ترمز";
        case 1004:
            return "روغن هیدرولیک";
        case 1005:
            return "مکمل سوخت";
        case 1006:
            return "ضدیخ/ضدجوش";
        case 1007:
            return "آب رادیاتور";
        case 2000:
            return "فیلتر";
        case 2001:
            return "فیلتر هوای موتور";
        case 2002:
            return "فیلتر سوخت";
        case 2003:
            return "فیلتر روغن";
        case 2004:
            return "فیلتر هوای کابین";
        default:
            return num;
    }
};
export const getPackagingType = (num) => {
    switch (num) {
        case 1: {
            return "پلاستیکی";
        }
        case 2: {
            return "فلزی";
        }
        case 3: {
            return "کوارت";
        }
        case 4: {
            return "گالن";
        }
        case 5: {
            return "سطل";
        }
    }
};
export const getSelectedOnly = (num) => {
    switch (num) {
        case 1: {
            return "فقط محصولات موجود";
        }
        case 2: {
            return "فقط محصولات تخفیف‌دار";
        }
    }
};

export const getTagColor = (num) => {
    switch (num) {
        case 1001:
            return "#FF4800";
        case 1002:
            return "#C2410C";
        case 1003:
            return "#D97706";
        case 1004:
            return "#7C3AED";
        case 1005:
            return "#374151";
        case 1006:
            return "#2563EB";
        case 1007:
            return "#ffffff"; // no color
        case 1008:
            return "#EA580C";
        case 1009:
            return "#525252";
        case 1010:
            return "#FF4800";
        case 1011:
            return "#0891B2";
        default:
            return num;
    }
};

export const getTagBackground = (num) => {
    switch (num) {
        case 1001:
            return "#FED5BA";
        case 1002:
            return "#F3D9CE";
        case 1003:
            return "#FDE68A";
        case 1004:
            return "#DDD6FE";
        case 1005:
            return "#D1D5DB";
        case 1006:
            return "#BFDBFE";
        case 1007:
            return "#ffffff"; // no color
        case 1008:
            return "#F2CEBB";
        case 1009:
            return "#E5E5E5";
        case 1010:
            return "#FED5BA";
        case 1011:
            return "#A5F3FC";
        default:
            return num;
    }
};
