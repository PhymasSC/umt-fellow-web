import { Stack, ActionIcon, Text } from "@mantine/core";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";
import { MouseEvent } from "react";
type VoteButtonProps = {
  onUpvote: (e: MouseEvent<HTMLButtonElement>) => void;
  onDownvote: (e: MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

const VoteButton = (props: VoteButtonProps) => {
  const { onUpvote, onDownvote, children } = props;
  return (
    <Stack align="center" spacing="xs">
      <ActionIcon onClick={onUpvote}>
        <IconChevronUp />
      </ActionIcon>
      {children}
      <ActionIcon onClick={onDownvote}>
        <IconChevronDown />
      </ActionIcon>
    </Stack>
  );
};

export default VoteButton;
