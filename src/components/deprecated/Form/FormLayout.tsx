import { ActionIcon, Flex, Grid, Text, Tooltip } from "@mantine/core";
import { IconHelp } from "@tabler/icons";

interface TextInputSettingProps {
  layout: "horizontal" | "vertical";
  label: string | React.ReactNode;
  description: string | React.ReactNode;
  input: any;
}

const SettingLayout = (props: TextInputSettingProps) => {
  const { layout, label, description, input, ...rest } = props;
  return (
    <Grid {...rest}>
      <Grid.Col xs={layout === "horizontal" ? 6 : 12}>
        <Text size="sm" weight={500}>
          <Flex align="center">
            {label}
            <Tooltip
              multiline
              label={
                <Text size="xs" color="dimmed">
                  {description}
                </Text>
              }
            >
              <ActionIcon variant="transparent">
                <IconHelp size={14} />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </Text>
      </Grid.Col>
      <Grid.Col xs={layout === "horizontal" ? 6 : 12}>{input}</Grid.Col>
    </Grid>
  );
};

export default SettingLayout;
