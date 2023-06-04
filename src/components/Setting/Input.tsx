import {
  ActionIcon,
  Grid,
  NumberInput,
  NumberInputProps,
  Textarea,
  TextareaProps,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "@operations/mutations";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { FormValidateInput } from "@mantine/form/lib/types";
import { IconEdit, IconTrash } from "@tabler/icons";

type InputProps = {
  layout?: "horizontal" | "vertical";
  value?: string | number;
  validate?:
    | FormValidateInput<{
        val: string;
      }>
    | undefined;
  errMsg?: string;
  deleteable?: boolean;
  isLongText?: boolean;
  argType: string;
} & TextInputProps &
  TextareaProps &
  NumberInputProps;

const Input = ({
  layout,
  argType,
  value,
  validate,
  errMsg,
  deleteable,
  isLongText,
  ...props
}: InputProps) => {
  const form = useForm({
    initialValues: {
      val: value?.toString() || "",
    },
    validate,
  });
  const [loading, setLoading] = useState(false);
  const [editUser] = useMutation(
    EDIT_USER({
      [argType]: true,
    })
  );
  const { data: session } = useSession();

  const update = async () => {
    form.validate();
    if (form.isValid()) {
      setLoading(true);
      await editUser({
        variables: {
          id: session?.user.id,
          [argType]: form.values.val,
        },
      });
      setLoading(false);
      notifications.show({
        title: "Success",
        message: "Successfully updated",
        color: "green",
      });
      form.resetDirty();
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    await editUser({
      variables: {
        id: session?.user.id,
        [argType]: "",
      },
    });
    setLoading(false);
    notifications.show({
      title: "Success",
      message: "Successfully updated",
      color: "green",
    });
    form.resetDirty();
  };

  return (
    <Grid>
      <Grid.Col span="auto">
        {typeof value === "number" ? (
          <NumberInput disabled={loading} onChange={update} {...props} />
        ) : isLongText ? (
          <Textarea
            mt={(layout === "vertical" && "-1em") || "0"}
            mb={(layout === "vertical" && "1em") || "0"}
            disabled={loading}
            rightSection={
              <ActionIcon color="blue" onClick={update}>
                <IconEdit size="1.2em" />
              </ActionIcon>
            }
            {...form.getInputProps("val")}
            {...props}
          />
        ) : (
          <TextInput
            mt={(layout === "vertical" && "-1em") || "0"}
            mb={(layout === "vertical" && "1em") || "0"}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                update();
              }
            }}
            rightSection={
              <ActionIcon color="blue" onClick={update}>
                <IconEdit size="1.2em" />
              </ActionIcon>
            }
            {...form.getInputProps("val")}
            {...props}
          />
        )}
      </Grid.Col>
      {deleteable && (
        <Grid.Col
          span={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActionIcon color="red" onClick={handleDelete}>
            <IconTrash size="1.2em" />
          </ActionIcon>
        </Grid.Col>
      )}
    </Grid>
  );
};

export default Input;
