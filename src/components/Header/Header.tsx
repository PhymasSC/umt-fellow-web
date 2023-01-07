import Link from "next/link";
import { useState } from "react";
import {
	Header,
	Image,
	Container,
	Group,
	Burger,
	Paper,
	Transition,
	Button,
	Divider,
	Modal,
	useMantineTheme,
	Title,
	MediaQuery,
	Space,
	Menu,
} from "@mantine/core";
import { Authentication, ThemeToggler } from "./../index";
import { useDisclosure } from "@mantine/hooks";
import { useStyles, HEADER_HEIGHT } from "./Header.style";
import { APP_LOGO } from "@constants/metadata";
import { signOut, useSession } from "next-auth/react";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons";

interface HeaderResponsiveProps {
	links: { link: string; label: string }[];
}

const UFHeader = ({ links }: HeaderResponsiveProps) => {
	const theme = useMantineTheme();
	const { data: session } = useSession();
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
				onClick={() => {
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
			<Container px="xs" size="xl" className={classes.header}>
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
					<Authentication isModal />
				</Modal>

				<Link href="/" passHref>
					<Paper component="a" className={classes.logo}>
						<MediaQuery
							largerThan="sm"
							styles={{ display: "none" }}
						>
							<Image
								src={APP_LOGO}
								alt="Logo"
								width={32}
								height={32}
								onClick={() => {
									setActive("/");
									close();
								}}
							/>
						</MediaQuery>
						<MediaQuery
							smallerThan="sm"
							styles={{ display: "none" }}
						>
							<Title size="h3">UMT Fellow</Title>
						</MediaQuery>
					</Paper>
				</Link>

				<Group spacing={5} className={classes.links}>
					{session && (
						<>
							{items}
							<ThemeToggler />
							<Space w="xs" />
							<Menu trigger="hover" position="bottom-end">
								<Menu.Target>
									{/* <Link
										href={`/profile/${session.user?.name}`}
									> */}
									<Image
										src={session.user?.image.toString()}
										alt={session.user?.name || "User"}
										width={32}
										height={32}
										radius="xl"
										sx={{
											"&:hover": {
												cursor: "pointer",
											},
										}}
									/>
									{/* </Link> */}
								</Menu.Target>
								<Menu.Dropdown>
									<Menu.Item
										icon={<IconUser size={14} />}
										component="a"
										//@ts-ignore
										href={`/profile/${session.user?.id}`}
									>
										Profile
									</Menu.Item>
									<Menu.Item
										icon={<IconSettings size={14} />}
										component="a"
										//@ts-ignore
										href={`/setting/${session.user?.id}`}
									>
										Settings
									</Menu.Item>
									<Menu.Item
										icon={<IconLogout size={14} />}
										onClick={() => {
											signOut({ callbackUrl: "/login" });
										}}
									>
										Log Out
									</Menu.Item>
								</Menu.Dropdown>
							</Menu>
						</>
					)}
					{!session && (
						<>
							<ThemeToggler />
							<Space w="xs" />
							<Button
								onClick={() => {
									setModalOpened(true);
								}}
							>
								Get Started
							</Button>
						</>
					)}
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
									onClick={() => {
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
									onClick={() => {
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
