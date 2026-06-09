import { useFormContext } from "react-hook-form";
import { RETURN_REASONS } from "../constants/returnReasons";

const ReturnReasonSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const reason = watch("reason");

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold text-lg mb-6">Return Reason</h2>

      <div className="space-y-3">
        {RETURN_REASONS.map((item) => (
          <label key={item} className="flex items-center gap-3">
            <input type="radio" value={item} {...register("reason")} />

            <span>{item}</span>
          </label>
        ))}
      </div>

      {errors.reason && (
        <p className="text-red-500 text-sm mt-2">{errors.reason.message}</p>
      )}

      {reason === "Other" && (
        <div className="mt-4">
          <textarea
            rows={4}
            {...register("customReason")}
            className="w-full border rounded-lg p-3"
            placeholder="Enter return reason"
          />

          {errors.customReason && (
            <p className="text-red-500 text-sm mt-1">
              {errors.customReason.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReturnReasonSection;
