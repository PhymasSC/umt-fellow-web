import {
  ActionIcon,
  Grid,
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
import { IconCheck, IconEdit, IconTrash, IconX } from "@tabler/icons";

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

      try {
        await editUser({
          variables: {
            id: session?.user.id,
            [argType]: form.values.val,
            updated_at: new Date().toISOString(),
          },
        });
        notifications.show({
          title: "Success",
          message: "Successfully updated!",
          color: "teal",
          icon: <IconCheck />,
        });
      } catch (err: any) {
        notifications.show({
          title: "Error",
          message: err.message,
          color: "red",
          icon: <IconX />,
        });
      }
      setLoading(false);
      form.resetDirty();
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    await editUser({
      variables: {
        id: session?.user.id,
        [argType]: "",
        updated_at: new Date().toISOString(),
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
        {isLongText ? (
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
