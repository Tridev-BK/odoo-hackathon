import { cn } from "../../utils/cn.js";

export const Card = ({ className, ...props }) => (
  <div className={cn("glass rounded-lg", className)} {...props} />
);

export const CardHeader = ({ className, ...props }) => (
  <div className={cn("space-y-1.5 p-5", className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3 className={cn("text-lg font-semibold tracking-normal text-white", className)} {...props} />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn("p-5 pt-0", className)} {...props} />
);
