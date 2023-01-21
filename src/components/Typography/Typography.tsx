import { Box, useMantineTheme } from "@mantine/core";
import React from "react";

type TypographyProps = {
	children: React.ReactNode;
};

const Typography = (props: TypographyProps) => {
	const { children } = props;
	const { colorScheme } = useMantineTheme();
	const dark = colorScheme === "dark";

	return (
		<Box
			sx={(theme) => ({
				"& > h2:nth-of-type(1)": {
					marginTop: 0,
				},
				"& h2": {
					fontWeight: 800,
					color: dark ? "#ffffff" : "#111827",
					margin: "3rem 0 1.5rem 0",
					fontSize: "1.4rem",
					lineHeight: 1.4,

					[theme.fn.largerThan("sm")]: {
						fontSize: "1.8rem",
					},
				},
				"& :is(h2+*)": {
					marginTop: 0,
				},
				"& h3": {
					fontWeight: 800,
					color: dark ? "#ffffff" : "#111827",
					marginTop: 35,
					marginBottom: 10,
					fontSize: "1.25rem",
					lineHeight: "1.75rem",

					[theme.fn.largerThan("sm")]: {
						fontSize: "1.5rem",
						lineHeight: "2rem",
					},
				},
				"& a": {
					color: dark ? theme.colors.blue[3] : theme.colors.blue[7],
					fontWeight: 500,
					touchAction: "manipulation",
					textDecoration: "none !important",
					borderBottom: "2px solid transparent",
					transition: "border-color 0.3s ease 0s, color 0.3s ease 0s",

					"&:hover": {
						borderBottomColor: theme.colors.blue[5],
					},
				},
				"& > p": {
					color: dark ? "#a1a1aa" : "#374151",
					fontSize: "1rem",
					lineHeight: 1.9,
					marginTop: "1.1428571em",
					marginBottom: "1.1428571em",
					letterSpacing: 0.3,

					[theme.fn.largerThan("sm")]: {
						fontSize: "1.125rem",
						lineHeight: "1.75rem",
						marginTop: "1.25em",
						marginBottom: "1.25em",
					},
				},
				"& :is(ol, ul)": {
					paddingLeft: "1.625em",
				},
				"& li": {
					paddingLeft: ".4285714em",
					marginTop: ".2857143em",
					marginBottom: ".2857143em",
					letterSpacing: 0.3,

					[theme.fn.largerThan("sm")]: {
						paddingLeft: "0.375em",
						marginTop: "0.5em",
						marginBottom: "0.5em",
					},
				},
				"& li::marker": {
					color: dark ? theme.colors.blue[3] : theme.colors.blue[7],
				},
				"& :is(h2, h3)": {
					position: "relative",
					scrollMarginTop: 128,
				},
				"& :is(h2,h3) > a": {
					width: "100%",
					position: "absolute",
					inset: 0,
					borderBottomColor: "transparent !important",

					"&:hover > svg": {
						visibility: "visible",
					},

					"& svg": {
						position: "absolute",
						visibility: "hidden",
						display: "block",
						fontWeight: 400,
						right: "100%",
						top: "50%",
						width: 28,
						height: 20,
						color: dark ? "#71717a" : "#a1a1aa",
						transform: "translateY(-50%)",
					},
				},
				"& figure": {
					margin: "24px 0",
				},
				"& figcaption": {
					color: dark ? "#a1a1aa" : "#374151",
					fontSize: "0.875rem",
					lineHeight: "1.25rem",
					marginTop: "0.7142857em",
					marginBottom: "0.7142857em",
					letterSpacing: 0.3,
					textAlign: "center",
				},
				"& img": {
					maxWidth: "100%",
					height: "auto",
				},
				"& hr": {
					border: "none",
					borderBottom: "1px solid #e2e8f0",
					marginTop: "2.1428571em",
					marginBottom: "2.1428571em",
				},
				"& iframe": {
					width: "100%",
					border: "none",
					borderRadius: ".3em",
				},
			})}
		>
			{children}
		</Box>
	);
};

export default Typography;
