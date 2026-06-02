import React, { useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Button } from '../components/ui/button'
import { toast } from 'sonner';
import { Camera } from 'lucide-react';
import ImageCropModal from '../components/image-cropper/ImageCropModal';


const DEFAULT_PLACEHOLDER = "https://placehold.co/200x200?text=Upload";

const getPreview = (value = []) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => {
    if (item instanceof File) {
      return {
        preview: URL.createObjectURL(item),

        isFile: true,
      };
    }

    return {
      preview: item,
      isFile: false,
    };
  });
};



const validateImage = (file, maxSizeMB) => {
  if (!file.type.startsWith("image/")) {
    toast.error("Only image files are allowed");

    return false;
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    toast.error(`Each image must be less than ${maxSizeMB} MB`);

    return false;
  }

  return true;
};



const handleSelectImages = (
  event,
  field,
  maxFiles,
  maxSizeMB,
  setPendingFiles,
  setCurrentIndex,
  setSelectedImage,
  setCropOpen
) => {

  const files = Array.from(
    event.target.files || [],
  );

  if (
    files.length === 0
  ) return;

  /**
   * Validate
   */
  for (const file of files) {
    const isValid =
      validateImage(
        file,
        maxSizeMB,
      );

    if (!isValid) {
      return;
    }
  }

  /**
   * Max Files
   */
  const existingFiles =
    field.value || [];

  if (
    existingFiles.length +
      files.length >
    maxFiles
  ) {
    toast.error(
      `You can upload up to ${maxFiles} images`,
    );

    return;
  }

  /**
   * Save Queue
   */
  setPendingFiles(files);

  setCurrentIndex(0);

  /**
   * Open First
   */
  setSelectedImage(
    URL.createObjectURL(
      files[0],
    ),
  );

  setCropOpen(true);

  event.target.value = "";
};



// const handleImageChange=(event, field, maxSizeMB, maxFiles)=>{
// 	console.log(event.target.files);
// 	const files= Array.from(event.target.files || [])

// 	if(files.length ===0 ) return
// 	const existingFiles= field.value || []
// 	const updatedFiles= [...existingFiles, ...files]

// 	if(updatedFiles.length> maxFiles){
// 		toast.error(`You can upload up to ${maxFiles} images`);
// 		return
// 	}

// 	for(const file of files){
// 		if(!file.type.startsWith("image/")){
// 			toast.error("Only image files are allowed");
// 			return
// 		}

// 		if(file.size > maxSizeMB * 1024 * 1024){
// 			 toast.error(`Each image must be less than ${maxSizeMB} MB`);
// 			 return
// 		}


// 		field.onChange(updatedFiles)

// 		event.target.value= ""
// 	}
// }


const handleRemoveImage=(indexToRemove, field)=>{
	const currentImages= field.value || []

	const updatedImages= currentImages.filter((_, index)=> index !== indexToRemove)

field.onChange(updatedImages)
}

const MultipleImageUploader = ({
	name= "images",
	control,
	loading= false,
	title="Upload Iamges",
	size= "w-16 h-16",
	accept="image/*",
	shape= "rounded-sm",
	maxSizeMB =5,
	maxFiles= 5,
	fallback= DEFAULT_PLACEHOLDER,
}) => {

const [cropOpen, setCropOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);
const [pendingFiles, setPendingFiles] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);


	const fileInputRef= useRef(null);

	const openFilePicker= ()=>{
		fileInputRef.current?.click()
	}
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>{
		const previews= getPreview(field.value || [])

		return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {previews.length > 0 ? (
            previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview.preview}
                  alt={`Preview ${index + 1}`}
                  className={`${size} ${shape} object-cover border bg-muted`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index, field)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs cursor-pointer"
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <img
              src={fallback}
              alt="Preview"
              className={`${size} ${shape} object-cover border bg-muted`}
            />
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={(event) =>
            handleSelectImages(
              event,
              field,
              maxFiles,
              maxSizeMB,
              setPendingFiles,
              setCurrentIndex,
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

        {fieldState.error?.message && (
          <p className="text-xs text-red-500">{fieldState.error.message}</p>
        )}

        <ImageCropModal
          open={cropOpen}
          image={selectedImage}
          aspect={1}
          onClose={() => {
            setCropOpen(false);

            setPendingFiles([]);

            setCurrentIndex(0);
          }}
          onCropDone={(croppedFile) => {
            /**
             * Existing Images
             */
            const existingFiles = field.value || [];

            /**
             * Save Cropped File
             */
            field.onChange([...existingFiles, croppedFile]);

            /**
             * Next Image
             */
            const nextIndex = currentIndex + 1;

            /**
             * Continue Queue
             */
            if (nextIndex < pendingFiles.length) {
              setCurrentIndex(nextIndex);

              setSelectedImage(URL.createObjectURL(pendingFiles[nextIndex]));
            } else {
              /**
               * Finish
               */
              setCropOpen(false);

              setPendingFiles([]);

              setCurrentIndex(0);
            }
          }}
        />
      </div>
    );
	  } }

		
		
	
    />
  );
}

export default MultipleImageUploader
