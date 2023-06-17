import {
  DefaultProps,
  Paper,
  PaperStylesParams,
  Text,
  Tooltip,
} from "@mantine/core";
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
    <Paper px="xs" py={6} radius="lg" {...rest}>
      <Tooltip
        label={<Text fz="xs">{dayjs(timestamp).calendar()}</Text>}
        position="left"
        bg="#000000bb"
        offset={10}
      >
        <Text fz="sm">
          {message.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </Text>
      </Tooltip>
    </Paper>
  );
};

export default Bubble;
