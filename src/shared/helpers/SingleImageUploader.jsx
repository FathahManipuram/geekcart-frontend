import React, { useRef, useState } from 'react'
import { Controller } from 'react-hook-form';
import { toast } from 'sonner'
import { Button } from '../components/ui/button';
import { Camera } from 'lucide-react';
import ImageCropModal from '../components/image-cropper/ImageCropModal';

const DEFAULT_PLACEHOLDER=  "https://placehold.co/200x200?text=Upload";

const getPreview= (value, fallback)=>{
  if(value instanceof File){
    return URL.createObjectURL(value)
  }
  return value || fallback
}




const handleImageChange = (event, maxSizeMB, setSelectedImage, setCropOpen) => {
  const file = event.target.files?.[0];

  if (!file) return;

  /**
   * Validate Type
   */
  if (!file.type.startsWith("image/")) {
    toast.error("Only image files are allowed");

    return;
  }

  /**
   * Validate Size
   */
  if (file.size > maxSizeMB * 1024 * 1024) {
    toast.error(`Image must be less than ${maxSizeMB} MB`);

    return;
  }

  /**
   * Open Cropper
   */
  const previewUrl = URL.createObjectURL(file);

  setSelectedImage(previewUrl);

  setCropOpen(true);

  event.target.value = "";
};


const SingleImageUploader = ({
  name="image",
  control,
  loading= false,
  alt= "Preview",
  title="Upload photo",
  size="w-24 h-24",
  accept= "image/*",
  shape="rounded-sm",
  maxSizeMB =5,
  fallback= DEFAULT_PLACEHOLDER,

}) => {
  const [cropOpen, setCropOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const fileInputRef= useRef(null)

    const openFilePicker= ()=>{

      fileInputRef.current?.click()
    }


  return (

    <Controller
    name={name}
    control={control}
    render={({field})=>{
      const preview= getPreview(field.value, fallback)
      return (
        <>
          <div className="space-y-2">
            <img
              src={preview}
              alt={alt}
              className={`${size} ${shape} object-cover border bg-muted`}
            />

            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={(event) =>
                handleImageChange(
                  event,
                  maxSizeMB,
                  setSelectedImage,
                  setCropOpen,
                )
              }
              hidden
            />
            <Button
              type="button"
              variant="secondary"
              onClick={openFilePicker}
              disabled={loading}
            >
              <Camera size={16} />
              {loading ? "Uploading..." : title}
            </Button>
          </div>

          <ImageCropModal
            open={cropOpen}
            image={selectedImage}
            aspect={1}
            onClose={() => setCropOpen(false)}
            onCropDone={(croppedFile) => {
              field.onChange(croppedFile);
            }}
          />
        </>
      );
    }}
    />
  );
}

export default SingleImageUploader
