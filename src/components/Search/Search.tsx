import {
  Avatar,
  Autocomplete,
  Group,
  SelectItemProps,
  Text,
  TextInput,
  Loader,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconMoodCry, IconSearch } from "@tabler/icons";
import { useQuery } from "@apollo/client";
import { GET_USERS_BY_NAME } from "@operations/queries";
import { forwardRef, useState } from "react";
import MessageButton from "@components/Message/MessageButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type SearchProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
} & React.ComponentPropsWithoutRef<typeof TextInput>;

interface ItemProps extends SelectItemProps {
  id: string;
  name: string;
  image: string;
  email: string;
}
const Search = (props: SearchProps) => {
  const { placeholder } = props;
  const [value, setValue] = useState("");
  const debouncedValue = useDebouncedValue(value, 250);
  const router = useRouter();
  const { data: session } = useSession();
  const { loading, data, refetch } = useQuery(GET_USERS_BY_NAME("id"), {
    variables: { name: debouncedValue[0], limit: 5 },
  });

  const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ id, name, image, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} radius="xl" />
          <div>
            <Text>{name}</Text>
            <Text size="xs" color="dimmed">
              @{id}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

  AutoCompleteItem.displayName = "@mantine/core/AutoCompleteItem";

  function buildOptions(item: { id: string; name: string; image: string }) {
    return {
      ...item,
      value: item.id,
    };
  }
  return (
    <Autocomplete
      limit={5}
      size={props.size || "md"}
      icon={
        <IconSearch
          size={
            (props.size === "xs" && 12) ||
            (props.size === "sm" && 14) ||
            (props.size === "lg" && 20) ||
            (props.size === "xl" && 24) ||
            16
          }
        />
      }
      placeholder={placeholder || "Search"}
      value={value}
      itemComponent={AutoCompleteItem}
      onItemSubmit={(item) => {
        fetch("/api/messages/create-channel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: session?.user.id,
            recipientId: item.id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            router.push(`/message/${data.channelId}`);
          });
        setValue("");
      }}
      filter={(value, item) => true}
      onChange={(val) => {
        setValue(val);
        refetch({ name: debouncedValue[0], limit: 5 });
      }}
      rightSection={loading && <Loader size="xs" />}
      nothingFound={
        <Group position="center">
          <IconMoodCry size={18} />
          No users found
        </Group>
      }
      data={data?.getUsersByName.map(buildOptions) || []}
    />
  );
};

export default Search;
