/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Navy - Primary Brand Color
                navy: {
                    50: '#f0f4fb',
                    100: '#dce5f5',
                    200: '#c2d4ed',
                    300: '#9ab9e2',
                    400: '#6b96d4',
                    500: '#4876c8',
                    600: '#3559b1',
                    700: '#26468a',
                    800: '#1c3a74',
                    900: '#0b162f',
                },
                // Yellow - Accent Brand Color
                yellow: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#ffd13f',
                    400: '#ffc700',
                    500: '#eab308',
                    600: '#ca8a04',
                    700: '#a16207',
                    800: '#854d0e',
                    900: '#713f12',
                },
                // Legacy colors for backward compatibility
                primary: {
                    900: '#0b162f',
                    800: '#1c3a74',
                    700: '#26468a',
                    600: '#3559b1',
                    500: '#4876c8',
                },
                accent: {
                    green: {
                        500: '#10b981',
                        600: '#059669',
                    },
                },
            },
            fontFamily: {
                sans: ['Avenir', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                avenir: ['Avenir', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-navy-yellow': 'linear-gradient(135deg, #1C3A74 0%, #FFC700 100%)',
                'gradient-dark': 'linear-gradient(180deg, #0B162F 0%, #1C3A74 100%)',
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 3s infinite',
                'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
                'scale-in': 'scaleIn 0.5s ease-out forwards',
                'marquee': 'marquee 40s linear infinite',
            },
        },
    },
    plugins: [],
}
