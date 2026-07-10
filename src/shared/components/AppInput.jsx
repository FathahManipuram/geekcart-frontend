import * as React from "react";

import { cn } from "@/lib/utils";

function AppInput({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-muted transition-[color,box-shadow, background-color] file:text-foreground placeholder:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-10 w-full min-w-0 rounded-sm border p-4 py-5 text-[16px] font-medium outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[16px] placeholder:font-normal disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { AppInput };
