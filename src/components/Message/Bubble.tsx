import { Paper } from "@mantine/core";

const Bubble = ({
  message,
  isRecipient,
}: {
  message: string;
  isRecipient: boolean;
}) => {
  return (
    <Paper
      p={10}
      radius="lg"
      fz="sm"
      maw="70vw"
      sx={(theme) => ({
        wordBreak: "break-word",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.blue[1]
            : theme.colors.blue[6],
        color:
          theme.colorScheme === "dark"
            ? theme.colors.gray[9]
            : theme.colors.gray[1],
      })}
    >
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
