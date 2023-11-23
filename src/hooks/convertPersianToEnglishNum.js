const convertPersianToEnglishNumber = (persianNum) => {
    return persianNum.replace(/[۰-۹]/g, function (d) {
        return "۰۱۲۳۴۵۶۷۸۹".indexOf(d);
    });
};

export default convertPersianToEnglishNumber;
