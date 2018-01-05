/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ES (Spanish; Español)
 */
$.extend( $.validator.messages, {
	required: "Este campo es obligatorio.",
	remote: "Por favor, rellena este campo.",
	email: "Por favor, escribe una dirección de correo válida.",
	url: "Por favor, escribe una URL válida.",
	date: "Por favor, escribe una fecha válida.",
	dateISO: "Por favor, escribe una fecha (ISO) válida.",
	number: "Por favor, escribe un número válido.",
	digits: "Por favor, escribe sólo dígitos.",
	creditcard: "Por favor, escribe un número de tarjeta válido.",
	equalTo: "Por favor, escribe el mismo valor de nuevo.",
	extension: "Por favor, escribe un valor con una extensión aceptada.",
	maxlength: $.validator.format( "Por favor, no escribas más de {0} caracteres." ),
	minlength: $.validator.format( "Por favor, no escribas menos de {0} caracteres." ),
	rangelength: $.validator.format( "Por favor, escribe un valor entre {0} y {1} caracteres." ),
	range: $.validator.format( "Por favor, escribe un valor entre {0} y {1}." ),
	max: $.validator.format( "Por favor, escribe un valor menor o igual a {0}." ),
	min: $.validator.format( "Por favor, escribe un valor mayor o igual a {0}." ),
	nifES: "Por favor, escribe un NIF válido.",
	nieES: "Por favor, escribe un NIE válido.",
	cifES: "Por favor, escribe un CIF válido.",
} )

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
    'defaultErr':"Failed to change password",
    "success":"Your password is changed successfully!",
  },
  "feedbackModal" : {
    "feedbackSuccess":"Requerimiento financial ha sido entregado con éxito！",
  },
  "forgotPwd": {
    // "0330520006": "This email address isn't registered. Please enter another one or register a new account.",
    "0330520006": "Esta cuenta no existe.",
    "0330520016": "Esta cuenta no ha sido activada.",
    "defaultErr": "Service is not available.",
  },
  "resetPwd": {
    "0330520010":"El token no es válido, intenta volver a enviar tu correo electrónico de nuevo.",
    "0330520011": "Token ha caducado, intenta volver a enviar tu correo electrónico de nuevo.", // Token Expired
    "defaultErr":"Service is not available.",
  },
  "sendVerification":{
    "0330520014":"El correo electrónico de verificación no se puede enviar de nuevo en un minuto.",
    "defaultErr":"Failed to send verification",
  },
  "register":{
    "0330520020":"Email aún no ha sido verificado, por favor inicie la sesión después de hacer la verificación.",
    "0330520017":"El correo electrónico ya ha sido verificado.",
    "0330520007":"El email ya existe",
    "defaultErr":"Failed to register",
  },
}
