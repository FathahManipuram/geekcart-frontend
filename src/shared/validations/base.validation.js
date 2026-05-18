import * as yup from "yup"

export const emailField= ()=> yup
	.string()
	.email("Enter a valid email")
	.lowercase()
	.trim()
	.max(100, "Email is too long")
	.required("Email is required")


export const passwordFild = ()=> yup
	.string()
	.matches(/[a-z]/, "Must contain at least one lowercase letter")
	.matches(/[A-Z]/,  "Must contain at least one uppercase letter")
	.matches(/[0-9]/,  "Must contain at least one number")
	.matches(/[@$!%*?&]/, "Must contain at least one special character (@$!%*?&)")
	.min(8, "Minimum 8 characters")
	.max(16, "Maximum characters 16")
	.required("Password is required")


export const confirmPasswordField= (ref= "password")=> yup
	.string()
	.oneOf([yup.ref(ref)], "Password must match")
	.required("Confirm your password")


export const fullNameField= ()=> yup
	.string()
	.trim()
	.min(3, "Minimum 3 characters")
	.max(30, "Maximum 30 characters")
	.required("Full name is required")
	


export const phoneNumberField= ()=> yup
.string()
.matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number")
.nullable()
.transform((value) => (value === "" ? null : value));

export const genderField= ()=> yup
.string()
.oneOf(["male", "female"], "Select a valid gender")
.nullable()
.transform((value) => (value === "" ? null : value));


export const dateOfBirthField = () =>
  yup
    .date()
    .max(new Date(), "Date cannot be in the future")
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    );


	//Category validation
	export const categoryName= ()=>
	yup.string().trim().min(2, "Category name must be at least 2 characters")
	.max(100, "Category name cannot exceed 100 characters");
	
	//SubCategory

const SUPPORTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

	export const imageField = () =>
    yup.mixed()
	.test("fileType", "Only JPG, PNG, and WEBP images are allowed", 
	(value)=> value && SUPPORTED_TYPES.includes(value.type))
	.test("fileSize",  "Image must be less than 5 MB",
		(value)=> value && value.size <=MAX_FILE_SIZE
	)