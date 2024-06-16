import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { APP_LOGO } from "@/constants/metadata";
interface HeaderResponsiveProps {
  links: { link: string; label: string; icon: any }[];
}

const Navigation = ({
  link,
  label,
  icon,
}: {
  link: string;
  label: string;
  icon: any;
}) => {
  return (
    <Link
      href="#"
      className="text-muted-foreground transition-colors hover:text-foreground"
    >
      {icon}
    </Link>
  );
};
const Header = ({ links }: HeaderResponsiveProps) => {
  // const theme = useMantineTheme();
  // const { data: session } = useSession();
  // const [opened, { toggle, close }] = useDisclosure(false);
  // const [active, setActive] = useState(links[0].link);
  // const [modalOpened, setModalOpened] = useState(false);
  // const { classes, cx } = useStyles();
  // const closeModal = () => {
  //   setModalOpened(false);
  // };

  // const items = links.map((link, index) => (
  //   <>
  //     <Tooltip key={index} label={link.label} withArrow>
  //       <Box>
  //         <Link href={link.link} passHref>
  //           <Button
  //             variant="subtle"
  //             component="a"
  //             className={cx(classes.link, {
  //               [classes.linkActive]: active === link.link,
  //             })}
  //             onClick={() => {
  //               setActive(link.link);
  //               close();
  //             }}
  //           >
  //             {link?.icon}
  //           </Button>
  //         </Link>
  //       </Box>
  //     </Tooltip>
  //   </>
  // ));

  return (
    // <div className={cn("bg-blue-300")}>Test</div>
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Link
        className="flex justify-center items-center gap-2"
        href="/"
        passHref
      >
        <Image
          src={APP_LOGO}
          alt="Logo"
          width={32}
          height={32}
          //  onClick={() => {
          //    setActive("/");
          //    close();
          //  }}
        />
        <span className="text-xl font-extrabold">UMT Fellow</span>
      </Link>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          {/* <Package2 className="h-6 w-6" /> */}
          <span className="sr-only">Acme Inc</span>
        </Link>
        {links.map((link, index) => (
          <Link
            href={link.link}
            className="text-muted-foreground hover:text-foreground"
            key={index}
          >
            {link.icon}
          </Link>
        ))}
      </nav>
    </header>
    // <H className={classes.root} height={HEADER_HEIGHT} fixed={true}>
    //   <Container px="xs" size="xl" className={classes.header}>
    //     {/* Modal */}
    //     <Modal
    //       centered
    //       overlayProps={{
    //         color:
    //           theme.colorScheme === "dark"
    //             ? theme.colors.dark[9]
    //             : theme.colors.gray[2],
    //         opacity: 0.55,
    //         blur: 3,
    //       }}
    //       opened={modalOpened}
    //       onClose={closeModal}
    //       closeOnEscape
    //       withCloseButton={false}
    //     >
    //       <Authentication isModal />
    //     </Modal>

    //     <Link href="/" passHref>
    //       <Box component="a" className={classes.logo}>
    //         <MediaQuery largerThan="sm" styles={{ display: "none" }}>
    //           <Image
    //             src={APP_LOGO}
    //             alt="Logo"
    //             width={32}
    //             height={32}
    //             onClick={() => {
    //               setActive("/");
    //               close();
    //             }}
    //           />
    //         </MediaQuery>
    //         <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
    //           <Title
    //             size="h3"
    //             onClick={() => {
    //               setActive("/");
    //               close();
    //             }}
    //           >
    //             UMT Fellow
    //           </Title>
    //         </MediaQuery>
    //       </Box>
    //     </Link>

    //     <Group spacing={5} className={classes.links}>
    //       {items}
    //       <ThemeToggler />

    //       {session && (
    //         <>
    //           <Space w="xs" />
    //           <Menu shadow="md" trigger="hover">
    //             <Menu.Target>
    //               <Group
    //                 spacing={10}
    //                 sx={(theme) => ({
    //                   padding: ".5em 1em",
    //                   borderRadius: ".5em",
    //                   "&:hover": {
    //                     cursor: "pointer",
    //                     backgroundColor:
    //                       theme.colorScheme === "dark"
    //                         ? theme.colors.dark[5]
    //                         : theme.colors.gray[1],
    //                   },
    //                   border: "1px solid gray",
    //                 })}
    //                 className={cx({
    //                   [classes.linkActive]: active === "/profile",
    //                 })}
    //               >
    //                 <Avatar
    //                   src={session.user?.image || ""}
    //                   alt={session.user?.name || "User"}
    //                   radius="xl"
    //                   size="sm"
    //                   sx={{
    //                     "&:hover": {
    //                       cursor: "pointer",
    //                     },
    //                   }}
    //                 />
    //                 {session.user?.name}
    //                 <IconChevronDown size={15} />
    //               </Group>
    //             </Menu.Target>
    //             <Menu.Dropdown>
    //               <Menu.Label>Application</Menu.Label>
    //               <Link href={`/profile/${session.user?.id}`} passHref>
    //                 <Menu.Item
    //                   icon={<IconUser size={14} />}
    //                   component="a"
    //                   onClick={() => {
    //                     setActive("/profile");
    //                     close();
    //                   }}
    //                 >
    //                   Profile
    //                 </Menu.Item>
    //               </Link>
    //               <Link href={`/setting`} passHref>
    //                 <Menu.Item
    //                   icon={<IconSettings size={14} />}
    //                   component="a"
    //                   onClick={() => {
    //                     setActive("/profile");
    //                     close();
    //                   }}
    //                 >
    //                   Settings
    //                 </Menu.Item>
    //               </Link>
    //               <Menu.Item
    //                 icon={<IconLogout size={14} />}
    //                 onClick={() => {
    //                   signOut({ callbackUrl: "/login" });
    //                 }}
    //               >
    //                 Log Out
    //               </Menu.Item>
    //               {/* <Menu.Divider />
    //               <Menu.Label>Personalize</Menu.Label>
    //               <Menu.Item
    //                 icon={
    //                   theme.colorScheme === "dark" ? (
    //                     <IconMoon size={14} />
    //                   ) : (
    //                     <IconSun size={14} />
    //                   )
    //                 }
    //                 closeMenuOnClick={false}
    //               >
    //                 <ThemeToggler compact />
    //               </Menu.Item> */}
    //               {/* <Menu.Divider />
    //               <Menu.Label>Danger Zone</Menu.Label>
    //               <Menu.Item
    //                 color="red"
    //                 icon={<IconTrash size={14} stroke={1.5} />}
    //               >
    //                 Delete Account
    //               </Menu.Item> */}
    //             </Menu.Dropdown>
    //           </Menu>
    //         </>
    //       )}
    //       {!session && (
    //         <>
    //           <Space w="xs" />
    //           <Button
    //             onClick={() => {
    //               setModalOpened(true);
    //             }}
    //           >
    //             Get Started
    //           </Button>
    //         </>
    //       )}
    //     </Group>
    //     <Burger
    //       opened={opened}
    //       onClick={toggle}
    //       className={classes.burger}
    //       size="sm"
    //     />

    //     <ThemeToggler className={classes.toggler} />

    //     <Transition transition="slide-down" duration={200} mounted={opened}>
    //       {(styles) => (
    //         <Paper className={classes.dropdown} withBorder style={styles}>
    //           {items}
    //           <Divider m="xs" />
    //           {(!session && (
    //             <>
    //               <Link href="/login" passHref>
    //                 <Button
    //                   component="a"
    //                   variant="subtle"
    //                   className={cx(classes.link, {
    //                     [classes.linkActive]: active === "/login",
    //                   })}
    //                   onClick={() => {
    //                     setActive("/login");
    //                     close();
    //                   }}
    //                 >
    //                   Login
    //                 </Button>
    //               </Link>
    //               <Link href="/register" passHref>
    //                 <Button
    //                   component="a"
    //                   variant="subtle"
    //                   className={cx(classes.link, {
    //                     [classes.linkActive]: active === "/register",
    //                   })}
    //                   onClick={() => {
    //                     setActive("/register");
    //                     close();
    //                   }}
    //                 >
    //                   Register
    //                 </Button>
    //               </Link>
    //             </>
    //           )) || (
    //             <>
    //               <Link href={`/profile/${session?.user?.id}`} passHref>
    //                 <Button
    //                   component="a"
    //                   variant="subtle"
    //                   className={cx(classes.link, {
    //                     [classes.linkActive]: active === "/profile",
    //                   })}
    //                   onClick={() => {
    //                     setActive("/profile");
    //                     close();
    //                   }}
    //                 >
    //                   Profile
    //                 </Button>
    //               </Link>
    //               <Link href={`/setting`} passHref>
    //                 <Button
    //                   component="a"
    //                   variant="subtle"
    //                   className={cx(classes.link, {
    //                     [classes.linkActive]: active === "/setting",
    //                   })}
    //                   onClick={() => {
    //                     setActive("/setting");
    //                     close();
    //                   }}
    //                 >
    //                   Settings
    //                 </Button>
    //               </Link>
    //               <Button
    //                 variant="subtle"
    //                 className={classes.link}
    //                 onClick={() => {
    //                   signOut({ callbackUrl: "/login" });
    //                 }}
    //               >
    //                 Log Out
    //               </Button>
    //             </>
    //           )}
    //         </Paper>
    //       )}
    //     </Transition>
    //   </Container>
    // </H>
  );
};

export default Header;
