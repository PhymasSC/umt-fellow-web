import { useMutation } from "@apollo/client";
import { NumberInput as Input, NumberInputProps } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormValidateInput } from "@mantine/form/lib/types";
import { useDebouncedValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { EDIT_USER } from "@operations/mutations";
import { IconCheck, IconX } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type InputProps = {
  layout?: "horizontal" | "vertical";
  value?: number;
  validate?:
    | FormValidateInput<{
        val: number;
      }>
    | undefined;
  errMsg?: string;
  deleteable?: boolean;
  isLongText?: boolean;
  argType: string;
} & NumberInputProps;

const NumberInput = (props: InputProps) => {
  const { argType, value, validate, errMsg, deleteable, isLongText, ...rest } =
    props;
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const form = useForm({
    initialValues: {
      val: value || 0,
    },
    validate,
  });
  const [debouncedValue] = useDebouncedValue(form.values.val, 1000);
  const [editUser] = useMutation(
    EDIT_USER({
      [argType]: true,
    })
  );

  const update = async () => {
    form.validate();
    if (!form.isValid()) return;
    setLoading(true);
    console.log(debouncedValue);
    console.log(typeof debouncedValue);
    try {
      await editUser({
        variables: {
          id: session?.user.id,
          [argType]: debouncedValue,
        },
      });
      notifications.show({
        title: "Success",
        message: "Successfully updated your profile!",
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
  };

  useEffect(() => {
    update();
  }, [debouncedValue]);

  return <Input {...form.getInputProps("val")} {...rest} />;
};

export default NumberInput;
