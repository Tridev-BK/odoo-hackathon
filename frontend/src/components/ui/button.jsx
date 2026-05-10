import { cva } from "class-variance-authority";
import { cloneElement, isValidElement } from "react";
import { cn } from "../../utils/cn.js";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-cyan-400 text-slate-950 shadow-glow hover:bg-cyan-300",
        secondary: "bg-white/10 text-white hover:bg-white/15",
        ghost: "text-slate-300 hover:bg-white/10 hover:text-white",
        danger: "bg-rose-500/15 text-rose-200 hover:bg-rose-500/25"
      },
      size: {
        sm: "h-9 px-3",
        md: "h-11 px-5",
        lg: "h-12 px-6"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export const Button = ({ asChild = false, className, variant, size, children, ...props }) => {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: cn(classes, children.props.className),
      ...props
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
