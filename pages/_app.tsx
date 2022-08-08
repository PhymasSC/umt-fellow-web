import { AppProps } from "next/app";
import Head from "next/head";
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
	AppShell,
} from "@mantine/core";
import { IHeader, IFooter } from "../components";
import React from "react";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
	const { Component, pageProps } = props;
	const [colorScheme, setColorScheme] = React.useState<ColorScheme>(
		props.colorScheme
	);

	const toggleColorScheme = (value?: ColorScheme) => {
		const color = value || (colorScheme === "dark" ? "light" : "dark");
		setColorScheme(value || color);
		console.log(color);
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
						/** Put your mantine theme override here */
						colorScheme: colorScheme,
						primaryColor: "orange",
						defaultRadius: "md",
					}}
				>
					<AppShell
						header={
							<IHeader
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
						footer={<IFooter />}
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
