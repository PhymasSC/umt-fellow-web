import { PRIMARY_COLOR } from "@constants/colors";
import { createStyles } from "@mantine/core";

export const HEADER_HEIGHT = 60;

export const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? `${theme.colors.dark[7]}CC`
        : `${theme.colors.gray[0]}CC`,
    backdropFilter: "blur(5px)",
    zIndex: 999,
  },

  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    [theme.fn.smallerThan("sm")]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[0]
        : theme.colors[PRIMARY_COLOR][6],

    "&:hover": {
      color:
        theme.colorScheme === "dark"
          ? theme.colors[PRIMARY_COLOR][4]
          : theme.colors[PRIMARY_COLOR][7],
    },
    textDecoration: "none",
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 99,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
    flexWrap: "nowrap",
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
    position: "absolute",
    left: 20,
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
      height: "100%",
      width: "100%",
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).color,
    },
  },

  toggler: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
    position: "absolute",
    right: 20,
  },
}));
