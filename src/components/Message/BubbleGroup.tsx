import { Flex, Avatar, Tooltip } from "@mantine/core";
import Link from "next/link";

type BubbleProps = {
  children: React.ReactNode;
  name: string;
  profileUrl: string;
  profileImage: string;
  isRecipient: boolean;
};

const BubbleGroup = ({
  children,
  name,
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
      <Tooltip label={name} openDelay={500}>
        <span>
          <Link href={profileUrl} passHref>
            <Avatar radius="xl" src={profileImage} component="a" />
          </Link>
        </span>
      </Tooltip>
      {children}
    </Flex>
  );
};

export default BubbleGroup;
