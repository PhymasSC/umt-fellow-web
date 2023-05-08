import { Flex, Avatar } from "@mantine/core";
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
      <Avatar radius="xl" src={profileImage} />
      <Flex direction="column" align={isRecipient ? "flex-end" : "flex-start"}>
        {children}
      </Flex>
    </Flex>
  );
};

export default BubbleGroup;
