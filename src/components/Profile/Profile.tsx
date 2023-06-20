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
  Anchor,
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
  IconMessageCircle,
  IconFriends,
  IconUserCheck,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import MessageButton from "@components/Message/MessageButton";
import { useMutation, useQuery } from "@apollo/client";
import { FOLLOW_USER, UNFOLLOW_USER } from "@operations/mutations";
import { useState } from "react";
import { GET_FOLLOW } from "@operations/queries";

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
    coverImage: string;
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
    created_at: string;
    updated_at: string;
  };
  threads: any;
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  const { user, threads } = props;
  const { data: session } = useSession();
  const { classes } = useStyles();
  const { width } = useViewportSize();
  const [follow] = useMutation(FOLLOW_USER);
  const [unfollow] = useMutation(UNFOLLOW_USER);
  const [followLoading, setFollowLoading] = useState(false);
  // const [ isFollowing, setIsFollowing ] = useState(false);
  const {
    loading,
    data: followData,
    refetch,
  } = useQuery(GET_FOLLOW, {
    variables: {
      followerId: session?.user?.id,
      followingId: user.id,
    },
  });

  const socialMedia = [
    {
      icon: <IconBrandFacebook />,
      link: user.facebookLink,
      url: `https://www.facebook.com/${user.facebookLink}`,
    },
    {
      icon: <IconBrandInstagram />,
      link: user.instagramLink,
      url: `https://www.instagram.com/${user.instagramLink}`,
    },
    {
      icon: <IconBrandTwitter />,
      link: user.twitterLink,
      url: `https://twitter.com/${user.twitterLink}`,
    },
    {
      icon: <IconBrandSnapchat />,
      link: user.snapchatLink,
      url: `https://www.snapchat.com/add/${user.snapchatLink}`,
    },
    {
      icon: <IconBrandTiktok />,
      link: user.tiktokLink,
      url: `https://www.tiktok.com/@${user.tiktokLink}`,
    },
    {
      icon: <IconBrandTelegram />,
      link: user.telegramLink,
      url: `https://t.me/${user.telegramLink}`,
    },
    {
      icon: <IconBrandReddit />,
      link: user.redditLink,
      url: `https://www.reddit.com/user/${user.redditLink}`,
    },
    {
      icon: <IconBrandYoutube />,
      link: user.youtubeLink,
      url: `https://www.youtube.com/channel/${user.youtubeLink}`,
    },
    {
      icon: <IconBrandGithub />,
      link: user.githubLink,
      url: `https://github.com/${user.githubLink}`,
    },
    {
      icon: <IconBrandDribbble />,
      link: user.dribbbleLink,
      url: `https://dribbble.com/${user.dribbbleLink}`,
    },
  ];

  const handleFollow = async () => {
    setFollowLoading(true);
    if (followData.getFollow) {
      await unfollow({
        variables: {
          followerId: session?.user?.id,
          followingId: user.id,
        },
      });
      refetch();
      setFollowLoading(false);
      return;
    }
    await follow({
      variables: {
        follower: session?.user?.id,
        following: user.id,
      },
    });
    refetch();
    setFollowLoading(false);
  };

  return (
    <Container fluid>
      <Card className={classes.card}>
        <BackgroundImage
          src={
            (user.coverImage?.length != 0 && user.coverImage) ||
            "https://picsum.photos/800/500"
          }
          radius="sm"
        >
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
              session && session?.user?.id != user.id && (
                <Group>
                  <Button
                    color={followData?.getFollow ? "dark" : "blue"}
                    leftIcon={
                      followData?.getFollow ? (
                        <IconUserCheck size={15} />
                      ) : (
                        <IconUserPlus size={15} />
                      )
                    }
                    onClick={handleFollow}
                    loading={followLoading}
                  >
                    {(followData?.getFollow && "Friend") || "Follow"}
                  </Button>
                  <MessageButton
                    variant={followData?.getFollow ? "filled" : "outline"}
                    color={followData?.getFollow ? "blue" : "gray"}
                    component={Button}
                    leftIcon={<IconMessageCircle size={15} />}
                    senderId={session.user.id}
                    recipientId={user.id}
                  />
                </Group>
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
                <Text size="sm">
                  {user.about || (
                    <Text fs="italic" color="dimmed">
                      This user has not written anything about themself.
                    </Text>
                  )}
                  <Grid>
                    {user.faculty && (
                      <>
                        <Grid.Col span={5}>
                          <Text fw="bolder">Faculty:</Text>
                        </Grid.Col>
                        <Grid.Col span={7}>{user.faculty}</Grid.Col>
                      </>
                    )}
                    {user.major && (
                      <>
                        <Grid.Col span={5}>
                          <Text fw="bolder">Major:</Text>
                        </Grid.Col>
                        <Grid.Col span={7}>{user.major}</Grid.Col>
                      </>
                    )}
                    {user.year && (
                      <>
                        <Grid.Col span={5}>
                          <Text fw="bolder">Year:</Text>
                        </Grid.Col>
                        <Grid.Col span={7}>{user.year}</Grid.Col>
                      </>
                    )}
                    {user.cgpa && (
                      <>
                        <Grid.Col span={5}>
                          <Text fw="bolder">CGPA:</Text>
                        </Grid.Col>
                        <Grid.Col span={7}>{user.cgpa}</Grid.Col>
                      </>
                    )}
                    <Grid.Col span={5}>
                      <Text fw="bold">Joined at: </Text>
                    </Grid.Col>
                    <Grid.Col span={7}>
                      {Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(user.created_at))}
                    </Grid.Col>
                  </Grid>
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
                  <Stack>
                    {socialMedia.map(
                      (social, index) =>
                        social.link && (
                          <Group key={index}>
                            {social.icon}
                            <Anchor
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Text>{social.link}</Text>
                            </Anchor>
                          </Group>
                        )
                    )}
                  </Stack>
                </Card>
              )}
              {width >= 1200 && <Footer />}
            </Stack>
          </Grid.Col>

          <Grid.Col md={12} lg={9}>
            <Card radius="md">
              {threads?.getThreadsByAuthor.length > 0 ? (
                <>
                  <Feed feeds={threads?.getThreadsByAuthor}></Feed>
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
                <Space h={20} />
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
