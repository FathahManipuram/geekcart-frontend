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

      <AppInput type={type} {...register(name)} {...props} />

      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default AppFormInput;
