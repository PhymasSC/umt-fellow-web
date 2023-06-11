import { FormLayout } from "@components/Form";
import { Grid } from "@mantine/core";

type FormLayoutProps = {
  layout: "horizontal" | "vertical";
  label: string | React.ReactNode;
  description: string;
  input: React.ReactNode;
};

const Form: FormLayoutProps[] = [
  {
    layout: "horizontal",
    label: "Name",
    description: "Name of the community",
    input: <></>,
  },
  {
    layout: "horizontal",
    label: "Description",
    description: "Description of the community",
    input: <></>,
  },
  {
    layout: "horizontal",
    label: "Avatar",
    description: "Avatar of the community",
    input: <></>,
  },
  {
    layout: "horizontal",
    label: "Banner",
    description: "Banner of the community",
    input: <></>,
  },
];
const NewCommunity = () => {
  return (
    <form>
      {Form.map((form, index) => (
        <FormLayout
          key={index}
          layout={form.layout}
          label={form.label}
          description={form.description}
          input={form.input}
        />
      ))}
    </form>
  );
};

export default NewCommunity;
