import {
  ActionIcon,
  Flex,
  Grid,
  Loader,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "@operations/mutations";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { FormValidateInput } from "@mantine/form/lib/types";
import { isErrored } from "stream";
import { IconTrash } from "@tabler/icons";

type InputProps = {
  layout?: "horizontal" | "vertical";
  value?: string;
  validate?:
    | FormValidateInput<{
        val: string;
      }>
    | undefined;
  errMsg?: string;
  deleteable?: boolean;
  argType: string;
} & TextInputProps;

const Input = ({
  layout,
  argType,
  value,
  validate,
  errMsg,
  deleteable,
  ...props
}: InputProps) => {
  const form = useForm({
    initialValues: {
      val: value || "",
    },
    validate,
  });
  const [loading, setLoading] = useState(false);
  const [debouncedValue] = useDebouncedValue(form.values.val, 1000);
  const [editUser] = useMutation(
    EDIT_USER({
      [argType]: true,
    })
  );

  const { data: session } = useSession();

  useEffect(() => {
    const update = async () => {
      setLoading(true);
      await editUser({
        variables: {
          id: session?.user.id,
          [argType]: debouncedValue,
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

    form.validate();
    if (debouncedValue && form.isValid("val")) {
      update().catch((err) => console.log(err));
    }
  }, [debouncedValue]);

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
        <TextInput
          mt={(layout === "vertical" && "-1em") || "0"}
          mb={(layout === "vertical" && "1em") || "0"}
          disabled={loading}
          rightSection={loading && <Loader size="xs" />}
          {...form.getInputProps("val")}
          {...props}
        />
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
