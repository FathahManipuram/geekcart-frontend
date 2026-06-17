import { CANCEL_REASONS } from "../../constants/cancelReasons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cancelOrderSchema } from "../../validations/cancelOrder.validation";
import CancelOrderPreviewCard from "./CancelOrderPreviewCard";

const CancelOrderForm = ({ order, item, onSubmit, onClose, loading = false }) => {
  const firstItemImage= order?.items?.[0].image
  const product = item
console.log("firstItemImage", order)
const {
  register,
  handleSubmit,
  watch,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: yupResolver(cancelOrderSchema),
});

const reason = watch("reason");
  const onFormSubmit = async(data) => {
    const finalReason =
      data.reason === "Other" ? data.customReason : data.reason;

    await onSubmit(finalReason);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
  
      <CancelOrderPreviewCard order={order} item={item} />

      <div>
        <h4 className="font-medium mb-4">Reason for cancellation</h4>

        <div className="space-y-3">
          {CANCEL_REASONS.map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer"
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
            className="w-full border rounded-lg p-3"
          />

          {errors.customReason && (
            <p className="text-sm text-red-500">
              {errors.customReason.message}
            </p>
          )}
        </div>
      )}

      {/* Warning */}

      <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
        <p className="text-sm">
          Important Information: Cancellation may affect shipping and refund
          timelines.
        </p>
      </div>

      {/* Actions */}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || isSubmitting}
          className="flex-1 bg-primary text-white py-3 rounded-lg"
        >
          {loading || isSubmitting ? "Cancelling..." : "Confirm Cancellation"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="flex-1 border py-3 rounded-lg"
        >
          Keep Order
        </button>
      </div>
    </form>
  );
};

export default CancelOrderForm;
