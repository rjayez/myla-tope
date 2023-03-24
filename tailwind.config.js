/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: {
                apparition: "apparition 2s linear infinite",
                apparitionDesktop: "apparitionDesktop 2s linear infinite"
            },
            fontFamily: {
                LondonBoutique:["London_Boutique", "helvetica"],
                CreamCake:["CreamCake", "helvetica"],
                KiwiDay:["KiwiDays", "helvetica"]
            }
        },
        plugins: [],
    }
}
