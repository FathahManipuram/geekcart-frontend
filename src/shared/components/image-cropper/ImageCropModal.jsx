import React, { useState } from "react";

import Cropper from "react-easy-crop";

import { getCroppedImg } from "./cropImage";

const ImageCropModal = ({ open, image, aspect = 1, onClose, onCropDone }) => {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  /**
   * Crop Complete
   */
  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  /**
   * Save Cropped Image
   */
  const handleDone = async () => {
    try {
      const croppedFile = await getCroppedImg(image, croppedAreaPixels);

      onCropDone(croppedFile);

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Hide Modal
   */
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold">Crop Image</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground text-sm"
          >
            Close
          </button>
        </div>

        {/* Crop Area */}
        <div className="relative h-[450px] bg-black">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 border-t px-5 py-4">
          {/* Zoom */}
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />

          {/* Save */}
          <button
            type="button"
            onClick={handleDone}
            className="rounded-lg bg-black px-5 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
