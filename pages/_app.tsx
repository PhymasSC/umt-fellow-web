import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { HeaderResponsive } from "../components/Header";

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	return (
		<>
			<Head>
				<title>UMT Fellow</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: "dark",
					primaryColor: "orange",
					defaultRadius: "md",
				}}
			>
				<HeaderResponsive
					links={[
						{ link: "/", label: "Home" },
						{ link: "/explore", label: "Explore" },
						{ link: "/notification", label: "Notification" },
						{ link: "/profile/[:id]", label: "Profile" },
					]}
				/>
				<Component {...pageProps} />
			</MantineProvider>
		</>
	);
}
