import Modal from "@/shared/components/Modal";
import CancelOrderForm from "./CancelOrderForm";

const CancelOrderModal = ({ open, onOpenChange, order, onSubmit, loading }) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Cancel Order">
      <CancelOrderForm
        order={order}
        loading={loading}
        onSubmit={onSubmit}
        onClose={() => onOpenChange(false)}
      />
    </Modal>
  );
};

export default CancelOrderModal;
