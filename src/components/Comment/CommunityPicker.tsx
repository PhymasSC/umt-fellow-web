import { useQuery } from "@apollo/client";
import {
  Autocomplete,
  Avatar,
  Group,
  SelectItemProps,
  Text,
} from "@mantine/core";
import { GET_COMMUNITIES_FOLLOWED_BY_USER } from "@operations/queries";
import { IconSocial } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { forwardRef } from "react";

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

const CommunityPicker = () => {
  const { data: session } = useSession();
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
  return (
    <>
      <Autocomplete
        icon={<IconSocial size={14} />}
        placeholder="Pick a community"
        itemComponent={AutoCompleteItem}
        limit={5}
        data={
          (loading && []) || [
            ...data?.getCommunitiesFollowedByUser.map(buildOptions),
            ...[
              {
                id: session?.user.id,
                name: session?.user.name,
                value: session?.user.name,
                avatar: session?.user.image,
                group: "Personal space",
              },
            ],
          ]
        }
        onItemSubmit={(item) => {}}
        // filter={(value, item) =>
        //   item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
        //   item.description.toLowerCase().includes(value.toLowerCase().trim())
        // }
      />
    </>
  );
};

export default CommunityPicker;
