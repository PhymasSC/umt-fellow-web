import { Flex, Title, Text, Card, Image } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import CommunityCardMenu from "./CommunityCardMenu";

interface CommunityCardProps {
  community: {
    id: number;
    name: string;
    description: string;
    avatar: string;
  };
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  const [isJoined, setIsJoined] = useState(false);
  const { id, name, description, avatar } = community;
  return (
    <Link href={`/community/${id}`} passHref>
      <Card
        withBorder
        component="a"
        sx={(theme) => ({
          textDecoration: "none",
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[0],
          },
        })}
      >
        <Card.Section>
          <Image src={avatar} alt="test" />
        </Card.Section>
        <Flex direction="column" align="center" justify="center">
          <Title order={1} size="md" mt="md">
            {name}
          </Title>
          <Text size="sm" color="dimmed" ta="left">
            {description}{" "}
          </Text>
          <Flex h="100%" w="100%" justify="center" align="center" gap={10}>
            <CommunityCardMenu
              isJoined={isJoined}
              onClick={() => setIsJoined((isJoined) => !isJoined)}
            />
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};

export default CommunityCard;
