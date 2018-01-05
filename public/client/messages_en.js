/*
 * Customized en messages
 * */
$.extend( $.validator.messages, {
	// key: "message",
} )

/**
 * i18n messages that will be used in js
 */
$.i18nMs = {
	"changePwd" : {
    "0330520008":"The old password is not correct",
    "defaultErr":"Failed to change password",
    "success":"Your password is changed successfully!",
  },
  "feedbackModal" : {
    "feedbackSuccess": "Feedback submitted sucessfully！",
  },
  "forgotPwd": {
    // "0330520006": "This email address isn't registered. Please enter another one or register a new account.",
    "0330520006": "This account does not exist.",
    "0330520016": "This account has not been activated.",
    "defaultErr": "Service is not available.",
  },
  "resetPwd": {
    "0330520010":"Token is not valid, please try to re-submit your email again.",
    "0330520011": "Token is expired, please try to re-submit your email again.", // Token Expired
    "defaultErr":"Service is not available.",
  },
  "sendVerification":{
    "0330520014":"Verification email couldn't be sent again within 1 minute.",
    "defaultErr":"Failed to send verification",
  },
  "register":{
    "0330520020":"Email already exists but isn't verified yet. Please verify it before login.",
    "0330520017":"The email has already been verified.",
    "0330520007":"Email exists already",
  },
}
