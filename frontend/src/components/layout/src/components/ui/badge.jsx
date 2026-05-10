import { cn } from "../../utils/cn.js";

export const Badge = ({ className, ...props }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1 text-xs font-medium text-cyan-100",
      className
    )}
    {...props}
  />
);
