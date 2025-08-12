export const endpoints = {
  AUTH: {
    REGISTER: `/auth/register`,
    LOGIN: `/auth/login`,
    FORGOT_PASSWORD : `/auth/forgot-password`,
    VERIFY_OTP :`/auth/verify-otp`,
    RESET_PASSWORD: `/auth/reset-password`
  },
  PROFILE  : {
    UPDATE_DOCTOR : "/profile/update-doctor",
    UPDATE_PATIENT: "/profile/update-patient",
  },
  DOCTORS:{
    LIST : "/doctor/verified"
  },
  APPOINTMENT :{
    REQUEST :"/appointment/request",
    GET_APPOINTMENTS : "/appointment/all"
  }
};
