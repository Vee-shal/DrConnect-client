import * as yup from "yup";

export const doctorProfileSchema = yup.object().shape({
  clinicName: yup.string().required("Clinic/Hospital name is required"),
  clinicAddress: yup.string().required("Clinic address is required"),
  offlinePrice: yup
    .number()
    .typeError("In-person fee must be a number")
    .positive("Fee must be positive")
    .required("In-person fee is required"),
  onlinePrice: yup
    .number()
    .typeError("Online fee must be a number")
    .positive("Fee must be positive")
    .required("Online fee is required"),
});
