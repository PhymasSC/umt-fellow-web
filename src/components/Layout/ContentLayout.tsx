import { Container, Stack, Group, Grid } from "@mantine/core";
import SingleFeedSkeleton from "./../Thread/SingleThreadSkeleton";
import { VoteButton } from "@components/Button";

type ContentLayoutProps = {
  header: React.ReactNode;
  children: React.ReactNode;
  vote: React.ReactNode;
  onUpvote: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDownvote: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
};
const ContentLayout = (props: ContentLayoutProps) => {
  const { header, children, loading, vote, onUpvote, onDownvote } = props;

  if (loading) return <SingleFeedSkeleton />;

  return (
    <Container
      sx={{
        padding: "2rem 0",
        width: "100%",
      }}
      fluid
    >
      <Grid>
        <Grid.Col span={1}>
          <VoteButton onUpvote={onUpvote} onDownvote={onDownvote}>
            {vote}
          </VoteButton>
        </Grid.Col>
        <Grid.Col span={11}>
          <Stack>
            <Group position="apart">{header}</Group>

            {children}
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ContentLayout;
