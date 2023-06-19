import { Container, Stack, Group, Grid } from "@mantine/core";
import SingleFeedSkeleton from "./../Thread/SingleThreadSkeleton";
import { VoteButton } from "@components/Button";

type ContentLayoutProps = {
  header: React.ReactNode;
  children: React.ReactNode;
  vote: React.ReactNode;
  loading?: boolean;
};
const ContentLayout = (props: ContentLayoutProps) => {
  const { header, children, loading, vote } = props;

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
          <VoteButton onUpvote={() => {}} onDownvote={() => {}}>
            {vote}
          </VoteButton>
        </Grid.Col>
        <Grid.Col span={11}>
          <Stack align="flex-start">
            <Group position="apart">{header}</Group>

            {children}
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ContentLayout;
