import {
  Stack,
  TextInput,
  Text,
  Button,
  PasswordInput,
  Title,
  Textarea,
  Divider,
  Modal,
  useMantineTheme,
  List,
  TypographyStylesProvider,
  Grid,
  Loader,
} from "@mantine/core";
import {
  IconBrandDribbble,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandReddit,
  IconBrandSnapchat,
  IconBrandTelegram,
  IconBrandTiktok,
  IconBrandTwitter,
  IconBrandYoutube,
  IconCheck,
  IconCircleKey,
  IconDownload,
  IconOutbound,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@operations/queries";
import {
  Input,
  NumberInput,
  FormLayout,
  NewPassword,
  ImageCheckbox,
} from "../Form";
import { EDIT_USER } from "@operations/mutations";
import ImageInput from "@components/Form/ImageInput";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { PASSWORD_PATTERN } from "@constants/regex";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

type USER_TYPE = {
  id: string;
  name: string;
  email: string;
  image: string;
  coverImage: string;
  sex: string;
  age: number;
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
const AccountSetting = () => {
  const { data: session, update } = useSession();
  const {
    data,
  }: { data: { getUser: USER_TYPE } | undefined; loading: boolean } = useQuery(
    GET_USER(`
      coverImage
		  sex
		  age
		  image
		  facebookLink
		  twitterLink
		  instagramLink
		  githubLink
		  dribbbleLink
		  youtubeLink
		  telegramLink
		  tiktokLink
		  redditLink
		  snapchatLink
		  about
		  faculty
		  major
		  year
		  cgpa`),
    {
      variables: {
        id: session?.user.id,
      },
    }
  );
  const [exportLoading, setExportLoading] = useState(false);
  const [passwordOpened, { open: passwordOpen, close: passwordClose }] =
    useDisclosure(false);
  const [dyiOpened, { open: dyiOpen, close: dyiClose }] = useDisclosure(false);
  const theme = useMantineTheme();
  const userData: USER_TYPE | undefined = data?.getUser;
  const passwordForm = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const dyiForm = useForm({
    initialValues: {
      account: true,
      follows: true,
      threads: true,
      messages: true,
      comments: true,
      votes: true,
    },
  });

  const configuration: {
    label: string | React.ReactNode;
    description: string;
    layout?: "horizontal" | "vertical";
    input: JSX.Element;
  }[] = [
    {
      label: "Profile Picture",
      description: "Update your profile picture",
      layout: "horizontal",
      input: (
        <ImageInput
          imgName={userData?.name || ""}
          img={userData?.image || ""}
          argType={"image"}
          mutation={EDIT_USER({ image: true })}
          variables={{ id: userData?.id }}
          onCompleted={async (data) => {
            update({ picture: data?.user?.image });
          }}
        />
      ),
    },
    {
      label: "Cover Photo",
      description: "Update your cover photo",
      layout: "horizontal",
      input: (
        <ImageInput
          isBanner
          imgName={userData?.name || session?.user.name || ""}
          img={userData?.coverImage || ""}
          argType={"coverImage"}
          mutation={EDIT_USER({ coverImage: true })}
          variables={{ id: userData?.id }}
        />
      ),
    },
    {
      label: "Display Name",
      description:
        "The name displayed on your profile and @mention by other users",
      layout: "horizontal",
      input: (
        <Input
          argType="name"
          layout="horizontal"
          type="text"
          placeholder={userData?.name || session?.user.name || ""}
          value={userData?.name || session?.user.name || ""}
          component={TextInput}
          validate={{
            val: (val: string | any[]) =>
              val.length < 3
                ? "Name must be at least 3 characters long"
                : val.length > 50 &&
                  "Name must be less than 50 characters long",
          }}
          mutation={EDIT_USER({ name: true })}
          variables={{ id: userData?.id }}
          onCompleted={(data) => {
            update({ name: data });
            setTimeout(() => update(), 100); // Update session after 100ms
          }}
        />
      ),
    },
    {
      label: "Email Address",
      description:
        "Your email address is used to verify your identity and to send you notifications about your account.",
      layout: "horizontal",
      input: (
        <Text fw="normal" size="sm">
          {userData?.email || session?.user.email || ""}
        </Text>
      ),
    },
    {
      label: "About",
      description:
        "This is a short description about yourself that will be displayed on your profile page. It can be used to introduce yourself to other users, share your interests, or tell your story.",
      layout: "horizontal",
      input: (
        <Input
          argType="about"
          layout="horizontal"
          type="text"
          placeholder={userData?.about || ""}
          value={userData?.about || ""}
          component={Textarea}
          validate={{
            val: (val: string | any[]) =>
              val.length > 500 && "About must be less than 500 characters long",
          }}
          minRows={5}
          maxRows={10}
          isLongText
          mutation={EDIT_USER({ about: true })}
          variables={{ id: session?.user.id }}
        />
      ),
    },
    {
      label: "Faculty",
      description: "The faculty you are currently enrolled in.",
      layout: "horizontal",
      input: (
        <Input
          argType="faculty"
          layout="horizontal"
          type="text"
          placeholder={userData?.faculty || ""}
          value={userData?.faculty || ""}
          component={TextInput}
          validate={{
            val: (val: string | any[]) => {
              if (val.length > 500)
                return "About must be less than 500 characters long";
            },
          }}
          mutation={EDIT_USER({ faculty: true })}
          variables={{ id: session?.user.id }}
        />
      ),
    },
    {
      label: "Major",
      description: "Your major field of study.",
      layout: "horizontal",
      input: (
        <Input
          argType="major"
          layout="horizontal"
          type="text"
          placeholder={userData?.major || ""}
          value={userData?.major || ""}
          component={TextInput}
          validate={{
            val: (val: string | any[]) => {
              if (val.length > 500)
                return "About must be less than 500 characters long";
            },
          }}
          mutation={EDIT_USER({ major: true })}
          variables={{ id: session?.user.id }}
        />
      ),
    },
    {
      label: "Year",
      description: "Your current year of study.",
      layout: "horizontal",
      input: (
        <NumberInput
          argType="year"
          layout="horizontal"
          type="number"
          value={userData?.year || 0}
          precision={0}
          min={1}
          max={4}
          mutation={EDIT_USER({ year: true })}
          variables={{ id: session?.user.id }}
        />
      ),
    },
    {
      label: "Cumulative Grade Point Average (CGPA)",
      description:
        "Your overall grade point average (GPA) from all of your courses.",
      layout: "horizontal",
      input: (
        <NumberInput
          argType="cgpa"
          layout="horizontal"
          type="number"
          value={userData?.cgpa || 0}
          precision={2}
          min={0}
          max={4}
          step={0.5}
          mutation={EDIT_USER({ cgpa: true })}
          variables={{ id: session?.user.id }}
        />
      ),
    },
    {
      label: <Title order={2}>Social Media</Title>,
      description:
        "This section allows you to update your social media links. These links will be displayed on your profile, so that other users can easily find you on other social media platforms.",
      input: (
        <Stack>
          <FormLayout
            layout="horizontal"
            label="Facebook"
            description="Update your Facebook link"
            input={
              <Input
                argType="facebookLink"
                placeholder={userData?.facebookLink || "Your Facebook username"}
                value={userData?.facebookLink || ""}
                icon={<IconBrandFacebook strokeWidth={1} />}
                component={TextInput}
                deleteable
                mutation={EDIT_USER({ facebookLink: true })}
                variables={{ id: session?.user.id }}
              />
            }
          />
          <FormLayout
            layout="horizontal"
            label="Twitter"
            description="Update your Twitter link"
            input={
              <Input
                argType="twitterLink"
                placeholder={userData?.twitterLink || "Your Twitter username"}
                value={userData?.twitterLink || ""}
                icon={<IconBrandTwitter strokeWidth={1} />}
                component={TextInput}
                deleteable
                mutation={EDIT_USER({ twitterLink: true })}
                variables={{ id: session?.user.id }}
              />
            }
          />
          <FormLayout
            layout="horizontal"
            label="Instagram"
            description="Update your Instagram link"
            input={
              <Input
                argType="instagramLink"
                placeholder={
                  userData?.instagramLink || "Your Instagram username"
                }
                value={userData?.instagramLink || ""}
                icon={<IconBrandInstagram strokeWidth={1} />}
                component={TextInput}
                deleteable
                mutation={EDIT_USER({ instagramLink: true })}
                variables={{ id: session?.user.id }}
              />
            }
          />
          <FormLayout
            layout="horizontal"
            label="Github"
            description="Update your Github link"
            input={
              <Input
                argType="githubLink"
                placeholder={userData?.githubLink || "Your Github username"}
                value={userData?.githubLink || ""}
                icon={<IconBrandGithub strokeWidth={1} />}
                component={TextInput}
                deleteable
                mutation={EDIT_USER({ githubLink: true })}
                variables={{ id: session?.user.id }}
              />
            }
          />
          <FormLayout
            layout="horizontal"
            label="Dribbble"
            description="Update your Dribbble link"
            input={
              <Input
                argType="dribbbleLink"
                placeholder={userData?.dribbbleLink || "Your Dribbble username"}
                value={userData?.dribbbleLink || ""}
                icon={<IconBrandDribbble strokeWidth={1} />}
                component={TextInput}
                deleteable
                mutation={EDIT_USER({ dribbbleLink: true })}
                variables={{ id: session?.user.id }}
              />
            }
          />
          <FormLayout
            layout="horizontal"
            label="Youtube"
            description="Update your Youtube link"
            input={
              <Input
                argType="youtubeLink"
                placeholder={
                  userData?.youtubeLink || "Your Youtube channel name"
                }
                value={userData?.youtubeLink || ""}
                icon={<IconBrandYoutube strokeWidth={1} />}
                component={TextInput}
                deleteable
                mutation={EDIT_USER({ youtubeLink: true })}
                variables={{ id: session?.user.id }}
              />
            }
          />
          <FormLayout
            layout="horizontal"
            label="Telegram"
            description="Update your Telegram link"
            input={
              <Input
                argType="telegramLink"
                placeholder={userData?.telegramLink || "Your Telegram username"}
                value={userData?.telegramLink || ""}
                icon={<IconBrandTelegram strokeWidth={1} />}
                component={TextInput}
                deleteable
                mutation={EDIT_USER({ telegramLink: true })}
                variables={{ id: session?.user.id }}
              />
            }
          />
          <FormLayout
            layout="horizontal"
            label="Tiktok"
            description="Update your Tiktok link"
            input={
              <Input
                argType="tiktokLink"
                placeholder={userData?.tiktokLink || "Your Tiktok username"}
                value={userData?.tiktokLink || ""}
                icon={<IconBrandTiktok strokeWidth={1} />}
                component={TextInput}
                deleteable
                mutation={EDIT_USER({ tiktokLink: true })}
                variables={{ id: session?.user.id }}
              />
            }
          />
          <FormLayout
            layout="horizontal"
            label="Reddit"
            description="Update your Reddit link"
            input={
              <Input
                argType="redditLink"
                placeholder={userData?.redditLink || "Your Reddit username"}
                value={userData?.redditLink || ""}
                icon={<IconBrandReddit strokeWidth={1} />}
                component={TextInput}
                deleteable
                mutation={EDIT_USER({ redditLink: true })}
                variables={{ id: session?.user.id }}
              />
            }
          />
          <FormLayout
            layout="horizontal"
            label="Snapchat"
            description="Update your Snapchat link"
            input={
              <Input
                argType="snapchatLink"
                placeholder={userData?.snapchatLink || "Your Snapchat username"}
                value={userData?.snapchatLink || ""}
                icon={<IconBrandSnapchat strokeWidth={1} />}
                component={TextInput}
                deleteable
                mutation={EDIT_USER({ snapchatLink: true })}
                variables={{ id: session?.user.id }}
              />
            }
          />
        </Stack>
      ),
    },
    {
      label: "Download your information",
      description:
        "This feature allows you to download a copy of your data from the social forum. By downloading your information, you can have a personal backup and gain insights into your activities on the platform.",
      layout: "horizontal",
      input: (
        <>
          <Modal
            title="Download your information"
            opened={dyiOpened}
            onClose={dyiClose}
            overlayProps={{
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[9]
                  : theme.colors.gray[2],
              opacity: 0.55,
              blur: 3,
            }}
            centered
            size="xl"
          >
            <Modal.Body>
              <TypographyStylesProvider>
                By initiating the download, you can:
                <List>
                  <List.Item>
                    Obtain a comprehensive copy of your data from the social
                    forum.
                  </List.Item>
                  <List.Item>
                    Access a personal backup of your information.
                  </List.Item>
                  <List.Item>
                    Explore your activities, posts, comments, and likes in
                    detail. We ensure the security and privacy of your
                    information throughout the download process.
                  </List.Item>
                  <List.Item>
                    Gain insights into your interactions and contributions on
                    the platform.
                  </List.Item>
                  <List.Item>
                    Keep an archive of your social forum presence.
                  </List.Item>
                  <List.Item>
                    Enjoy greater control over your personal information.
                  </List.Item>
                  <List.Item>Preserve your valuable data securely.</List.Item>
                </List>
                The download process may take some time, depending on the volume
                of data associated with your account.
              </TypographyStylesProvider>
              <Divider my="md" label="Pick information" />
              <form
                onSubmit={dyiForm.onSubmit(async (val) => {
                  const variables = {
                    userId: session?.user.id,
                    ...val,
                  };

                  setExportLoading(true);
                  const response = await fetch("/api/dyi", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(variables),
                  });

                  if (response.ok) {
                    // Extract the filename from the response headers
                    const contentDisposition = response.headers.get(
                      "Content-Disposition"
                    );
                    const filename =
                      contentDisposition?.split("filename=")[1] || "";

                    // Read the response as a blob
                    const blob = await response.blob();

                    // Create a temporary anchor element to initiate the file download
                    const anchorElement = document.createElement("a");
                    anchorElement.href = URL.createObjectURL(blob);
                    anchorElement.download = filename;
                    anchorElement.click();

                    // Clean up the temporary URL object
                    URL.revokeObjectURL(anchorElement.href);
                    setExportLoading(false);
                    notifications.show({
                      title: "Download started",
                      message: "Your data download has started.",
                      color: "teal",
                      icon: <IconDownload size="1em" />,
                    });

                    dyiClose();
                  } else {
                    // Handle the error response from the server
                    const errorResponse = await response.json();
                    console.error("Export data failed:", errorResponse.error);
                  }
                })}
              >
                <Grid>
                  <Grid.Col sm={6}>
                    <ImageCheckbox
                      title={"Account"}
                      description={
                        "Download the information about who you follow and who follows you."
                      }
                      image={"/user-male--v3.png"}
                      defaultChecked={true}
                      {...dyiForm.getInputProps("account")}
                    />
                  </Grid.Col>
                  <Grid.Col sm={6}>
                    <ImageCheckbox
                      title={"Follows"}
                      description={
                        "Download the information about who you follow and who follows you."
                      }
                      image={"/contacts.png"}
                      defaultChecked={true}
                      {...dyiForm.getInputProps("follows")}
                    />
                  </Grid.Col>
                  <Grid.Col sm={6}>
                    <ImageCheckbox
                      title={"Threads"}
                      description={"Download all threads you had posted."}
                      image={"/news.png"}
                      defaultChecked={true}
                      {...dyiForm.getInputProps("threads")}
                    />
                  </Grid.Col>
                  <Grid.Col sm={6}>
                    <ImageCheckbox
                      title={"Messages"}
                      description={
                        "Download all messages you had sent and received."
                      }
                      image={"/speech-bubble--v1.png"}
                      defaultChecked={true}
                      {...dyiForm.getInputProps("messages")}
                    />
                  </Grid.Col>

                  <Grid.Col sm={6}>
                    <ImageCheckbox
                      title={"Comments"}
                      description={"Download all comments you had posted."}
                      image={"/comments.png"}
                      defaultChecked={true}
                      {...dyiForm.getInputProps("comments")}
                    />
                  </Grid.Col>
                  <Grid.Col sm={6}>
                    <ImageCheckbox
                      title={"Votes"}
                      description={"Download all votes you had posted."}
                      image={"/thumb-up--v1.png"}
                      defaultChecked={true}
                      {...dyiForm.getInputProps("votes")}
                    />
                  </Grid.Col>
                </Grid>
                <Button
                  variant="subtle"
                  mt="md"
                  type="submit"
                  disabled={exportLoading}
                  rightIcon={exportLoading && <Loader size="xs" />}
                >
                  Request download
                </Button>
              </form>
            </Modal.Body>
          </Modal>
          <Button
            w="100%"
            variant="default"
            color="red"
            leftIcon={<IconOutbound size="1em" />}
            onClick={dyiOpen}
          >
            Request download
          </Button>
        </>
      ),
    },
    {
      label: "Password",
      description: "Change the password used to log in to your account.",
      layout: "horizontal",
      input: (
        <>
          <Modal
            title="Change your password"
            opened={passwordOpened}
            onClose={passwordClose}
            overlayProps={{
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[9]
                  : theme.colors.gray[2],
              opacity: 0.55,
              blur: 3,
            }}
            centered
            size="lg  "
          >
            <Modal.Body>
              To change your password, please follow these steps:
              <List>
                <List.Item>
                  Enter your current password, followed by your new password and
                  confirm the new password.
                </List.Item>
                <List.Item>
                  Make sure to choose a strong and unique password.
                </List.Item>
              </List>
              <Divider my="md" />
              <form
                onSubmit={passwordForm.onSubmit(async (val) => {
                  if (val.currentPassword === val.newPassword)
                    return passwordForm.setFieldError(
                      "newPassword",
                      "New password cannot be the same as your current password"
                    );
                  if (val.newPassword !== val.confirmPassword)
                    return passwordForm.setFieldError(
                      "confirmPassword",
                      "Passwords do not match"
                    );

                  const variables = {
                    currentPassword: val.currentPassword,
                    password: val.newPassword,
                    userId: session?.user.id,
                    isForgot: false,
                  };

                  const res = await fetch("/api/reset-password", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(variables),
                  });

                  res.json().then((res) => {
                    if (res.err)
                      return passwordForm.setFieldError(
                        "currentPassword",
                        res.err
                      );
                    passwordForm.reset();
                    passwordClose();
                    notifications.show({
                      title: "Password changed",
                      message: "Your password has been changed successfully",
                      color: "teal",
                      icon: <IconCheck size="1.25rem" />,
                    });
                  });
                })}
              >
                <FormLayout
                  layout="horizontal"
                  label="Current Password"
                  description="Enter your current password"
                  input={
                    <PasswordInput
                      {...passwordForm.getInputProps("currentPassword")}
                    />
                  }
                />
                <FormLayout
                  layout="horizontal"
                  label="New Password"
                  description="Choose a new password"
                  input={
                    //@ts-ignore
                    <NewPassword
                      form={passwordForm}
                      argName="newPassword"
                      {...passwordForm.getInputProps("newPassword")}
                    />
                  }
                />
                <FormLayout
                  layout="horizontal"
                  label="Current Password"
                  description="Re-enter your new password to confirm"
                  input={
                    <PasswordInput
                      {...passwordForm.getInputProps("confirmPassword")}
                    />
                  }
                />
                <Button
                  variant="default"
                  fullWidth
                  mt="md"
                  type="submit"
                  disabled={
                    !PASSWORD_PATTERN.test(passwordForm.values.newPassword) ||
                    !PASSWORD_PATTERN.test(
                      passwordForm.values.confirmPassword
                    ) ||
                    !PASSWORD_PATTERN.test(
                      passwordForm.values.currentPassword
                    ) ||
                    passwordForm.values.newPassword !==
                      passwordForm.values.confirmPassword
                  }
                >
                  Change password
                </Button>
              </form>
            </Modal.Body>
          </Modal>
          <Button
            variant="light"
            color="indigo"
            fullWidth
            leftIcon={<IconCircleKey size="1em" />}
            onClick={passwordOpen}
          >
            Change Password
          </Button>
        </>
      ),
    },
    // {
    //   label: "Delete Account",
    //   description: "Permanently delete your account and all associated data",
    //   layout: "horizontal",
    //   input: (
    //     <Button
    //       w="100%"
    //       variant="light"
    //       color="red"
    //       leftIcon={<IconTrash size="1em" />}
    //     >
    //       Delete Account
    //     </Button>
    //   ),
    // },
  ];

  console.log(session);
  return (
    <Stack>
      {configuration.map((config, index) => {
        return (
          <>
            {config.label === "Download your information" && (
              <Divider label="Manage your data" />
            )}
            <FormLayout
              key={index}
              layout={config.layout || "vertical"}
              label={config.label}
              description={config.description}
              input={config.input}
            />
          </>
        );
      })}
    </Stack>
  );
};

export default AccountSetting;
