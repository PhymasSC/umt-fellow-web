import { Flex, Avatar } from "@mantine/core";
import Link from "next/link";
import Bubble from "./Bubble";

type BubbleProps = {
  children: React.ReactNode;
  profileUrl: string;
  profileImage: string;
  message: string;
  isRecipient: boolean;
};

const BubbleGroup = ({
  children,
  profileUrl,
  profileImage,
  isRecipient,
}: BubbleProps) => {
  return (
    <Flex
      gap={10}
      align="flex-end"
      direction={isRecipient ? "row-reverse" : "row"}
    >
      <Link href={profileUrl} passHref>
        <Avatar radius="xl" src={profileImage} component="a" />
      </Link>
      <Flex direction="column" align={isRecipient ? "flex-end" : "flex-start"}>
        {children}
      </Flex>
    </Flex>
  );
};

export default BubbleGroup;
