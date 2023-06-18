import { useQuery } from "@apollo/client";
import {
  Autocomplete,
  AutocompleteProps,
  Avatar,
  Group,
  SelectItemProps,
  Text,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { GET_COMMUNITIES_FOLLOWED_BY_USER } from "@operations/queries";
import { IconSocial } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { forwardRef, useEffect, useState } from "react";

interface ItemProps extends SelectItemProps {
  id: string;
  name: string;
  avatar: string;
  value: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, value, name, avatar, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar
          src={avatar.replace(
            "/community/avatar",
            "https://ik.imagekit.io/umtfellow/tr:h-600/community/avatar"
          )}
        />

        <div>
          <Text>{value}</Text>
        </div>
      </Group>
    </div>
  )
);

AutoCompleteItem.displayName = "@mantine/core/AutoCompleteItem";

interface FormValues {
  title: string;
  tags: string[];
  description: string;
  images: { id: string; imageUrl: string }[];
  community: string;
}

type CommunityPickerProps = {
  form: UseFormReturnType<FormValues>;
} & AutocompleteProps;

const CommunityPicker = (props: CommunityPickerProps) => {
  const { form, data: _, ...rest } = props;
  const { data: session } = useSession();
  const [list, setList] = useState<any[]>([]);
  const { loading, data } = useQuery(GET_COMMUNITIES_FOLLOWED_BY_USER, {
    variables: {
      userId: session?.user?.id,
    },
  });

  function buildOptions(item: { id: string; name: string; image: string }) {
    return {
      ...item,
      value: item.name,
      group: "Community",
    };
  }

  useEffect(() => {
    if (data)
      setList([
        ...[
          {
            id: session?.user.id,
            name: session?.user.name,
            value: session?.user.name,
            avatar: session?.user.image,
            group: "Personal space",
          },
        ],
        ...data?.getCommunitiesFollowedByUser.map(buildOptions),
      ]);
  }, [data]);
  return (
    <>
      <Autocomplete
        icon={<IconSocial size={14} />}
        placeholder="Pick a space"
        itemComponent={AutoCompleteItem}
        limit={5}
        data={(loading && []) || list}
        onItemSubmit={(item) => {
          form.setFieldValue("community", item.id);
        }}
        onChange={(value) => {
          if (list.some((item) => item.name === value)) {
            form.setFieldValue(
              "community",
              list.find((item) => item.name === value).id
            );
          } else {
            form.setValues({ community: "" });
          }
        }}
        error={form.errors.community}
        {...rest}
      />
    </>
  );
};

export default CommunityPicker;
