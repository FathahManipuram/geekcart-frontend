import plugin from "eslint-plugin-react-hooks";

export default {
	content: ["./index.html", "./src/**/*.{js.jsx}"],
	theme:{
		extend:{
			colors:{
				 primary: {
          50: "#f8f2ed",
          100: "#f4ebe4",
          200: "#e8d6c8",
          400: "#b57c4e",
          500: "#a37046",
          600: "#91633e",
          700: "#885d3b",
          800: "#6d4a2f",
          900: "#3f2b1b",
        },
        secondary: {
          50: "#fbf8f0",
          100: "#f9f4e9",
          200: "#f3e8d1",
          400: "#d8b56b",
          500: "#c2a360",
          600: "#ad9156",
          700: "#a28850",
          800: "#826d40",
          900: "#4c3f25",
        },
        brown: {
          100: "#efebea",
          300: "#cdc2bd",
          500: "#5d3a29",
          700: "#462c1f",
          900: "#21140e",
        },
        background: {
          50: "#fefdfb",
          100: "#fcf8f3",
          200: "#f6e7d7",
          300: "#ddd0c2",
          700: "#948b81",
          900: "#56514b",
        },
			}
		}
	},
	plugins: [
    require("tailwind-scrollbar"),
  ],
}