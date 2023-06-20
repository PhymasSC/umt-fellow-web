import { useMutation } from "@apollo/client";
import {
  ActionIcon,
  Button,
  Center,
  Grid,
  Stack,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { ADD_COMMUNITY_RULE } from "@operations/mutations";
import {
  IconAlertCircle,
  IconCheck,
  IconCirclePlus,
  IconEditCircle,
  IconTrash,
} from "@tabler/icons";
import { useState } from "react";

interface KeyValueInputProps {
  _key: string;
  value: string;
  data: {
    id: string;
    rule: string;
    description: string;
  }[];
  communityId: string;
}

const Component = (props: {
  _key: string;
  _value: string;
  communityId: string;
  ruleId: string;
}) => {
  const [ruleId, setRuleId] = useState(props.ruleId);
  const [addRule] = useMutation(ADD_COMMUNITY_RULE);
  const form = useForm({
    initialValues: {
      rule: props._key,
      description: props._value,
    },
  });
  return (
    <Stack>
      <Grid>
        <Grid.Col span={3}>
          <Textarea
            minRows={1}
            maxRows={1}
            label={"Rule"}
            {...form.getInputProps("rule")}
          />
        </Grid.Col>
        <Grid.Col span={8}>
          <Textarea
            minRows={1}
            maxRows={5}
            label={"Description"}
            {...form.getInputProps("description")}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <Center
            style={{
              height: "100%",
            }}
          >
            <ActionIcon
              color="blue"
              onClick={async () => {
                if (ruleId !== "") {
                  return;
                }
                const res = await addRule({
                  variables: {
                    communityId: props.communityId,
                    rules: {
                      rule: form.values.rule,
                      description: form.values.description,
                    },
                  },
                });
                setRuleId(res.data.addCommunityRule.id);
                notifications.show({
                  title: "Rule added",
                  message: "Rule added successfully",
                  color: "blue",
                  icon: <IconCheck />,
                });
              }}
            >
              <IconEditCircle />
            </ActionIcon>
            <ActionIcon color="red">
              <IconTrash />
            </ActionIcon>
            {/* <ActionIcon onClick={remove}>
              <IconCircleMinus />
            </ActionIcon> */}
          </Center>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

const KeyValueInput: React.FC<KeyValueInputProps> = (props) => {
  const [items, setItems] = useState(
    (props?.data.length > 0 && [...props.data]) || [
      { id: "", rule: "", description: "" },
    ]
  );
  const addMore = () => {
    if (items.length >= 10)
      return notifications.show({
        title: "Maximum 10 rules",
        message: "You can only have 10 rules",
        color: "orange",
        icon: <IconAlertCircle />,
      });
    return setItems((prev) => [
      ...prev,
      {
        id: "",
        rule: "",
        description: "",
      },
    ]);
  };

  return (
    <>
      {items.map((item) => {
        return (
          <Component
            key={item.id}
            ruleId={item.id}
            _key={item.rule}
            _value={item.description}
            communityId={props.communityId}
          />
        );
      })}
      <Button
        my="1em"
        w={"20%"}
        onClick={addMore}
        variant="default"
        leftIcon={<IconCirclePlus />}
      >
        Add more
      </Button>
    </>
  );
};

export default KeyValueInput;
