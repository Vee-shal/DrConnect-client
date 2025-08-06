import * as yup from "yup";

export const profileSchema = yup.object().shape({
  offlinePrice: yup
    .number()
    .typeError("Offline price must be a number")
    .positive("Must be a positive number")
    .required("Offline price is required")
    .min(1, "The price must be 1 rupee or more than 1 rupee per minute")
    .max(10000, "The price must not be more than 1000 rupees"),
  onlinePrice: yup
    .number()
    .typeError("Online price must be a number")
    .positive("Must be a positive number")
    .required("Online price is required")
    .min(1, "The price must be 1 rupee or more than 1 rupee per minute")
    .max(1000, "The price must not be more than 1000 rupees"),
});
