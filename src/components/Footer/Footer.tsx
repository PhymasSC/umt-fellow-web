import { Container, Group, ActionIcon, Title, Image } from "@mantine/core";
import {
	IconBrandTwitter,
	IconBrandYoutube,
	IconBrandInstagram,
} from "@tabler/icons";
import { useStyles } from "./Footer.style";

const Footer = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.footer}>
			<Container className={classes.inner} fluid>
				<Group className={classes.logo}>
					<Image src="/logo.png" alt="Logo" width={50} height={50} />
					<Title size="h3">UMT Fellow</Title>
				</Group>
				
			</Container>
		</div>
	);
};

export default Footer;
