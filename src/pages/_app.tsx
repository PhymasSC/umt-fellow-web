import { AppProps } from "next/app";
import Head from "next/head";
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
	AppShell,
} from "@mantine/core";
import { getCookie, setCookies } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { Header, Footer } from "@components/index";
import { useState } from "react";
import { APP_NAME } from "@constants/metadata";
import { PRIMARY_COLOR, PRIMARY_COLOR_SHADE } from "@constants/colors";
import { LINKS } from "@constants/pages";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
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
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
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
						header={<Header links={LINKS} />}
						footer={<Footer />}
						sx={(theme) => ({
							main: {
								backgroundColor:
									theme.colorScheme === "dark"
										? theme.colors.dark[8]
										: theme.colors[PRIMARY_COLOR][0],
								padding: "1.5em",
								[theme.fn.smallerThan("sm")]: {
									paddingLeft: "0",
									paddingRight: "0",
								},
							},
						})}
					>
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
