/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme("colors.foreground"),
                        a: {
                            color: theme("colors.primary.DEFAULT"),
                            "&:hover": {
                                color: theme("colors.primary.DEFAULT"),
                            },
                        },
                        h1: {
                            color: theme("colors.foreground"),
                        },
                        h2: {
                            color: theme("colors.foreground"),
                        },
                        h3: {
                            color: theme("colors.foreground"),
                        },
                        h4: {
                            color: theme("colors.foreground"),
                        },
                        h5: {
                            color: theme("colors.foreground"),
                        },
                        h6: {
                            color: theme("colors.foreground"),
                        },
                        strong: {
                            color: theme("colors.foreground"),
                        },
                        blockquote: {
                            color: theme("colors.foreground"),
                        },
                        code: {
                            color: theme("colors.foreground"),
                        },
                        pre: {
                            color: theme("colors.foreground"),
                        },
                        figcaption: {
                            color: theme("colors.foreground"),
                        },
                        hr: {
                            borderColor: theme("colors.border"),
                        },
                    },
                },
            }),
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "border-beam": {
                    "100%": {
                        "offset-distance": "100%",
                    },
                },
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "shine-pulse": {
                    "0%": {
                        "background-position": "0% 0%",
                    },
                    "50%": {
                        "background-position": "100% 100%",
                    },
                    to: {
                        "background-position": "0% 0%",
                    },
                },
                meteor: {
                    "0%": {
                        transform: "rotate(215deg) translateX(0)",
                        opacity: 1,
                    },
                    "70%": { opacity: 1 },
                    "100%": {
                        transform: "rotate(215deg) translateX(-500px)",
                        opacity: 0,
                    },
                },
                shimmer: {
                    "0%, 90%, 100%": {
                        "background-position":
                            "calc(-100% - var(--shimmer-width)) 0",
                    },
                    "30%, 60%": {
                        "background-position":
                            "calc(100% + var(--shimmer-width)) 0",
                    },
                },
                marquee: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(calc(-100% - var(--gap)))" },
                },
                "marquee-vertical": {
                    from: { transform: "translateY(0)" },
                    to: { transform: "translateY(calc(-100% - var(--gap)))" },
                },
            },
            animation: {
                marquee: "marquee var(--duration) linear infinite",
                "marquee-vertical":
                    "marquee-vertical var(--duration) linear infinite",
                shimmer: "shimmer 8s infinite",
                meteor: "meteor 5s linear infinite",
                "border-beam":
                    "border-beam calc(var(--duration)*1s) infinite linear",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
