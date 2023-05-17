import { Card } from "@mantine/core";
import SingleFeed from "./SingleFeed";
import Link from "next/link";

interface FeedProps {
  feeds: { threads: feed[] };
  loading?: boolean;
}

interface feed {
  title: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  images: string[];
  created_at: string;
  updated_at: string;
  description: string;
  id: string;
}

const Skeleton = () => (
  <Card withBorder>
    {[...Array(5)].map((_, index) => (
      <Card.Section p="lg" withBorder key={index}>
        <SingleFeed feed={undefined} loading />
      </Card.Section>
    ))}
  </Card>
);

const Feed = ({ feeds, loading }: FeedProps) => {
  if (loading) return <Skeleton />;
  return (
    <Card
      pt={0}
      pb={0}
      radius="md"
      withBorder
      sx={{
        overflow: "visible",
      }}
    >
      {Object.values(feeds || {}).map((value) =>
        value?.map((item) => (
          <Link key={item.id} href={`/thread/${item.id}`} passHref>
            <Card.Section
              sx={(theme) => ({
                textDecoration: "none",
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.gray[0]
                    : theme.colors.dark[9],
                overflow: "visible",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[7]
                      : theme.colors.gray[0],
                },
              })}
              component="a"
              p="md"
              key={item.id}
              withBorder
            >
              <SingleFeed feed={item} />
            </Card.Section>
          </Link>
        ))
      )}
    </Card>
  );
};

export default Feed;
