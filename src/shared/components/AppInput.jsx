import * as React from "react"

import { cn } from "@/lib/utils"

function AppInput({
  className,
  type,
  ...props
}) {
  return (
	<input
	  type={type}
	  data-slot="input"
	  className={cn(
		"h-10 rounded-sm p-4 bg-muted w-full min-w-0 border py-5 text-[16px] font-medium transition-[color,box-shadow, background-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground placeholder:text-[16px] placeholder:font-normal disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
		className
	  )}
	  {...props} />
  );
}

export { AppInput }
