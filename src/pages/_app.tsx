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
import { Header, Footer } from "./../components";
import React from "react";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
	const { Component, pageProps } = props;
	const [colorScheme, setColorScheme] = React.useState<ColorScheme>(
		props.colorScheme
	);

	const toggleColorScheme = (value?: ColorScheme) => {
		const color = value || (colorScheme === "dark" ? "light" : "dark");
		setColorScheme(value || color);
		setCookies("color-scheme", color, {
			maxAge: 60 * 60 * 24 * 30,
		});
	};
	return (
		<>
			<Head>
				<title>UMT Fellow</title>
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
						primaryColor: "orange",
						defaultRadius: "md",
					}}
				>
					<AppShell
						fixed
						header={
							<Header
								links={[
									{ link: "/", label: "Home" },
									{ link: "/explore", label: "Explore" },
									{
										link: "/notification",
										label: "Notification",
									},
									{
										link: "/profile/[:id]",
										label: "Profile",
									},
								]}
							/>
						}
						footer={<Footer />}
						styles={(theme) => ({
							main: {
								backgroundColor:
									theme.colorScheme === "dark"
										? theme.colors.dark[8]
										: theme.colors.orange[0],
								padding: "1.5em",
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
