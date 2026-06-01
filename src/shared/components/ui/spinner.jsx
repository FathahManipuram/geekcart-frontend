import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"

function Spinner({
  className,
  ...props
}) {
  return (
    <Loader
      role="status"
      aria-label="Loading"
      className={cn("size-14 animate-spin", className)}
      {...props} />
  );
}

export { Spinner }
