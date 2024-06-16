import "./../styles/global.css";
import { ThemeProvider } from "next-themes";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { LINKS } from "@/constants/pages";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black min-h-dvh">
        <ThemeProvider attribute="class">
          <Header links={LINKS} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
