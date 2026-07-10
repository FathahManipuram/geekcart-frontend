import DataTable from "@/shared/components/DataTable";
import Modal from "@/shared/components/Modal";
import React from "react";

const SizeGuideModal = ({ isOpen, onClose }) => {
  const columns = [
    {
      header: "Size",
      accessor: "size",
      cell: (row) => (
        <span className="font-bold text-neutral-900">{row.size}</span>
      ),
    },
    {
      header: "Chest",
      accessor: "chest",
    },
    {
      header: "Shoulder",
      accessor: "shoulder",
    },
    {
      header: "Length",
      accessor: "length",
    },
  ];

  const sizeData = [
    { id: "s", size: "S", chest: '38"', shoulder: '16.5"', length: '28"' },
    { id: "m", size: "M", chest: '40"', shoulder: '17"', length: '29"' },
    { id: "l", size: "L", chest: '42"', shoulder: '17.5"', length: '30"' },
    { id: "xl", size: "XL", chest: '44"', shoulder: '18"', length: '31"' },
    { id: "xxl", size: "XXL", chest: '46"', shoulder: '18.5"', length: '32"' },
  ];

  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      title="SIZE GUIDE"
      description="See chart specifications and measurement references below."
    >
      <div className="mt-4 space-y-6">
        <div>
          <h3 className="mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
            Size Chart
          </h3>
          <DataTable columns={columns} data={sizeData} rowKey="id" />
        </div>

        <hr className="border-gray-100" />

        <div>
          <h3 className="mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
            How To Measure
          </h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-base">📏</span>
              <div>
                <h4 className="text-primary/80 font-semibold">Chest</h4>
                <p className="mt-0.5 text-xs text-gray-500">
                  Measure around the fullest part.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-base">📏</span>
              <div>
                <h4 className="text-primary/80 font-semibold">Shoulder</h4>
                <p className="mt-0.5 text-xs text-gray-500">
                  Measure shoulder edge to edge.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-base">📏</span>
              <div>
                <h4 className="text-primary/80 font-semibold">Length</h4>
                <p className="mt-0.5 text-xs text-gray-500">
                  Measure from shoulder to hem.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => onClose(false)}
            className="bg-primary hover:bg-primary/80 active:bg-primary/90 w-full rounded-xl py-3 text-sm font-semibold text-white shadow-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SizeGuideModal;
