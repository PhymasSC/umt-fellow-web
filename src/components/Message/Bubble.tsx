import { DefaultProps, Paper, PaperStylesParams, Text } from "@mantine/core";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

type BubbleProps = {
  message: string;
  timestamp: Date;
  isRecipient: boolean;
} & DefaultProps<never, PaperStylesParams>;
const Bubble = (props: BubbleProps) => {
  const { message, timestamp, isRecipient, ...rest } = props;
  dayjs.extend(calendar);

  return (
    <Paper
      px="md"
      py={7}
      radius="lg"
      sx={(theme) => ({
        wordBreak: "break-word",
        backgroundColor:
          theme.colorScheme === "dark"
            ? isRecipient
              ? theme.colors.blue[2]
              : theme.colors.dark[4]
            : isRecipient
            ? theme.colors.blue[6]
            : theme.colors.gray[0],
        color:
          theme.colorScheme === "dark"
            ? isRecipient
              ? theme.colors.gray[9]
              : theme.colors.gray[0]
            : isRecipient
            ? theme.colors.gray[1]
            : theme.colors.gray[9],
      })}
      {...rest}
    >
      <Text fz="sm">
        {message.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </Text>
    </Paper>
  );
};

export default Bubble;
