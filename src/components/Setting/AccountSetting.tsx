import {
  Stack,
  TextInput,
  Text,
  Button,
  PasswordInput,
  Avatar,
  Title,
  Textarea,
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
import Input from "./Input";
import NumberInput from "./NumberInput";

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
    data,
    loading,
  }: { data: { getUser: USER_TYPE } | undefined; loading: boolean } = useQuery(
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
  const userData: USER_TYPE | undefined = data?.getUser;
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
          <Avatar
            radius="999rem"
            size="xl"
            src={userData?.image || session?.user.image || null}
          />
        </Dropzone>
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
            val: (val) =>
              val.length < 3
                ? "Name must be at least 3 characters long"
                : val.length > 50 &&
                  "Name must be less than 50 characters long",
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
            val: (val) =>
              val.length > 500 && "About must be less than 500 characters long",
          }}
          minRows={5}
          maxRows={10}
          isLongText
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
            val: (val) => {
              if (val.length > 500)
                return "About must be less than 500 characters long";
            },
          }}
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
            val: (val) => {
              if (val.length > 500)
                return "About must be less than 500 characters long";
            },
          }}
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
          validate={{
            val: (val) =>
              val.length > 500 && "About must be less than 500 characters long",
          }}
          minRows={5}
          maxRows={10}
          isLongText
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
            val: (val) => {
              if (val.length > 500)
                return "About must be less than 500 characters long";
            },
          }}
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
            val: (val) => {
              if (val.length > 500)
                return "About must be less than 500 characters long";
            },
          }}
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
        />
      ),
    },
    {
      label: <Title order={2}>Social Media</Title>,
      description:
        "This section allows you to update your social media links. These links will be displayed on your profile, so that other users can easily find you on other social media platforms.",
      input: (
        <Stack>
          <SettingLayout
            layout="horizontal"
            label="Facebook"
            description="Update your Facebook link"
            input={
              <Input
                argType="facebookLink"
                placeholder={userData?.facebookLink || ""}
                value={userData?.facebookLink || ""}
                icon={<IconBrandFacebook strokeWidth={1} />}
                component={TextInput}
                deleteable
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Twitter"
            description="Update your Twitter link"
            input={
              <Input
                argType="twitterLink"
                placeholder={userData?.twitterLink || ""}
                icon={<IconBrandTwitter strokeWidth={1} />}
                component={TextInput}
                deleteable
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Instagram"
            description="Update your Instagram link"
            input={
              <Input
                argType="instagramLink"
                placeholder={userData?.instagramLink || ""}
                icon={<IconBrandInstagram strokeWidth={1} />}
                component={TextInput}
                deleteable
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Github"
            description="Update your Github link"
            input={
              <Input
                argType="githubLink"
                placeholder={userData?.githubLink || ""}
                icon={<IconBrandGithub strokeWidth={1} />}
                component={TextInput}
                deleteable
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Dribbble"
            description="Update your Dribbble link"
            input={
              <Input
                argType="dribbbleLink"
                placeholder={userData?.dribbbleLink || ""}
                icon={<IconBrandDribbble strokeWidth={1} />}
                component={TextInput}
                deleteable
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Youtube"
            description="Update your Youtube link"
            input={
              <Input
                argType="youtubeLink"
                placeholder={userData?.youtubeLink || ""}
                icon={<IconBrandYoutube strokeWidth={1} />}
                component={TextInput}
                deleteable
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Telegram"
            description="Update your Telegram link"
            input={
              <Input
                argType="telegramLink"
                placeholder={userData?.telegramLink || ""}
                icon={<IconBrandTelegram strokeWidth={1} />}
                component={TextInput}
                deleteable
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Tiktok"
            description="Update your Tiktok link"
            input={
              <Input
                argType="tiktokLink"
                placeholder={userData?.tiktokLink || ""}
                icon={<IconBrandTiktok strokeWidth={1} />}
                component={TextInput}
                deleteable
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Reddit"
            description="Update your Reddit link"
            input={
              <Input
                argType="redditLink"
                placeholder={userData?.redditLink || ""}
                icon={<IconBrandReddit strokeWidth={1} />}
                component={TextInput}
                deleteable
              />
            }
          />
          <SettingLayout
            layout="horizontal"
            label="Snapchat"
            description="Update your Snapchat link"
            input={
              <Input
                argType="snapchatLink"
                placeholder={userData?.snapchatLink || ""}
                icon={<IconBrandSnapchat strokeWidth={1} />}
                component={TextInput}
                deleteable
              />
            }
          />
        </Stack>
      ),
    },
    {
      label: "Password",
      description: "Change the password used to log in to your account.",
      input: <Input argType="password" component={PasswordInput} />,
    },
    {
      label: "Delete Account",
      description: "Permanently delete your account and all associated data",
      layout: "horizontal",
      input: (
        <Button
          w="100%"
          variant="outline"
          color="red"
          leftIcon={<IconTrash size="1em" />}
        >
          Delete Account
        </Button>
      ),
    },
  ];

  console.log(userData);
  return (
    <Stack>
      {configuration.map((config, index) => {
        return (
          <SettingLayout
            key={index}
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
