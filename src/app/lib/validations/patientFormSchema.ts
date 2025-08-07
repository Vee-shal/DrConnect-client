// lib/validations/patientProfileSchema.ts
import * as yup from "yup";


export const patientProfileSchema = yup.object().shape({
  bloodGroup: yup
    .string()
    .required("Blood group is required")
    .matches(
      /^(A|B|AB|O)[+-]$/,
      "Blood group must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-"
    ),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(0, "Age must be a positive number"),
  height: yup
    .number()
    .typeError("Height must be a number")
    .required("Height is required")
    .min(30, "Height must be at least 30 cm"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .required("Weight is required")
    .min(1, "Weight must be greater than 0"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Gender must be male, female, or other"),
});
