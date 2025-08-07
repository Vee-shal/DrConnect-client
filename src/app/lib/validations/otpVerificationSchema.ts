import * as yup from 'yup';

export const otpSchema = yup.object({
  otp: yup.string().required('OTP is required').length(6, 'OTP must be 6 digits'),
});