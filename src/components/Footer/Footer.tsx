import { Container, Group, ActionIcon } from "@mantine/core";
import {
	IconBrandTwitter,
	IconBrandYoutube,
	IconBrandInstagram,
} from "@tabler/icons";
import Image from "next/image";
import { useStyles } from "./Footer.style";


const Footer = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.footer}>
			<Container className={classes.inner}>
				<Image src="/logo.png" alt="Logo" width={50} height={50} />
				<Group
					spacing={0}
					className={classes.links}
					position="right"
					noWrap
				>
					<ActionIcon size="lg">
						<IconBrandTwitter size={18} stroke={1.5} />
					</ActionIcon>
					<ActionIcon size="lg">
						<IconBrandYoutube size={18} stroke={1.5} />
					</ActionIcon>
					<ActionIcon size="lg">
						<IconBrandInstagram size={18} stroke={1.5} />
					</ActionIcon>
				</Group>
			</Container>
		</div>
	);
};

export default Footer;
