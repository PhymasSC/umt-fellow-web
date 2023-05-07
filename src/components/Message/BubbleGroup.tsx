import { Flex, Avatar } from "@mantine/core";
import Bubble from "./Bubble";

type BubbleProps = {
  profileUrl: string;
  profileImage: string;
  message: string;
  isRecipient: boolean;
};

const BubbleGroup = ({
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
        <Bubble
          message={`Ch
            eck to see if this is a pretty long textCheck to see if this is a pretty long textCheck to see if this is a pretty long textCheck to see if this is a pretty long textCheck to see if this 
            eck to see if this is a pretty long textCheck to see if this is a pretty long textCheck to see if this is a pretty long textCheck to see if this is a pretty long textCheck to see if this 
            is a pretty long textCheck to see if this is a pretty long text`}
          isRecipient={isRecipient}
        />
        <Bubble message="1" isRecipient={isRecipient} />
        <Bubble message="1" isRecipient={isRecipient} />
        <Bubble message="1" isRecipient={isRecipient} />
      </Flex>
    </Flex>
  );
};

export default BubbleGroup;
