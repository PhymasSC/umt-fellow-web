import Footer from "@components/Footer";
import { Card, Container, Tabs, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import AccountSetting from "./AccountSetting";
import CommunitySetting from "./CommunitySetting";

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

const tabs = [
  "Account",
  // "Notification",
  "Community",
  // "Chat & Messaging"
];

const Setting: React.FC<Setting> = (props) => {
  const router = useRouter();
  const { t: tab = 1 } = router.query;
  const { setting } = props;
  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <>
      <Card
        mb="md"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        })}
      >
        <Tabs defaultValue={tabs[(tab as number) - 1]}>
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
                  {/* {key === "notificationSettings" && <NotificationSetting />} */}
                  {key === "communitySettings" && <CommunitySetting />}
                  {/* {key === "chatSettings" && <ChatSetting />} */}
                </Tabs.Panel>
              );
            })}
          </Container>
        </Tabs>
      </Card>

      <Footer />
    </>
  );
};

export default Setting;
