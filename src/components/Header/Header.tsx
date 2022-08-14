import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Header,
	Container,
	Group,
	Burger,
	Paper,
	Transition,
	Button,
	Divider,
	Modal,
	useMantineTheme,
} from "@mantine/core";
import { Authentication, ThemeToggler } from "./../index";
import { useDisclosure } from "@mantine/hooks";
import { useStyles, HEADER_HEIGHT } from "./Header.style";

interface HeaderResponsiveProps {
	links: { link: string; label: string }[];
}

const UFHeader = ({ links }: HeaderResponsiveProps) => {
	const theme = useMantineTheme();
	const [opened, { toggle, close }] = useDisclosure(false);
	const [active, setActive] = useState(links[0].link);
	const [modalOpened, setModalOpened] = useState(false);
	const { classes, cx } = useStyles();

	const closeModal = () => {
		setModalOpened(false);
	};

	const items = links.map((link) => (
		<Link key={link.label} href={link.link} passHref>
			<Button<"a">
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
		<Header className={classes.root} height={HEADER_HEIGHT} fixed>
			<Container className={classes.header} fluid>
				{/* Modal */}
				<Modal
					centered
					overlayColor={
						theme.colorScheme === "dark"
							? theme.colors.dark[9]
							: theme.colors.gray[2]
					}
					overlayOpacity={0.55}
					overlayBlur={3}
					opened={modalOpened}
					onClose={closeModal}
					closeOnEscape
					withCloseButton={false}
				>
					<Authentication />
				</Modal>

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

export default UFHeader;
