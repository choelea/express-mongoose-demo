/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: PT (Portuguese; português)
 * Region: PT (Portugal)
 */
$.extend( $.validator.messages, {
	required: "Campo de preenchimento obrigat&oacute;rio.",
	remote: "Por favor, corrija este campo.",
	email: "Por favor, introduza um endere&ccedil;o eletr&oacute;nico v&aacute;lido.",
	url: "Por favor, introduza um URL v&aacute;lido.",
	date: "Por favor, introduza uma data v&aacute;lida.",
	dateISO: "Por favor, introduza uma data v&aacute;lida (ISO).",
	number: "Por favor, introduza um n&uacute;mero v&aacute;lido.",
	digits: "Por favor, introduza apenas d&iacute;gitos.",
	creditcard: "Por favor, introduza um n&uacute;mero de cart&atilde;o de cr&eacute;dito v&aacute;lido.",
	equalTo: "Por favor, introduza de novo o mesmo valor.",
	extension: "Por favor, introduza um ficheiro com uma extens&atilde;o v&aacute;lida.",
	maxlength: $.validator.format( "Por favor, n&atilde;o introduza mais do que {0} caracteres." ),
	minlength: $.validator.format( "Por favor, introduza pelo menos {0} caracteres." ),
	rangelength: $.validator.format( "Por favor, introduza entre {0} e {1} caracteres." ),
	range: $.validator.format( "Por favor, introduza um valor entre {0} e {1}." ),
	max: $.validator.format( "Por favor, introduza um valor menor ou igual a {0}." ),
	min: $.validator.format( "Por favor, introduza um valor maior ou igual a {0}." ),
	nifES: "Por favor, introduza um NIF v&aacute;lido.",
	nieES: "Por favor, introduza um NIE v&aacute;lido.",
	cifES: "Por favor, introduza um CIF v&aacute;lido.",
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
    "feedbackSuccess":"Feddback foi submetida com sucesso!",
  },
  "forgotPwd": {
    "0330520006": "Esta conta não existe.",
    "0330520016": "Esta conta não foi ativada.",
    "defaultErr": "Service is not available.",
  },
  "resetPwd": {
    "0330520010":"Token não é válido, tente voltar a enviar seu e-mail novamente.",
    "0330520011": "Token expirou, tente voltar a enviar seu e-mail novamente.", // Token Expired
    "defaultErr":"Service is not available.",
  },
  "sendVerification":{
    "0330520014":"E-mail de verificação não poderia ser enviado novamente dentro de 1 minuto.",
    "defaultErr":"Failed to send verification",
  },
  "register":{
    "0330520020":"E-mail não foi verificado, por favor login após a verificação.",
    "0330520017":"O e-mail já foi verificado.",
    "0330520007":"O e-mail já existe",
  },
}
