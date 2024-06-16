import { Box, BoxProps, ButtonProps } from "@mantine/core";
import { useRouter } from "next/router";

type MessageButtonProps = {
  senderId: string;
  recipientId: string;
  component?: React.ElementType<any>;
  children?: React.ReactNode;
} & BoxProps &
  ButtonProps;

const MessageButton: React.FC<MessageButtonProps> = (props) => {
  const { senderId, recipientId } = props;
  const router = useRouter();
  const handleClick = () => {
    fetch("/api/messages/create-channel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId,
        recipientId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(`/message/${data.channelId}`);
      });
  };

  const Element = props.component || Box;

  return (
    <Element onClick={handleClick} {...props}>
      {props.children || "Message"}
    </Element>
  );
};

export default MessageButton;
