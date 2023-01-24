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
import { Header } from "@components/index";
import { useState } from "react";
import { APP_NAME } from "@constants/metadata";
import { PRIMARY_COLOR, PRIMARY_COLOR_SHADE } from "@constants/colors";
import { LINKS } from "@constants/pages";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@lib/apollo-client";
import { NotificationsProvider } from "@mantine/notifications";
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
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<meta
					name="description"
					content="UMT Fellow is a social forum built for University Malaysia Terengganu. "
				/>

				<meta
					property="og:url"
					content="https://www.umtfellow.social/"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:title" content="UMT Fellow" />
				<meta
					property="og:description"
					content="UMT Fellow is a social forum built for University Malaysia Terengganu. "
				/>
				<meta
					property="og:image"
					content="https://www.umtfellow.social/logo.png"
				/>

				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="umtfellow.social" />
				<meta
					property="twitter:url"
					content="https://www.umtfellow.social/"
				/>
				<meta name="twitter:title" content="UMT Fellow" />
				<meta
					name="twitter:description"
					content="UMT Fellow is a social forum built for University Malaysia Terengganu. "
				/>
				<meta
					name="twitter:image"
					content="https://www.umtfellow.social/logo.png"
				/>
			</Head>

			<SessionProvider
				//@ts-ignore
				session={pageProps?.session}
			>
				<ApolloProvider client={client}>
					<Head>
						<title>{APP_NAME}</title>
					</Head>
					<NotificationsProvider
						position="top-right"
						zIndex={99999}
						limit={5}
					>
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
									// header={
									// 	router.pathname === "/register" ||
									// 	router.pathname === "/login" ? (
									// 		<></>
									// 	) : (
									// 		<Header links={LINKS} />
									// 	)
									// }
									sx={(theme) => ({
										main: {
											backgroundColor:
												theme.colorScheme === "dark"
													? theme.colors.dark[8]
													: theme.colors.gray[0],
											padding:
												router.pathname ===
													"/register" ||
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
												background:
													PRIMARY_COLOR_SHADE[1],
												color: PRIMARY_COLOR_SHADE[7],
											},
											"::-webkit-scrollbar": {
												width: 7,
												height: 5,
											},
											"::-webkit-scrollbar-thumb": {
												background:
													PRIMARY_COLOR_SHADE[6],
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
					</NotificationsProvider>
				</ApolloProvider>
			</SessionProvider>
		</>
	);
}

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
	colorScheme: getCookie("color-scheme", ctx) || "light",
});
