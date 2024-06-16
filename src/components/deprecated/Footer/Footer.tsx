import { Card, Flex, Text } from "@mantine/core";
import Link from "next/link";
import Typography from "@/components/deprecated/Typography";

const Footer = () => {
  return (
    <Typography>
      <Text size="xs">
        <Flex direction="column" align="flex-start">
          &copy; 2023 UMT Fellow
          <Flex
            gap={{
              base: "0",
              sm: "md",
            }}
            direction={{
              base: "column",
              sm: "row",
            }}
          >
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
            <Link href="/contact-us">Contact Us</Link>
            <a href="https://vercel.com/">▲ Powered by Vercel</a>
          </Flex>
        </Flex>
      </Text>
    </Typography>
  );
};

export default Footer;
