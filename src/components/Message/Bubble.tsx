import { DefaultProps, Paper, PaperStylesParams, Text } from "@mantine/core";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

type BubbleProps = {
  message: string;
  timestamp: Date;
} & DefaultProps<never, PaperStylesParams>;
const Bubble = (props: BubbleProps) => {
  const { message, timestamp, ...rest } = props;
  dayjs.extend(calendar);

  return (
    <Paper px="md" py={7} radius="lg" {...rest}>
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
