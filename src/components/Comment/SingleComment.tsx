import { ContentLayout } from "@components/Layout";
import {
  Button,
  Group,
  Avatar,
  Space,
  Text,
  Tooltip,
  Badge,
} from "@mantine/core";
import Link from "next/link";
import dayjs from "dayjs";
type SingleCommentProps = {
  id: string;
  name: string;
  image: string;
  children: React.ReactNode;
  isAuthor: boolean;
  created_at: string;
  updated_at: string;
};

const SingleComment = (props: SingleCommentProps) => {
  const { id, name, image, isAuthor, children, created_at, updated_at } = props;

  return (
    <ContentLayout
      vote={<>1</>}
      header={
        <Group spacing="xs">
          <Link href={`/profile/${id}`} passHref>
            <Button
              component="a"
              variant="subtle"
              h={50}
              color="gray"
              sx={{ color: "inherit", textDecoration: "none" }}
            >
              <Group>
                <Avatar src={image} radius="xl" alt="Avatar" />
                <Text weight="700">{name}</Text>
              </Group>
            </Button>
          </Link>
          {isAuthor && <Badge color="yellow">Author</Badge>}·
          <Tooltip
            multiline
            label={`Created at ${dayjs(new Date(created_at)).toDate()}`}
            withArrow
            position="top"
          >
            <Text color="dimmed">
              {created_at !== updated_at && "Edited "}
              {dayjs(new Date(updated_at)).fromNow()}
            </Text>
          </Tooltip>
          <Group>
            {/* <FeedSetting author={author} feedId={feed.id} /> */}
          </Group>
        </Group>
      }
    >
      {children}
    </ContentLayout>
  );
};

export default SingleComment;
