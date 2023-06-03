import {
  Stack,
  TextInput,
  Grid,
  Button,
  PasswordInput,
  Avatar,
  Title,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
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
  IconTrash,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import SettingLayout from "./SettingLayout";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@operations/queries";
import { useState } from "react";

type USER_TYPE = {
  id: string;
  name: string;
  email: string;
  image: string;
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
  const { data: session } = useSession();
  //   const { profileImage, setProfileImage } = useState(null);
  const {
    data: userData,
    loading,
  }: { data: USER_TYPE | undefined; loading: boolean } = useQuery(
    GET_USER(`
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
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          maxFiles={1}
          onDrop={() => {}}
          sx={{
            position: "relative",
            borderRadius: "999rem",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <Avatar radius="999rem" size="xl" src={session?.user.image || null} />
        </Dropzone>
      ),
    },
    {
      label: "Display Name",
      description:
        "The name displayed on your profile and @mention by other users",
      layout: "horizontal",
      input: (
        <TextInput
          mt="-1em"
          mb="1em"
          type="text"
          placeholder={session?.user.name || ""}
        ></TextInput>
      ),
    },
    {
      label: "Email Address",
      description: "Update the email address associated with your account",
      layout: "horizontal",
      input: (
        <TextInput
          mt="-1em"
          mb="1em"
          type="email"
          placeholder={session?.user.email || ""}
        />
      ),
    },
    {
      label: <Title order={2}>Social Media</Title>,
      description: "Update your social media links",
      input: (
        <Stack>
          <SettingLayout
            layout="horizontal"
            label="Facebook"
            description="Update your Facebook link"
            input={
              <TextInput
                placeholder={userData?.facebookLink || ""}
                icon={<IconBrandFacebook strokeWidth={1} />}
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Twitter"
            description="Update your Twitter link"
            input={
              <TextInput
                placeholder={userData?.twitterLink || ""}
                icon={<IconBrandTwitter strokeWidth={1} />}
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Instagram"
            description="Update your Instagram link"
            input={
              <TextInput
                placeholder={userData?.instagramLink || ""}
                icon={<IconBrandInstagram strokeWidth={1} />}
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Github"
            description="Update your Github link"
            input={
              <TextInput
                placeholder={userData?.githubLink || ""}
                icon={<IconBrandGithub strokeWidth={1} />}
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Dribbble"
            description="Update your Dribbble link"
            input={
              <TextInput
                placeholder={userData?.dribbbleLink || ""}
                icon={<IconBrandDribbble strokeWidth={1} />}
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Youtube"
            description="Update your Youtube link"
            input={
              <TextInput
                placeholder={userData?.youtubeLink || ""}
                icon={<IconBrandYoutube strokeWidth={1} />}
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Telegram"
            description="Update your Telegram link"
            input={
              <TextInput
                placeholder={userData?.telegramLink || ""}
                icon={<IconBrandTelegram strokeWidth={1} />}
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Tiktok"
            description="Update your Tiktok link"
            input={
              <TextInput
                placeholder={userData?.tiktokLink || ""}
                icon={<IconBrandTiktok strokeWidth={1} />}
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Reddit"
            description="Update your Reddit link"
            input={
              <TextInput
                placeholder={userData?.redditLink || ""}
                icon={<IconBrandReddit strokeWidth={1} />}
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Snapchat"
            description="Update your Snapchat link"
            input={
              <TextInput
                placeholder={userData?.snapchatLink || ""}
                icon={<IconBrandSnapchat strokeWidth={1} />}
              />
            }
          />
        </Stack>
      ),
    },
    {
      label: "Password",
      description: "Change the password used to log in to your account.",
      input: <PasswordInput />,
    },
    {
      label: "Delete Account",
      description: "Permanently delete your account and all associated data",
      layout: "horizontal",
      input: (
        <Button color="red" leftIcon={<IconTrash />}>
          Delete Account
        </Button>
      ),
    },
  ];

  console.log(userData);
  return (
    <Stack>
      {configuration.map((config) => {
        return (
          <SettingLayout
            layout={config.layout || "vertical"}
            label={config.label}
            description={config.description}
            input={config.input}
          />
        );
      })}
    </Stack>
  );
};

export default AccountSetting;
