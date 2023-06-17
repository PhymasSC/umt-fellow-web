import { useMutation } from "@apollo/client";
import { Avatar } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useState } from "react";

type ImageInputProps = {
  img?: string;
  isBanner?: boolean;
  imgName: string;
  argType: string;
  mutation: any;
  variables?: object;
  update?: any;
};

const ImageInput = (props: ImageInputProps) => {
  const { isBanner, img, imgName, argType, mutation, variables, update } =
    props;
  const [loading, setLoading] = useState(false);
  const [mutate] = useMutation(mutation);
  const form = useForm({
    initialValues: {
      img: "",
    },
  });

  const getBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader?.result?.toString() || "";
        resolve(baseURL);
      };
    });
  };

  return (
    <Dropzone
      accept={IMAGE_MIME_TYPE}
      maxFiles={1}
      onDrop={async (img) => {
        form.setValues({ img: URL.createObjectURL(img[0]) });
        setLoading(true);
        let blob = await getBase64(img[0]).then((res) => res);
        console.log(blob);
        try {
          await mutate({
            variables: {
              [argType]: {
                name: imgName,
                blob,
                isExisting: false,
                isDeleted: false,
              },
              ...variables,
            },
          });
          notifications.show({
            title: "Success",
            message: "Successfully updated!",
            color: "teal",
            icon: <IconCheck />,
          });
          if (update) update();
        } catch (error: any) {
          notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
            icon: <IconX />,
          });
        }
        setLoading(false);
      }}
      radius={(isBanner && "md") || 999}
      sx={{
        width: (!isBanner && "fit-content") || "100%",
      }}
      loading={loading}
    >
      <Avatar
        size="xl"
        src={form.values.img || img || null}
        onLoad={() => {
          URL.revokeObjectURL(form.values.img);
        }}
        radius={(isBanner && "md") || 999}
        sx={{
          width: (isBanner && "100%") || "min-content",
          height: (isBanner && "fit-content") || "",
        }}
      />
    </Dropzone>
  );
};

export default ImageInput;
