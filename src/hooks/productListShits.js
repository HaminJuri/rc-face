export default function productTypeShits() {
  const onlyShowList = () => {
    return [
      { value: "2", label: "فقط محصولات موجود" },
      { value: "1", label: "فقط محصولات تخفیف‌دار" },
    ];
  };

  const productTypeList = () => {
    return [
      { value: "1001", label: "روغن موتور", type: 1 },
      { value: "1002", label: "روغن گیربکس", type: 1 },
      { value: "1003", label: "روغن ترمز", type: 1 },
      { value: "1004", label: "روغن هیدرولیک", type: 1 },
      { value: "1005", label: "مکمل سوخت", type: 1 },
      { value: "1006", label: "ضد یخ و آب رادیاتور", type: 1 },
      { value: "1008", label: "فیلتر هوای موتور", type: 2 },
      { value: "1009", label: "فیلتر سوخت", type: 2 },
      { value: "1010", label: "فیلتر روغن", type: 2 },
      { value: "1011", label: "فیلتر هوای کابین", type: 2 },
    ];
  };

  return { onlyShowList, productTypeList };
}
