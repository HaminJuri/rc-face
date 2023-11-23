"use client";
import { useState, useEffect } from "react";
import useCategoryListColor from "@/components/useCategoryListColor";

const GetCategoryName = () => {
    const { data: CATEGORIES, isSuccess: fetchedCategories } = useCategoryListColor();
    const [categoryName, setCategoryName] = useState({});

    useEffect(() => {
        const mappings =
            !!fetchedCategories &&
            CATEGORIES.reduce((acc, curr) => {
                acc[curr.value] = { categoryName: curr.field1 };
                return acc;
            }, {});
        setCategoryName(mappings);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CATEGORIES]);

    return categoryName;
};

export default GetCategoryName;
