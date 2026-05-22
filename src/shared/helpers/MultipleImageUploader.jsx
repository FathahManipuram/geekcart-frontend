import React, { useRef } from 'react'
import { Controller } from 'react-hook-form'
import { Button } from '../components/ui/button'
import { toast } from 'sonner';
import { Camera } from 'lucide-react';


const DEFAULT_PLACEHOLDER = "https://placehold.co/200x200?text=Upload";

const getPreview= (value= [])=>{
	if(!Array.isArray(value)) return []

	return value.map((item)=>{
		if(item instanceof File){
			return URL.createObjectURL(item)
		}

		return item
	})
}

const handleImageChange=(event, field, maxSizeMB, maxFiles)=>{
	console.log(event.target.files);
	const files= Array.from(event.target.files || [])

	if(files.length ===0 ) return
	const existingFiles= field.value || []
	const updatedFiles= [...existingFiles, ...files]

	if(updatedFiles.length> maxFiles){
		toast.error(`You can upload up to ${maxFiles} images`);
		return
	}

	for(const file of files){
		if(!file.type.startsWith("image/")){
			toast.error("Only image files are allowed");
			return
		}

		if(file.size > maxSizeMB * 1024 * 1024){
			 toast.error(`Each image must be less than ${maxSizeMB} MB`);
			 return
		}


		field.onChange(updatedFiles)

		event.target.value= ""
	}
}


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
                  src={preview}
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
          onChange={(event) => {
            handleImageChange(event, field, maxSizeMB, maxFiles);
          }}
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
      </div>
    );
	  } }

		
		
	
    />
  );
}

export default MultipleImageUploader
