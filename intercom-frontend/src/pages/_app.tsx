import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ThemeProvider } from "./theme-provider";
import { createTheme, MantineProvider } from '@mantine/core';



export default function App({ Component, pageProps }: AppProps) {
  return (
	<MantineProvider >
		<Component {...pageProps} />
	</MantineProvider>
  )
		

}
