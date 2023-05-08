import { DefaultProps, Paper, PaperStylesParams } from "@mantine/core";

type BubbleProps = {
  message: string;
} & DefaultProps<never, PaperStylesParams>;
const Bubble = ({ message, sx }: BubbleProps) => {
  return (
    <Paper p={10} radius="lg" fz="sm" sx={sx}>
      {message.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </Paper>
  );
};

export default Bubble;
