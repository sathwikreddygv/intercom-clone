import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ThemeProvider } from "./theme-provider";

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			{/* <ThemeSwitcher /> */}
	  		<Component {...pageProps} />
		</ThemeProvider>

}
