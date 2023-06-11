import { Stack, Select, Switch, Group } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import SettingLayout from "../Form/FormLayout";

const SecuritySetting = () => {
  const configuration = [
    {
      label: "Profile Visibility",
      description: "Control who can see your profile information",
      input: (
        <Select
          rightSection={<IconChevronDown size={14} />}
          data={["Everyone", "Followers", "Myself"]}
        ></Select>
      ),
    },
    {
      label: "Two-Factor Authentication",
      description:
        "Enable an extra layer of security for logging in to your account",
      input: (
        <Group>
          <Switch />
          Enable
        </Group>
      ),
    },
  ];
  return (
    <Stack>
      <SettingLayout
        layout="horizontal"
        label={configuration[0].label}
        description={configuration[0].description}
        input={configuration[0].input}
      />
      <SettingLayout
        layout="horizontal"
        label={configuration[1].label}
        description={configuration[1].description}
        input={configuration[1].input}
      />
    </Stack>
  );
};

export default SecuritySetting;
