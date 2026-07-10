import { useFormContext } from "react-hook-form";
import { AppInput } from "../AppInput";
import { Label } from "../ui/label";

const AppFormInput = ({ name, label, type = "text", ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      {label && <Label className="uppercase">{label}</Label>}

      <AppInput
        type={type}
        {...register(name, {
          setValueAs: (value) => {
            if (type !== "number") return value;
            return value === "" ? null : Number(value);
          },
        })}
        {...props}
      />

      {errors[name] && (
        <p className="text-sm text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default AppFormInput;
