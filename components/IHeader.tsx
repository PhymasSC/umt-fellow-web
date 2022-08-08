import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	createStyles,
	Header,
	Container,
	Group,
	Burger,
	Paper,
	Transition,
	Button,
	Menu,
	Divider,
} from "@mantine/core";
import { IAuth, ThemeToggler } from "./index";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
	root: {
		position: "relative",
		zIndex: 1,
	},

	logo: {
		cursor: "pointer",
		[theme.fn.smallerThan("sm")]: {
			marginLeft: "auto",
			marginRight: "auto",
		},
	},

	dropdown: {
		position: "absolute",
		top: HEADER_HEIGHT,
		left: 0,
		right: 0,
		zIndex: 99,
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopWidth: 0,
		overflow: "hidden",

		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
	},

	header: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		height: "100%",
	},

	links: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
		flexWrap: "nowrap",
	},

	burger: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
		position: "absolute",
		left: 20,
	},

	link: {
		display: "block",
		lineHeight: 1,
		padding: "8px 12px",
		textDecoration: "none",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},

		[theme.fn.smallerThan("sm")]: {
			borderRadius: 0,
			padding: theme.spacing.md,
			height: "100%",
			width: "100%",
		},
	},

	linkActive: {
		"&, &:hover": {
			backgroundColor: theme.fn.variant({
				variant: "light",
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({
				variant: "light",
				color: theme.primaryColor,
			}).color,
		},
	},

	toggler: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
		position: "absolute",
		right: 20,
	},
}));

interface HeaderResponsiveProps {
	links: { link: string; label: string }[];
}

const IHeader = ({ links }: HeaderResponsiveProps) => {
	const [opened, { toggle, close }] = useDisclosure(false);
	const [active, setActive] = useState(links[0].link);
	const [modalOpened, setModalOpened] = useState(false);
	const { classes, cx } = useStyles();

	const closeModal = () => {
		setModalOpened(false);
	};

	const items = links.map((link) => (
		<Link key={link.label} href={link.link} passHref>
			<Button
				key={link.label}
				variant="subtle"
				component="a"
				className={cx(classes.link, {
					[classes.linkActive]: active === link.link,
				})}
				onClick={(event: { preventDefault: () => void }) => {
					setActive(link.link);
					close();
				}}
			>
				{link.label}
			</Button>
		</Link>
	));

	return (
		<Header className={classes.root} height={HEADER_HEIGHT}>
			<Container className={classes.header}>
				{/* Modal */}
				<IAuth opened={modalOpened} onClose={closeModal}></IAuth>
				<Link href="/" passHref>
					<Paper className={classes.logo}>
						<Image
							src="/logo.png"
							alt="Logo"
							width={50}
							height={50}
							onClick={(event: {
								preventDefault: () => void;
							}) => {
								setActive("/");
								close();
							}}
						/>
					</Paper>
				</Link>

				<Group spacing={5} className={classes.links}>
					{items}
					<ThemeToggler />
					<Button
						onClick={() => {
							setModalOpened(true);
						}}
					>
						Get Started
					</Button>
				</Group>

				<Burger
					opened={opened}
					onClick={toggle}
					className={classes.burger}
					size="sm"
				/>

				<ThemeToggler className={classes.toggler} />

				<Transition
					transition="slide-down"
					duration={200}
					mounted={opened}
				>
					{(styles) => (
						<Paper
							className={classes.dropdown}
							withBorder
							style={styles}
						>
							{items}
							<Divider m="xs" />
							<Link href="/login" passHref>
								<Button
									component="a"
									variant="subtle"
									className={cx(classes.link, {
										[classes.linkActive]:
											active === "/login",
									})}
									onClick={(event: {
										preventDefault: () => void;
									}) => {
										setActive("/login");
										close();
									}}
								>
									Login
								</Button>
							</Link>
							<Link href="/register" passHref>
								<Button
									component="a"
									variant="subtle"
									className={cx(classes.link, {
										[classes.linkActive]:
											active === "/register",
									})}
									onClick={(event: {
										preventDefault: () => void;
									}) => {
										setActive("/register");
										close();
									}}
								>
									Register
								</Button>
							</Link>
						</Paper>
					)}
				</Transition>
			</Container>
		</Header>
	);
};

export default IHeader;
