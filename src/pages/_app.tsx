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
import { useState } from "react";
import { APP_NAME } from "@/constants/metadata";
import { PRIMARY_COLOR, PRIMARY_COLOR_SHADE } from "@/constants/colors";
import { LINKS } from "@/constants/pages";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { Notifications } from "@mantine/notifications";
import { configureAbly } from "@ably-labs/react-hooks";
import { DefaultSeo } from "next-seo";
import { Header } from "@/components/header";
import SEOConfig from "./../constants/next-seo.config";
import "./../styles/global.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
const prefix = process.env.API_ROOT || "";
const clientId =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

configureAbly({
  authUrl: `${prefix}/api/createTokenRequest?clientId=${clientId}`,
  clientId: clientId,
});

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const router = useRouter();
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
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
      <DefaultSeo {...SEOConfig} />

      <SessionProvider
        //@ts-ignore
        session={pageProps?.session}
      >
        <ApolloProvider client={client}>
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
                header={<Header links={LINKS} />}
                sx={(theme) => ({
                  main: {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[8]
                        : theme.colors.gray[0],
                    padding:
                      router.pathname === "/register" ||
                      router.pathname === "/login" ||
                      router.pathname === "/reset-password" ||
                      router.pathname === "/forgot-password"
                        ? "0em"
                        : "md",
                    [theme.fn.smallerThan("sm")]: {
                      paddingLeft: "0",
                      paddingRight: "0",
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
                    "input:-webkit-autofill, input:-webkit-autofill:focus": {
                      transition:
                        "background-color 600000s 0s, color 600000s 0s",
                    },
                  })}
                />
                <main className={inter.className}>
                  <Notifications />
                  <Component {...pageProps} />
                </main>
              </AppShell>
            </MantineProvider>
          </ColorSchemeProvider>
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("color-scheme", ctx) || "light",
});
