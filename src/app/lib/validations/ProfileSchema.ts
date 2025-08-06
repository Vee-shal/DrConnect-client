import * as yup from "yup";

export const profileSchema = yup.object().shape({
  offlinePrice: yup
    .number()
    .transform((value, originalValue) =>
      typeof originalValue === "string" ? parseFloat(originalValue) : value
    )
    .typeError("Offline price must be a number")
    .positive("Must be a positive number")
    .required("Offline price is required")
    .min(1, "The price must be 1 rupee or more than 1 rupee per minute")
    .max(10000, "The price must not be more than 10000 rupees"),

  onlinePrice: yup
    .number()
    .transform((value, originalValue) =>
      typeof originalValue === "string" ? parseFloat(originalValue) : value
    )
    .typeError("Online price must be a number")
    .positive("Must be a positive number")
    .required("Online price is required")
    .min(1, "The price must be 1 rupee or more than 1 rupee per minute")
    .max(1000, "The price must not be more than 1000 rupees"),

  clinicName: yup.string().required("Clinic name is required"),
  clinicAddress: yup.string().required("Clinic address is required"),
});
