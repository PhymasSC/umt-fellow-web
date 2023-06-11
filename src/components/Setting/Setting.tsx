import { Card, Container, Tabs, Text, Title } from "@mantine/core";
import AccountSetting from "./AccountSetting";
import ChatSetting from "./ChatSetting";
import CommunitySetting from "./CommunitySetting";
import NotificationSetting from "./NotificationSetting";

interface Setting {
  setting: {
    accountSettings: SettingProps;
    securitySettings: SettingProps;
    notificationSettings: SettingProps;
    communitySettings: SettingProps;
    chatSettings: SettingProps;
  };
}

interface SettingProps {
  value: string;
  label: string;
  description: string;
  data: {
    label: string;
    type: string;
    description: string;
  }[];
}

const tabs = ["Account", "Notification", "Community", "Chat & Messaging"];

const Setting: React.FC<Setting> = (props) => {
  const { setting } = props;
  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <>
      <Card
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        })}
      >
        <Tabs defaultValue="Account">
          <Tabs.List grow>{items}</Tabs.List>
          <Container p={10}>
            {Object.entries(setting).map(([key, value]) => {
              return (
                <Tabs.Panel key={key} value={value.value} pt="xs">
                  <Title order={1} size="h2">
                    {value.label}
                  </Title>
                  <Text size="xs" color="dimmed" mt={3} mb="xl">
                    {value.description}
                  </Text>
                  {key === "accountSettings" && <AccountSetting />}
                  {key === "notificationSettings" && <NotificationSetting />}
                  {key === "communitySettings" && <CommunitySetting />}
                  {key === "chatSettings" && <ChatSetting />}
                </Tabs.Panel>
              );
            })}
          </Container>
        </Tabs>
      </Card>
    </>
  );
};

export default Setting;
