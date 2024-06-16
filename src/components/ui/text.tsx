import * as React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const textVariants = cva("text-base leading-6 font-normal", {
  variants: {
    variant: {
      default: "",
      accent: "text-accent-foreground",
      warning: "text-destructive",
      info: "text-primary",
      muted: "text-muted-foreground",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    trim: {
      none: "whitespace-normal",
      normal: "whitespace-normal",
      words: "whitespace-normal",
      chars: "whitespace-normal",
      lines: "whitespace-normal",
      truncate: "whitespace-nowrap overflow-hidden",
    },
    truncate: {
      none: "truncate-none",
      normal: "truncate-none",
      words: "truncate-words",
      chars: "truncate-chars",
      lines: "truncate-lines",
      truncate: "truncate",
    },
    wrap: {
      none: "overflow-ellipsis whitespace-nowrap",
      normal: "overflow-ellipsis whitespace-nowrap",
      words: "overflow-ellipsis whitespace-nowrap",
      chars: "overflow-ellipsis whitespace-nowrap",
      lines: "overflow-ellipsis whitespace-nowrap",
      truncate: "overflow-ellipsis whitespace-nowrap",
    },
    size: {
      xs: "text-xs leading-4",
      sm: "text-sm leading-5",
      base: "text-base leading-6",
      lg: "text-lg leading-7",
      xl: "text-xl leading-8",
      "2xl": "text-2xl leading-9",
      "3xl": "text-3xl leading-10",
      "4xl": "text-4xl leading-11",
      "5xl": "text-5xl leading-12",
      "6xl": "text-6xl leading-13",
      "7xl": "text-7xl leading-14",
      "8xl": "text-8xl leading-15",
      "9xl": "text-9xl leading-16",
    },
    weight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      size,
      align,
      trim,
      truncate,
      wrap,
      variant,
      weight,
      style,
      as: Element = "p",
      ...props
    },
    ref
  ) => {
    const calculatedWeight =
      weight ||
      (Element === "h1"
        ? "extrabold"
        : Element === "h2"
        ? "bold"
        : Element === "h3"
        ? "semibold"
        : Element === "h4"
        ? "semibold"
        : Element === "h5"
        ? "medium"
        : Element === "h6"
        ? "medium"
        : ["span", "div"].includes(Element)
        ? "medium"
        : "normal");

    return (
      <Element
        ref={ref}
        className={cn(
          textVariants({
            size,
            variant,
            weight: calculatedWeight,
            align,
            trim,
            truncate,
            wrap,
          }),
          className
        )}
        style={{ ...style }}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants };
