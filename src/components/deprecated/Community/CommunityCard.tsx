import {
  Flex,
  Title,
  Text,
  Card,
  Image,
  TypographyStylesProvider,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CommunityCardMenu from "./CommunityCardMenu";

interface CommunityCardProps {
  community: {
    id: string;
    name: string;
    description: string;
    avatar: string;
    banner: string;
    creatorId: {
      id: string;
    };
    isJoined: boolean;
  };
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  const { id, name, description, banner, isJoined } = community;
  const { data: session } = useSession();

  return (
    <Link href={`/community/${id}`} passHref>
      <Card
        withBorder
        p="xl"
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
          <Image
            height={300}
            src={`https://ik.imagekit.io/umtfellow/tr:h-600/${banner}`}
            alt="test"
            radius="md"
          />
        </Card.Section>

        <Card.Section>
          <Flex direction="column">
            <Title ta="center" order={1} size="md" mt="md">
              {name}
            </Title>
            <TypographyStylesProvider>
              <Text color="dimmed" size="sm" lineClamp={8}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<p>${description.replaceAll(/\n/g, "<br/>")}</p>`,
                  }}
                />
              </Text>
            </TypographyStylesProvider>
          </Flex>
        </Card.Section>

        {session && (
          <Card.Section withBorder py="sm">
            <CommunityCardMenu
              communityId={id}
              isJoined={isJoined}
              creatorId={community.creatorId.id}
            />
          </Card.Section>
        )}
      </Card>
    </Link>
  );
};

export default CommunityCard;
