import {
  Avatar,
  Autocomplete,
  Group,
  SelectItemProps,
  Text,
  TextInput,
  Loader,
  AutocompleteItem,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconMoodCry, IconSearch } from "@tabler/icons";
import { useQuery } from "@apollo/client";
import { forwardRef, useState } from "react";

type SearchProps = {
  query: any;
  queryVar: any;
  valArg?: string;
  onItemSubmit?: (item: AutocompleteItem) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  limit?: number;
} & React.ComponentPropsWithoutRef<typeof TextInput>;

interface ItemProps extends SelectItemProps {
  id: string;
  name: string;
  image: string;
  email: string;
}
const Search = (props: SearchProps) => {
  const {
    query,
    queryVar,
    valArg,
    placeholder,
    onItemSubmit,
    limit = 5,
  } = props;
  const [value, setValue] = useState("");
  const debouncedValue = useDebouncedValue(value, 250);
  const { loading, data, refetch } = useQuery(query, {
    variables: { ...queryVar, name: debouncedValue[0], limit: limit },
  });
  // const { loading, data, refetch } = useQuery(GET_USERS_BY_NAME("id"), {
  //   variables: { name: debouncedValue[0], limit: limit },
  // });

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

  function buildOptions(item: {
    userId: { id: string; name: string; image: string };
  }) {
    console.log(item);
    return {
      ...item.userId,
      value: item.userId.name,
    };
  }
  return (
    <Autocomplete
      limit={limit}
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
        if (onItemSubmit) {
          onItemSubmit(item);
          setValue("");
        }
      }}
      filter={(value, item) => true}
      onChange={(val) => {
        setValue(val);
        refetch({ name: debouncedValue[0], limit });
      }}
      rightSection={loading && <Loader size="xs" />}
      nothingFound={
        <Group position="center">
          <IconMoodCry size={18} />
          No users found
        </Group>
      }
      data={(data && data.getCommunityMembersByName.map(buildOptions)) || []}
    />
  );
};

export default Search;
