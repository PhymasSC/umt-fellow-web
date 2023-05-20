import {
  Container,
  Skeleton,
  Stack,
  Group,
  Space,
  Grid,
  ActionIcon,
  Title,
  Spoiler,
} from "@mantine/core";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";
import { useStyles } from "./SingleFeed.style";
const SingleFeedSkeleton = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.container} fluid>
      <Stack>
        <Group position="apart">
          <Group>
            <Skeleton width={50} height={50} radius="xl" />
            <Skeleton width={200} height={30} radius="md" />
            <Space w="xs" />
          </Group>
          <Skeleton width={100} height={30} radius="md" />
        </Group>
        <Grid align="flex-start">
          <Grid.Col span={1}>
            <Stack align="center" spacing="xs">
              <ActionIcon>
                <IconChevronUp />
              </ActionIcon>
              <Skeleton width={30} height={30} radius="md" />
              <ActionIcon>
                <IconChevronDown />
              </ActionIcon>
            </Stack>
          </Grid.Col>
          <Grid.Col span={11}>
            <Title size="h3" weight="600">
              <Skeleton width={400} height={30} radius="md" />
            </Title>
            <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
              <Skeleton width={650} />
            </Spoiler>
            <Skeleton width={650} />

            <Space h="md" />
            <Stack>
              <Skeleton width="100%" height={30} radius="md" />
              <Skeleton width="100%" height={30} radius="md" />
              <Skeleton width="70%" height={30} radius="md" />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};

export default SingleFeedSkeleton;
