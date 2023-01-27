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
	Avatar,
	Tooltip,
	Box,
} from "@mantine/core";
import { Authentication, ThemeToggler } from "./../index";
import { useDisclosure } from "@mantine/hooks";
import { useStyles, HEADER_HEIGHT } from "./Header.style";
import { APP_LOGO } from "@constants/metadata";
import { signOut, useSession } from "next-auth/react";
import {
	IconChevronDown,
	IconLogout,
	IconMoon,
	IconSettings,
	IconSun,
	IconTrash,
	IconUser,
} from "@tabler/icons";

interface HeaderResponsiveProps {
	links: { link: string; label: string; icon: any }[];
}

const UFHeader = ({ links }: HeaderResponsiveProps) => {
	const theme = useMantineTheme();
	const { data: session } = useSession();
	console.log(session);
	const [opened, { toggle, close }] = useDisclosure(false);
	const [active, setActive] = useState(links[0].link);
	const [modalOpened, setModalOpened] = useState(false);
	const { classes, cx } = useStyles();
	const closeModal = () => {
		setModalOpened(false);
	};

	const items = links.map((link) => (
		<>
			<Tooltip key={link.label} label={link.label} withArrow>
				<Box>
					<Link key={link.label} href={link.link} passHref>
						<Button
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
							{link?.icon}
						</Button>
					</Link>
				</Box>
			</Tooltip>
		</>
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
							<Title
								size="h3"
								onClick={() => {
									setActive("/");
									close();
								}}
							>
								UMT Fellow
							</Title>
						</MediaQuery>
					</Paper>
				</Link>

				<Group spacing={5} className={classes.links}>
					{session && (
						<>
							{items}
							<Space w="xs" />
							<Menu
								shadow="md"
								transitionDuration={200}
								trigger="hover"
							>
								<Menu.Target>
									<Group
										spacing={10}
										sx={(theme) => ({
											padding: ".5em 1em",
											borderRadius: ".5em",
											"&:hover": {
												cursor: "pointer",
												backgroundColor:
													theme.colorScheme === "dark"
														? theme.colors.dark[5]
														: theme.colors.gray[1],
											},
											border: "1px solid gray",
										})}
										className={cx({
											[classes.linkActive]:
												active === "/profile",
										})}
									>
										<Avatar
											src={session.user?.image?.toString()}
											alt={session.user?.name || "User"}
											radius="xl"
											size="sm"
											sx={{
												"&:hover": {
													cursor: "pointer",
												},
											}}
										/>
										{session.user?.name}
										<IconChevronDown size={15} />
									</Group>
								</Menu.Target>
								<Menu.Dropdown>
									<Menu.Label>Application</Menu.Label>
									<Link
										href={`/profile/${session.user?.id}`}
										passHref
									>
										<Menu.Item
											icon={<IconUser size={14} />}
											component="a"
											onClick={() => {
												setActive("/profile");
												close();
											}}
										>
											Profile
										</Menu.Item>
									</Link>
									<Link
										href={`/setting/${session.user?.id}`}
										passHref
									>
										<Menu.Item
											icon={<IconSettings size={14} />}
											component="a"
											onClick={() => {
												setActive("/profile");
												close();
											}}
										>
											Settings
										</Menu.Item>
									</Link>
									<Menu.Item
										icon={<IconLogout size={14} />}
										onClick={() => {
											signOut({ callbackUrl: "/login" });
										}}
									>
										Log Out
									</Menu.Item>
									<Menu.Divider />
									<Menu.Label>Personalize</Menu.Label>
									<Menu.Item
										icon={
											theme.colorScheme === "dark" ? (
												<IconMoon size={14} />
											) : (
												<IconSun size={14} />
											)
										}
										closeMenuOnClick={false}
									>
										<ThemeToggler compact />
									</Menu.Item>
									<Menu.Divider />
									<Menu.Label>Danger Zone</Menu.Label>
									<Menu.Item
										color="red"
										icon={
											<IconTrash size={14} stroke={1.5} />
										}
									>
										Delete Account
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
							{(!session && (
								<>
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
								</>
							)) || (
								<>
									<Link
										href={`/profile/${session?.user?.id}`}
										passHref
									>
										<Button
											component="a"
											variant="subtle"
											className={cx(classes.link, {
												[classes.linkActive]:
													active === "/profile",
											})}
											onClick={() => {
												setActive("/profile");
												close();
											}}
										>
											Profile
										</Button>
									</Link>
									<Link
										href={`/setting/${session?.user?.id}`}
										passHref
									>
										<Button
											component="a"
											variant="subtle"
											className={cx(classes.link, {
												[classes.linkActive]:
													active === "/setting",
											})}
											onClick={() => {
												setActive("/setting");
												close();
											}}
										>
											Settings
										</Button>
									</Link>
									<Button
										variant="subtle"
										className={classes.link}
										onClick={() => {
											signOut({ callbackUrl: "/login" });
										}}
									>
										Log Out
									</Button>
								</>
							)}
						</Paper>
					)}
				</Transition>
			</Container>
		</Header>
	);
};

export default UFHeader;
