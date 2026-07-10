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
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold">Return Reason</h2>

      <div className="space-y-3">
        {RETURN_REASONS.map((item) => (
          <label key={item} className="flex items-center gap-3">
            <input type="radio" value={item} {...register("reason")} />

            <span>{item}</span>
          </label>
        ))}
      </div>

      {errors.reason && (
        <p className="mt-2 text-sm text-red-500">{errors.reason.message}</p>
      )}

      {reason === "Other" && (
        <div className="mt-4">
          <textarea
            rows={4}
            {...register("customReason")}
            className="w-full rounded-lg border p-3"
            placeholder="Enter return reason"
          />

          {errors.customReason && (
            <p className="mt-1 text-sm text-red-500">
              {errors.customReason.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReturnReasonSection;
