import { CommunityList, NewCommunity } from "@components/index";
import {
  Button,
  Container,
  Flex,
  Title,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import { COMMUNITIES } from "@constants/communities";
import { IconPlus } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Communities = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Container fluid>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size="75vw"
        title={
          <Title order={2} size="h4">
            Create Community
          </Title>
        }
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <NewCommunity />
      </Modal>
      <Flex justify="space-between">
        <Title order={1} size="h3" mb="md">
          Community List
        </Title>
        <Button
          rightIcon={<IconPlus size={16} />}
          onClick={() => {
            session?.user ? open() : router.push("/login");
          }}
        >
          Create
        </Button>
      </Flex>
      <CommunityList communities={COMMUNITIES} />
    </Container>
  );
};

export default Communities;
