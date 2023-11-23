/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/components/**/*.jsx", "./src/app/**/*.jsx", "./src/common/**/*.jsx"],
    theme: {
        fontFamily: {
            sans: ["var(--font-yekan-bakh)"],
            serif: ["var(--font-roboto)"],
        },
        container: {
            center: true,
            screens: {
                xs: "448px",
                sm: "640px",
                md: "1024px",
                lg: "1180px",
                xl: "1180px",
                "2xl": "1180px",
            },
        },
        extend: {
            colors: {
                orange: {
                    900: "#FF4800",
                },
            },
            backgroundImage: {
                "half-light":
                    "linear-gradient(0deg,rgba(255,72,0,0)0%,rgba(255,72,0,0)35%,rgba(255,72,0,0.2)35%,rgba(255,72,0,0.2)50%,rgba(255,72,0,0)50%)",
                "half-light-2": "linear-gradient(0deg,rgba(255,72,0,0.2)35%,rgba(255,72,0,0.2)50%,rgba(255,72,0,0)50%)",
            },
            maxWidth: {
                "5/5xl": "73.75rem",
            },
        },
    },
    plugins: [],
};
