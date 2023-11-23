export const toCreditFormat = (str) => {
    if (str) {
        let part1 = str.substring(0, 4);
        let part2 = str.substring(4, 8);
        let part3 = str.substring(8, 12);
        let part4 = str.substring(12, 16);
        return `${part1}-${part2}-${part3}-${part4}`;
    }
};

export const toLandlineFormat = (str) => {
    if (str) {
        let part1 = str.substring(0, 3);
        let part2 = str.substring(3);
        return `${part1}-${part2}`;
    }
};

export const toPhoneFormat = (str) => {
    if (str) {
        let part1 = str.substring(0, 4);
        let part2 = str.substring(4, 7);
        let part3 = str.substring(7);
        return `${part1} ${part2} ${part3}`;
    }
};
