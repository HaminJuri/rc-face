"use client";

import GetCategoryName from "@/hooks/GetCategoryName";

const CategoryName = ({ category }) => {
    const getCategoryName = GetCategoryName();
    const { categoryName } = getCategoryName[category] || {};
    return (
        <li className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-bold text-neutral-600">
            <p className="font-medium">نوع محصول:</p>
            <p>{categoryName}</p>
        </li>
    );
};

export default CategoryName;
