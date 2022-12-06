import { AppProps } from "next/app";
import Head from "next/head";
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
	AppShell,
	Global,
} from "@mantine/core";
import { useRouter } from "next/router";
import { getCookie, setCookies } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { Header, Footer } from "@components/index";
import { useState } from "react";
import { APP_NAME } from "@constants/metadata";
import { PRIMARY_COLOR, PRIMARY_COLOR_SHADE } from "@constants/colors";
import { LINKS } from "@constants/pages";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
	const router = useRouter();
	const { Component, pageProps } = props;
	const [colorScheme, setColorScheme] = useState<ColorScheme>(
		props.colorScheme
	);
	const toggleColorScheme = (value?: ColorScheme) => {
		console.log(colorScheme);
		const color = value || (colorScheme === "dark" ? "light" : "dark");
		setColorScheme(value || color);
		setCookies("color-scheme", color, {
			maxAge: 60 * 60 * 24 * 30,
		});
	};
	return (
		<>
			<Head>
				<title>{APP_NAME}</title>
			</Head>

			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						colorScheme: colorScheme,
						primaryColor: PRIMARY_COLOR,
						headings: {
							fontFamily: "Montserrat, sans-serif",
						},
						colors: {
							// @ts-ignore
							[PRIMARY_COLOR]: PRIMARY_COLOR_SHADE,
						},
						defaultRadius: "md",
					}}
				>
					<AppShell
						fixed
						header={
							router.pathname === "/register" ||
							router.pathname === "/login" ? (
								<></>
							) : (
								<Header links={LINKS} />
							)
						}
						sx={(theme) => ({
							main: {
								backgroundColor:
									theme.colorScheme === "dark"
										? theme.colors.dark[8]
										: theme.colors[PRIMARY_COLOR][0],
								padding:
									router.pathname === "/register" ||
									router.pathname === "/login"
										? "0em"
										: "1.5em",

								[theme.fn.smallerThan("sm")]: {
									padding: "0",
								},
							},
						})}
					>
						<Global
							styles={() => ({
								html: {
									scrollBehavior: "smooth",
								},
								"::selection": {
									background: PRIMARY_COLOR_SHADE[1],
									color: PRIMARY_COLOR_SHADE[7],
								},
								"::-webkit-scrollbar": {
									width: 7,
									height: 5,
								},
								"::-webkit-scrollbar-thumb": {
									background: PRIMARY_COLOR_SHADE[6],
									transition: "0.25s",
									borderRadius: 2,
								},
								"::-webkit-scrollbar-track": {
									background: "0 0",
								},
								"input:-webkit-autofill, input:-webkit-autofill:focus":
									{
										transition:
											"background-color 600000s 0s, color 600000s 0s",
									},
							})}
						/>
						<Component {...pageProps} />
					</AppShell>
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
}

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
	colorScheme: getCookie("color-scheme", ctx) || "light",
});
