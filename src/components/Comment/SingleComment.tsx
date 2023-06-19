import { ContentLayout } from "@components/Layout";
import { Button, Group, Avatar, Space, Text, Tooltip } from "@mantine/core";
import Link from "next/link";

type SingleCommentProps = {
  id: string;
  name: string;
  image: string;
  children: React.ReactNode;
};

const SingleComment = (props: SingleCommentProps) => {
  const { id, name, image, children } = props;

  return (
    <ContentLayout
      vote={<>1</>}
      header={
        <>
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
                <Space w="xs" />
              </Group>
            </Button>
          </Link>
          <Group>
            <Tooltip
              multiline
              label={`Created at a`}
              // label={`Created at ${dayjs(new Date(created_at)).toDate()}`}
              withArrow
              position="top"
            >
              <Text color="dimmed">
                {/* {created_at !== updated_at && "Edited "}
                    {dayjs(new Date(updated_at)).fromNow()} */}
              </Text>
            </Tooltip>
            {/* <FeedSetting author={author} feedId={feed.id} /> */}
          </Group>
        </>
      }
      children={children}
    />
  );
};

export default SingleComment;
