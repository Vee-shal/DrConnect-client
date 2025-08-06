// validationSchema.ts
import * as yup from "yup";

export const doctorSchema = yup.object().shape({
  role: yup.string().oneOf(["doctor", "user"]).required(),
  name: yup.string().required("Full name is required"),
  phone_number: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  // Conditional validations
  specialization: yup.string().when("role", {
    is: "doctor",
    then: (schema) => schema.required("Specialization is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  experience: yup
    .number()
    .typeError("Experience must be a number")
    .positive("Experience must be positive").min(1, "The experience must be 1 year or more")
    .max(100, "The experience cannot be more than 100 years")
    .when("role", {
      is: "doctor",
      then: (schema) => schema.required("Experience is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  license: yup.string().when("role", {
    is: "doctor",
    then: (schema) => schema.required("License number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
export const patientSchema = yup.object().shape({
  role: yup.string().oneOf(["doctor", "user"]).required(),
  name: yup.string().required("Full name is required"),
  phone_number: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  // Conditional validations
});
