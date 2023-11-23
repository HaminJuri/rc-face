export const getCategoryName = (num) => {
    switch (+num) {
        case 1000:
            return "انواع روغن";
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
        case 1008:
            return "گریس";
        case 2000:
            return "انواع فیلتر";
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
