import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
	fontSize: {
		xs: ['12px', '18px'],
		sm: ['14px', '20px'],
		base: ['16px', '24px'],
		md: ['18px', '26px'],
		lg: ['20px', '28px'],
		xl: ['24px', '32px'],
	},
	borderRadius: {
		'none': '0',
		'sm': '2px',
		DEFAULT: '4px',
		'md': '6px',
		'lg': '10px',
		'full': '9999px',
		'large': '12px',
		'half': '50px',
	},
	maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '5/6': '83.333333%',
        '7/8': '87.5%',
		'1/3':'30%',
		'2/3':'70%',
		'full':'100%'
      },
  },
  plugins: [],
};
export default config;
