import { Group, Text } from "@mantine/core";
import Link from "next/link";
import { IconCopyright } from "@tabler/icons";
import Typography from "@components/Typography";

const Footer = () => {
	return (
		<Typography>
			<Group sx={{ lineHeight: ".5em" }}>
				<Text weight={700}>
					<Group
						spacing="xs"
						sx={{ display: "flex", alignItems: "center" }}
					>
						<IconCopyright size="20" /> 2023 UMT Fellow
					</Group>
				</Text>
				<Link href="/privacy-policy">Privacy Policy</Link>
				<Link href="/terms-and-conditions">Terms and Conditions</Link>
				<Link href="/contact-us">Contact Us</Link>
				<a href="https://vercel.com/">▲ Powered by Vercel</a>
			</Group>
		</Typography>
	);
};

export default Footer;
