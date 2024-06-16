import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

const typographyVariants = cva("", {
  variants: {
    variant: {
      default: "text-base leading-6 text-gray-900 dark:text-gray-100",
      accent: "text-accent-foreground",
      warning: "text-destructive",
      info: "text-primary",
      muted: "text-muted-foreground",
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
  },
  defaultVariants: {
    variant: "default",
    size: "base",
  },
});

const elementStyles = {
  p: "mb-4",
  h1: "text-4xl font-extrabold mb-4",
  h2: "text-3xl font-bold mb-3",
  h3: "text-2xl font-semibold mb-3",
  h4: "text-xl font-semibold mb-2",
  h5: "text-lg font-medium mb-2",
  h6: "text-base font-medium mb-1",
  ul: "list-disc pl-5 mb-4",
  ol: "list-decimal pl-5 mb-4",
  li: "mb-1",
  blockquote: "border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4",
  a: "text-blue-500 hover:underline",
};

interface TypographyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    const applyStylesRecursive = (child: React.ReactNode): React.ReactNode => {
      if (React.isValidElement(child)) {
        let elementType = child.type as keyof typeof elementStyles;
        if (child.type === Link) elementType = "a";
        const childClassName = elementStyles[elementType] || "";
        const updatedChild = React.cloneElement(child, {
          ...child.props,
          className: cn(
            typographyVariants({ variant, size }),
            childClassName,
            child.props.className
          ),
        }) as React.ReactElement;

        const processedChildren = React.Children.map(
          updatedChild.props.children,
          applyStylesRecursive
        );
        return React.cloneElement(updatedChild, {
          children: processedChildren,
        });
      }
      return child;
    };

    const processedChildren = React.Children.map(
      children,
      applyStylesRecursive
    );

    return (
      <div
        ref={ref}
        className={cn(typographyVariants({ variant, size }), className)}
        {...props}
      >
        {processedChildren}
      </div>
    );
  }
);

export { Typography, typographyVariants };
