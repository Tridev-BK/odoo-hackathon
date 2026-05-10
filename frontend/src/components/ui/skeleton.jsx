import { cn } from "../../utils/cn.js";

export const Skeleton = ({ className, ...props }) => (
  <div className={cn("animate-pulse rounded-lg bg-white/10", className)} {...props} />
);
