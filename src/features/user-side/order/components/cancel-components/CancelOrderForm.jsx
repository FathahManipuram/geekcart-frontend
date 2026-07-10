import { CANCEL_REASONS } from "../../constants/cancelReasons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cancelOrderSchema } from "../../validations/cancelOrder.validation";
import CancelOrderPreviewCard from "./CancelOrderPreviewCard";
import { Info } from "lucide-react";

const CancelOrderForm = ({
  order,
  item,
  onSubmit,
  onClose,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(cancelOrderSchema),
  });

  const reason = watch("reason");
  const onFormSubmit = async (data) => {
    const finalReason =
      data.reason === "Other" ? data.customReason : data.reason;

    await onSubmit(finalReason);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <CancelOrderPreviewCard order={order} item={item} />

      <div>
        <h4 className="mb-4 font-medium">Reason for cancellation</h4>

        <div className="space-y-3">
          {CANCEL_REASONS.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                value={item}
                {...register("reason")}
                className="accent-primary"
              />
              {item}
            </label>
          ))}
          {errors.reason && (
            <p className="text-sm text-red-500">{errors.reason.message}</p>
          )}
        </div>
      </div>

      {/* Other Reason */}

      {reason === "Other" && (
        <div>
          <textarea
            {...register("customReason")}
            placeholder="Enter reason"
            rows={4}
            className="w-full rounded-lg border p-3"
          />

          {errors.customReason && (
            <p className="text-sm text-red-500">
              {errors.customReason.message}
            </p>
          )}
        </div>
      )}

      {/* Warning */}

      <div className="flex gap-3 rounded-r-xl border-l-4 border-amber-500 bg-gray-50 p-4 shadow-sm">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div className="space-y-1">
          <h4 className="text-sm font-medium text-gray-900">
            Return & Cancellation Policy
          </h4>
          <p className="text-xs leading-relaxed text-gray-600">
            Modifying this order might disqualify applied promotional discounts.
            Refunds will be processed back to your wallet.
          </p>
        </div>
      </div>

      {/* Actions */}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || isSubmitting}
          className="bg-primary flex-1 rounded-lg py-3 text-white"
        >
          {loading || isSubmitting ? "Cancelling..." : "Confirm Cancellation"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-lg border py-3"
        >
          Keep Order
        </button>
      </div>
    </form>
  );
};

export default CancelOrderForm;
