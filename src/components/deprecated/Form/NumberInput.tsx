import { useMutation } from "@apollo/client";
import { ActionIcon, Flex, NumberInput, NumberInputProps } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormValidateInput } from "@mantine/form/lib/types";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconEdit, IconX } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type InputProps = {
  layout?: "horizontal" | "vertical";
  value?: number;
  validate?: FormValidateInput<{ val: number }> | undefined;
  errMsg?: string;
  deleteable?: boolean;
  isLongText?: boolean;
  argType: string;
  mutation: any;
  variables: object;
} & NumberInputProps;

const CustomNumberInput = (props: InputProps) => {
  const {
    argType,
    value,
    validate,
    errMsg,
    deleteable,
    isLongText,
    mutation,
    variables,
    ...rest
  } = props;

  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const form = useForm({
    initialValues: {
      val: value || 0,
    },
    validate,
  });

  const [mutate] = useMutation(mutation);

  const handleUpdate = async () => {
    form.validate();
    if (!form.isValid()) return;

    setLoading(true);
    try {
      const { val } = form.values;
      const mutationVariables = {
        [argType]: val,
        updated_at: new Date().toISOString(),
        ...variables,
      };

      await mutate({
        variables: mutationVariables,
      });
      notifications.show({
        title: "Success",
        message: "Successfully updated your profile!",
        color: "teal",
        icon: <IconCheck />,
      });
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
        icon: <IconX />,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    form.setFieldValue("val", value || 0);
  }, [value]);

  return (
    <Flex justify="space-between" gap="md">
      <NumberInput
        sx={{
          width: "100%",
        }}
        {...form.getInputProps("val")}
        {...rest}
      />
      <ActionIcon color="blue" loading={loading} onClick={handleUpdate}>
        <IconEdit size={20} />
      </ActionIcon>
    </Flex>
  );
};

export default CustomNumberInput;
