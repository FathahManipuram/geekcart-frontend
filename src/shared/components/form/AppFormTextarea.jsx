import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

const AppFormTextarea = ({ name, label, required = false, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.[name]?.message;

  return (
    <div className="space-y-1">
      {label && (
        <Label className="uppercase">
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
      )}

      <Textarea
        id={name}
        aria-invalid={!!errorMessage}
        {...register(name)}
        {...props}
      />

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default AppFormTextarea;
