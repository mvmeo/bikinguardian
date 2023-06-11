import { z } from "zod";

var Fn = {
	// Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut : function (rutCompleto) {
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		return (Fn.dv(rut) == digv );
	},
	dv : function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}

export const registerSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es requerido",
  }),
  apellido: z.string({
    required_error: "El apellido es requerido",
  }),
  correo: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "El email no es valido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
  rut: z
    .string({
      required_error: "El rut es requerido",
    })
    .refine((data) => Fn.validaRut(data), {
      message: "El rut no es valido",
    }),
  telefono: z.string({
    required_error: "El telefono es requerido",
  }),
  grupoSanguineo: z.string({
    required_error: "El grupo sanguineo es requerido",
  }),
  fechaNacimiento: z.string({
    required_error: "La fecha de nacimiento es requerida",
  }),
});

export const loginSchema = z.object({
  correo: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "El email no es valido",
    }),
  password: z.string({
    required_error: "La contraseña es requerida",
  }),
});
