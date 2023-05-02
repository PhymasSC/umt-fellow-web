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

const Feed = ({ feeds, loading }: FeedProps) => {
  if (loading) {
    return (
      <Card p={0} radius="md" withBorder>
        {[...Array(5)].map((_, index) => (
          <Card.Section withBorder key={index}>
            <SingleFeed feed={undefined} loading />
          </Card.Section>
        ))}
      </Card>
    );
  }

  return (
    <Card pt={0} pb={0} radius="md" withBorder>
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

                "&:hover": {
                  cursor: "pointer",
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[7]
                      : theme.colors.gray[0],
                },
              })}
              component="a"
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
