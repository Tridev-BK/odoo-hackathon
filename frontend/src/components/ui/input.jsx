import { cn } from "../../utils/cn.js";

export const Input = ({ className, ...props }) => (
  <input
    className={cn(
      "h-11 w-full rounded-lg border border-white/10 bg-white/8 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20",
      className
    )}
    {...props}
  />
);
