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
import {
  ADD_COMMUNITY_RULE,
  DELETE_COMMUNITY_RULE,
  UPDATE_COMMUNITY_RULE,
} from "@operations/mutations";
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
  onCreate: (ruleId: string, rule: string, description: string) => void;
  onDelete: (ruleId: string) => void;
}) => {
  const [ruleId, setRuleId] = useState(props.ruleId);
  const [addRule] = useMutation(ADD_COMMUNITY_RULE);
  const [updateRule] = useMutation(UPDATE_COMMUNITY_RULE);
  const [deleteRule] = useMutation(DELETE_COMMUNITY_RULE);
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
                  const res = await updateRule({
                    variables: {
                      ruleId: ruleId,
                      rules: {
                        rule: form.values.rule,
                        description: form.values.description,
                      },
                    },
                  });
                  notifications.show({
                    title: "Rule updated",
                    message: "Rule updated successfully",
                    color: "green",
                    icon: <IconCheck />,
                  });

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
                props.onCreate(
                  res.data.addCommunityRule.communityRules.id,
                  form.values.rule,
                  form.values.description
                );
                setRuleId(res.data.addCommunityRule.communityRules.id);
                notifications.show({
                  title: "Rule added",
                  message: "Rule added successfully",
                  color: "green",
                  icon: <IconCheck />,
                });
              }}
            >
              <IconEditCircle />
            </ActionIcon>
            <ActionIcon
              color="red"
              onClick={async () => {
                if (ruleId === "") return;
                const res = await deleteRule({
                  variables: {
                    ruleId: ruleId,
                  },
                });
                notifications.show({
                  title: "Rule deleted",
                  message: "Rule deleted successfully",
                  color: "green",
                  icon: <IconCheck />,
                });
                props.onDelete(ruleId);
              }}
            >
              <IconTrash />
            </ActionIcon>
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

    if (items.filter((i) => i.id === "").length > 0)
      return notifications.show({
        title: "Empty rule",
        message: "Please fill the empty rule",
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
            onCreate={(ruleId, rule, description) => {
              setItems((prev) =>
                prev.map((i) => {
                  if (i.id === "") {
                    console.log("found");
                    return {
                      id: ruleId,
                      rule: rule,
                      description: description,
                    };
                  }
                  return i;
                })
              );
            }}
            onDelete={(ruleId) => {
              setItems((prev) => prev.filter((i) => i.id !== ruleId));

              if (items.length === 1)
                setItems([{ id: "", rule: "", description: "" }]);
            }}
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
