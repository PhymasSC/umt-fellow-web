import {
  Stack,
  TextInput,
  Text,
  Button,
  PasswordInput,
  Title,
  Textarea,
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
  IconTrash,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@operations/queries";
import { Input, NumberInput, FormLayout } from "../Form";
import { EDIT_USER } from "@operations/mutations";
import ImageInput from "@components/Form/ImageInput";

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
    loading,
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
      label: "Password",
      description: "Change the password used to log in to your account.",
      input: (
        <Input
          argType="password"
          component={PasswordInput}
          mutation={EDIT_USER({ password: true })}
          variables={{ id: session?.user.id }}
        />
      ),
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

  console.log(session);
  return (
    <Stack>
      {configuration.map((config, index) => {
        return (
          <FormLayout
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
