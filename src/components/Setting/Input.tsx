import { Loader, TextInput, TextInputProps } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "@operations/mutations";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { notifications } from "@mantine/notifications";

type InputProps = {
  layout?: "horizontal" | "vertical";
  value?: string;
  argType: string;
} & TextInputProps;

const Input = ({ layout, argType, value, ...props }: InputProps) => {
  const [val, setVal] = useState(value || "");
  const [loading, setLoading] = useState(false);
  const [debouncedValue] = useDebouncedValue(val, 1000);
  const [editUser] = useMutation(
    EDIT_USER({
      [argType]: true,
    })
  );
  const { data: session } = useSession();
  useEffect(() => {
    const update = async () => {
      setLoading(true);
      const res = await editUser({
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
    };

    if (debouncedValue) update().catch((err) => console.log(err));
  }, [debouncedValue]);

  return (
    <TextInput
      mt={(layout === "vertical" && "-1em") || "0"}
      mb={(layout === "vertical" && "1em") || "0"}
      value={val}
      onChange={(event) => setVal(event.currentTarget.value)}
      disabled={loading}
      rightSection={loading && <Loader size="xs" />}
      {...props}
    />
  );
};

export default Input;
