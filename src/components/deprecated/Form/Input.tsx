import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  Grid,
  ActionIcon,
  TextInputProps,
  TextareaProps,
  Loader,
} from "@mantine/core";
import { IconCheck, IconEdit, IconTrash, IconX } from "@tabler/icons";

type InputProps = {
  layout?: "horizontal" | "vertical";
  value?: string;
  validate?: any;
  errMsg?: string;
  deleteable?: boolean;
  isLongText?: boolean;
  component: React.FC<any>;
  argType: string;
  mutation: any;
  variables: object;
  onCompleted?: (val: string) => void;
} & TextInputProps &
  TextareaProps;

const Input = ({
  layout,
  argType,
  value,
  validate,
  errMsg,
  deleteable,
  isLongText,
  component: Element,
  mutation,
  variables,
  ...props
}: InputProps) => {
  const form = useForm({
    initialValues: {
      val: value || "",
    },
    validate,
  });
  const [loading, setLoading] = useState(false);
  const [mutate] = useMutation(mutation);

  const handleUpdate = async () => {
    form.validate();
    if (form.isValid()) {
      setLoading(true);

      try {
        const { val } = form.values;
        await mutate({
          variables: {
            [argType]: val,
            updated_at: new Date().toISOString(),
            ...variables,
          },
        });

        notifications.show({
          title: "Success",
          message: "Successfully updated!",
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
      form.resetDirty();

      if (props.onCompleted) props.onCompleted(form.values.val);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    await mutate({
      variables: {
        [argType]: "",
        ...variables,
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleUpdate();
    }
  };

  useEffect(() => {
    form.setFieldValue("val", value || "");
  }, [value]);

  return (
    <Grid>
      <Grid.Col span="auto">
        <Element
          mt={layout === "vertical" ? "-1em" : "0"}
          mb={layout === "vertical" ? "1em" : "0"}
          onKeyDown={handleKeyDown}
          rightSection={
            (loading && <Loader size="xs" />) || (
              <ActionIcon color="blue" onClick={handleUpdate}>
                <IconEdit size="1.2em" />
              </ActionIcon>
            )
          }
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
