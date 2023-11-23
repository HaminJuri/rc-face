const NormalizeInput = (str) => {
    if (typeof str === "string") {
        // Trim the string
        let normalized = str.trim();

        // Replace multiple spaces with a single space
        normalized = normalized.replace(/\s+/g, " ");

        // Convert all characters to lowercase
        normalized = normalized.toLowerCase();

        return normalized;
    } else if (typeof str === "number") {
        return str;
    }
};

export default NormalizeInput;
