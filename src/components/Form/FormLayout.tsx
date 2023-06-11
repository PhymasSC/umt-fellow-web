import { Grid, Text } from "@mantine/core";

interface TextInputSettingProps {
  layout: "horizontal" | "vertical";
  label: string | React.ReactNode;
  description: string;
  input: any;
}

const SettingLayout = (props: TextInputSettingProps) => {
  const { layout, label, description, input, ...rest } = props;
  return (
    <Grid {...rest}>
      <Grid.Col xs={layout === "horizontal" ? 6 : 12}>
        <Text size="sm" weight={500}>
          {label}
        </Text>
        <Text size="xs" color="dimmed">
          {description}
        </Text>
      </Grid.Col>
      <Grid.Col xs={layout === "horizontal" ? 6 : 12}>{input}</Grid.Col>
    </Grid>
  );
};

export default SettingLayout;
