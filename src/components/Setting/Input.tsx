import { Loader, TextInput, TextInputProps } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "@operations/mutations";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { FormValidateInput } from "@mantine/form/lib/types";
import { isErrored } from "stream";

type InputProps = {
  layout?: "horizontal" | "vertical";
  value?: string;
  validate?:
    | FormValidateInput<{
        val: string;
      }>
    | undefined;
  errMsg?: string;
  argType: string;
} & TextInputProps;

const Input = ({
  layout,
  argType,
  value,
  validate,
  errMsg,
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

  return (
    <>
      <TextInput
        mt={(layout === "vertical" && "-1em") || "0"}
        mb={(layout === "vertical" && "1em") || "0"}
        disabled={loading}
        rightSection={loading && <Loader size="xs" />}
        {...form.getInputProps("val")}
        {...props}
      />
    </>
  );
};

export default Input;
