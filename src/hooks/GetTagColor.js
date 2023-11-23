import { useState, useEffect } from "react";
import useCategoryListColor from "@/components/useCategoryListColor";

const GetTagColor = () => {
    const { data: CATEGORIES, isSuccess: fetchedCategories } = useCategoryListColor();
    const [tagColor, setTagColor] = useState({});

    useEffect(() => {
        const mappings =
            !!fetchedCategories &&
            CATEGORIES.reduce((acc, curr) => {
                acc[curr.value] = { hexColor: curr.hexColor, hexBg: curr.hexBg };
                return acc;
            }, {});
        setTagColor(mappings);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CATEGORIES]);

    return tagColor;
};

export default GetTagColor;
