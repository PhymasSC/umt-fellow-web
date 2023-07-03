import {
  UnstyledButton,
  Checkbox,
  Text,
  Image,
  createStyles,
  rem,
  Tooltip,
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";

const useStyles = createStyles((theme, { checked }: { checked: boolean }) => ({
  button: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    transition: "background-color 150ms ease, border-color 150ms ease",
    border: `${rem(1)} solid ${
      checked
        ? theme.fn.variant({ variant: "outline", color: theme.primaryColor })
            .border
        : theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    backgroundColor: checked
      ? theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .background
      : theme.colorScheme === "dark"
      ? theme.colors.dark[8]
      : theme.white,
  },

  body: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
}));

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: string;
  image: string;
}

const ImageCheckbox = ({
  checked,
  defaultChecked,
  onChange,
  title,
  description,
  className,
  image,
  ...others
}: ImageCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof ImageCheckboxProps>) => {
  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  const { classes, cx } = useStyles({ checked: value });

  return (
    <Tooltip label={description} withArrow multiline bg="#333333aa">
      <UnstyledButton
        {...others}
        onClick={() => handleChange(!value)}
        className={cx(classes.button, className)}
      >
        <Image src={image} alt={title} width={40} />

        <div className={classes.body}>
          <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
            {title}
          </Text>
        </div>

        <Checkbox
          checked={value}
          onChange={() => {}}
          tabIndex={-1}
          styles={{ input: { cursor: "pointer" } }}
        />
      </UnstyledButton>
    </Tooltip>
  );
};

export default ImageCheckbox;
