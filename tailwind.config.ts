import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    darkMode: "class",
    plugins: [
        nextui({
            themes: {
                dark: {
                    colors: {
                        background: "#693570",
                        foreground: "#693570",
                        primary: "#693570",
                    },
                },
                "purple-theme": {
                    extend: "dark",
                    colors: {
                        black: "#000000",
                        background: {
                            "50": "#f9f0fd",
                            "100": "#f5e5fa",
                            "200": "#eccff6",
                            "300": "#e1b2ef",
                            "400": "#da92e7",
                            "500": "#d478dc",
                            "600": "#ce5dce",
                            "700": "#b54db4",
                            "800": "#924192",
                            "900": "#733a75",
                            "950": "#160b16",
                            DEFAULT: "#160b16",
                        },
                        foreground: {
                            "50": "#18181b",
                            "100": "#27272a",
                            "200": "#3f3f46",
                            "300": "#52525b",
                            "400": "#71717a",
                            "500": "#a1a1aa",
                            "600": "#d4d4d8",
                            "700": "#e4e4e7",
                            "800": "#f4f4f5",
                            "900": "#fafafa",
                            DEFAULT: "#ECEDEE",
                        },
                        primary: {
                            "50": "#f9f5ff",
                            "100": "#f1e8ff",
                            "200": "#e5d5ff",
                            "300": "#d1b4fe",
                            "400": "#b584fc",
                            "500": "#9955f7",
                            "600": "#8233ea",
                            "700": "#6e22ce",
                            "800": "#5e21a8",
                            "900": "#4b1b82",
                            "950": "#320764",
                            DEFAULT: "#4B1B82",
                            foreground: "#f2dede",
                        },
                        accent: {
                            "50": "#fdf3f3",
                            "100": "#fce4e4",
                            "200": "#facece",
                            "300": "#f6abab",
                            "400": "#ee7b7b",
                            "500": "#e25151",
                            "600": "#ce3434",
                            "700": "#ad2828",
                            "800": "#9a2727",
                            "900": "#782424",
                            DEFAULT: "#9a2727",
                            foreground: "#000",
                        },
                    },
                },
            },
        }),
    ],
};
export default config;
