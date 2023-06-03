import { Feed } from "@components/index";
import Footer from "@components/Footer";
import {
  createStyles,
  Card,
  Avatar,
  Text,
  Grid,
  Container,
  Title,
  Stack,
  Button,
  Space,
  Group,
  Badge,
  Image,
  BackgroundImage,
  Flex,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandTiktok,
  IconBrandInstagram,
  IconBrandSnapchat,
  IconUserPlus,
  IconBrandTelegram,
  IconBrandDribbble,
  IconBrandReddit,
  IconBrandYoutube,
  IconCircleCheck,
} from "@tabler/icons";
import { useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: "transparent",
  },

  cover: {
    borderRadius: "0.5em",
  },

  avatar: {
    borderRadius: "999em",
    border: `${theme.fn.smallerThan("sm") ? ".2em" : ".5em"} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.blue[0]
    }`,
    width: "10em",
    height: "10em",
    margin: "-5em auto 0 auto",
  },

  stats: {
    width: "40%",
  },
}));

interface ProfileProps {
  user: {
    id: string;
    image: string;
    avatar?: string;
    name: string;
    nickname?: string | string[];
    isUMTMembership: boolean;
    stats: { label: string; value: string }[];
    facebookLink: string;
    twitterLink: string;
    instagramLink: string;
    githubLink: string;
    dribbbleLink: string;
    youtubeLink: string;
    telegramLink: string;
    tiktokLink: string;
    redditLink: string;
    snapchatLink: string;
    about: string;
    faculty: string;
    major: string;
    year: number;
    cgpa: number;
  };
  threads: any;
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  const { user, threads } = props;
  const { data: session } = useSession();
  const { classes } = useStyles();
  const { width } = useViewportSize();

  const socialMedia = [
    {
      icon: <IconBrandFacebook />,
      link: user.facebookLink,
    },
    {
      icon: <IconBrandInstagram />,
      link: user.instagramLink,
    },
    {
      icon: <IconBrandTwitter />,
      link: user.twitterLink,
    },
    {
      icon: <IconBrandSnapchat />,
      link: user.snapchatLink,
    },
    {
      icon: <IconBrandTiktok />,
      link: user.tiktokLink,
    },
    {
      icon: <IconBrandTelegram />,
      link: user.telegramLink,
    },
    {
      icon: <IconBrandReddit />,
      link: user.redditLink,
    },
    {
      icon: <IconBrandYoutube />,
      link: user.youtubeLink,
    },
    {
      icon: <IconBrandGithub />,
      link: user.githubLink,
    },
    {
      icon: <IconBrandDribbble />,
      link: user.dribbbleLink,
    },
  ];

  console.log(user);
  return (
    <Container fluid>
      <Card className={classes.card}>
        <BackgroundImage src={user.image.replace(/\s+/g, "%20")} radius="sm">
          <Card.Section
            sx={{
              height: "40vh",
            }}
            className={classes.cover}
          />
        </BackgroundImage>
        <Avatar
          src={user.image.replace(/\s+/g, "%20")}
          className={classes.avatar}
        />
        <Card.Section
          mt="lg"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack spacing={10}>
            <Flex justify="center" align="center" gap={10}>
              <Title order={1}>{user.name}</Title>
              {user.isUMTMembership && (
                <Badge color="blue" size="xl">
                  <Group
                    spacing={6}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconCircleCheck size={18} />
                    Verified
                  </Group>
                </Badge>
              )}
            </Flex>

            <Text align="center" size="sm" color="dimmed">
              @{user.id}
            </Text>

            {
              //@ts-ignore
              session?.user?.id != user.id && (
                <Button
                  variant="light"
                  color="cyan"
                  leftIcon={<IconUserPlus size={15} />}
                >
                  Follow
                </Button>
              )
            }
          </Stack>
        </Card.Section>

        <Space h="xl" />
        <Grid>
          <Grid.Col md={12} lg={3}>
            <Stack>
              <Card sx={{ padding: "2em !important" }}>
                <Title size="md">About</Title>
                <Space h={30} />
                <Text size="sm">
                  {user.about || (
                    <Text fs="italic" color="dimmed">
                      This user has not written anything about themself.
                    </Text>
                  )}
                </Text>
              </Card>
              <Card sx={{ padding: "2em !important" }}>
                <Title size="md">Followers</Title>
                <Space h={30} />
                <Avatar.Group>
                  <Avatar src="https://picsum.photos/100" radius="xl" />
                  <Avatar src="https://picsum.photos/101" radius="xl" />
                  <Avatar src="https://picsum.photos/102" radius="xl" />
                  <Avatar src="https://picsum.photos/103" radius="xl" />
                  <Avatar radius="xl">+2</Avatar>
                </Avatar.Group>
              </Card>
              {socialMedia.filter((social) => social.link).length > 0 && (
                <Card sx={{ padding: "2em !important" }}>
                  <Title size="md">Follow me on</Title>
                  <Space h={30} />
                  <Container>
                    <Stack spacing={30}>
                      {socialMedia.map(
                        (social) =>
                          social.link && (
                            <Group>
                              {social.icon}
                              <Text>{social.link}</Text>
                            </Group>
                          )
                      )}
                      {/* <IconBrandTiktok />
											<IconBrandTelegram />
											<IconBrandReddit />
											<IconBrandYoutube />
											<IconBrandGithub />
											<IconBrandDribbble /> */}
                    </Stack>
                  </Container>
                </Card>
              )}
              {width >= 1200 && <Footer />}
            </Stack>
          </Grid.Col>

          <Grid.Col md={12} lg={9}>
            <Card radius="md">
              {threads.getThreadsByAuthor.length > 0 ? (
                <>
                  <Feed feeds={threads}></Feed>
                  <Container p={20}>
                    <Title order={2} align={"center"}>
                      You have finished reading all the threads from {user.name}
                      !
                    </Title>
                  </Container>
                </>
              ) : (
                <Container p={20}>
                  <Text fw="bold" size="lg" align="center">
                    This user has not created any threads yet.
                    <Image src="/No_threads.svg" alt="No threads yet" />
                  </Text>
                </Container>
              )}
            </Card>
            {width < 1200 && (
              <>
                <Space h={20}></Space>
                <Footer />
              </>
            )}
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  );
};

export default Profile;
