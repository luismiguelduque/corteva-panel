/* eslint-disable */

const mayus = {
    message: (field, args) => {
        let n = args && args.length > 0 ? args[0] : 1;
        n = n > 0 ? n : 1;
        let mayus = n == 1 ? "mayúscula" : "mayúsculas";
        return "El campo " + field + " debe contener al menos " + n + " " + mayus;
    },
    validate: (value, args) => {
        let n = args && args.length > 0 ? args[0] : 1;
        return new RegExp("^(?=(?:.*[A-Z]){" + n + ",}).+$").test(value);
    }
};

// Regla: Al menos N minúsculas
const minus = {
    message: (field, args) => {
        let n = args && args.length > 0 ? args[0] : 1;
        n = n > 0 ? n : 1;
        let minus = n == 1 ? "minúscula" : "minúsculas";
        return "El campo " + field + " debe contener al menos " + n + " " + minus;
    },
    validate: (value, args) => {
        let n = args && args.length > 0 ? args[0] : 1;
        return new RegExp("^(?=(?:.*[a-z]){" + n + ",}).+$", "m").test(value);
    }
};

// Regla: Al menos N números
const num = {
    message: (field, args) => {
        let n = args && args.length > 0 ? args[0] : 1;
        n = n > 0 ? n : 1;
        let num = n == 1 ? "número" : "números";
        return "El campo " + field + " debe contener al menos " + n + " " + num;
    },
    validate: (value, args) => {
        let n = args && args.length > 0 ? args[0] : 1;
        return new RegExp("^(?=(?:.*[0-9]){" + n + ",}).+$", "m").test(value);
    }
};

// Regla: Al menos N carácteres especiales ( @ # $ * . - )
const charesp = {
    message: (field, args) => {
        let n = args && args.length > 0 ? args[0] : 1;
        n = n > 0 ? n : 1;
        let charesp = n == 1 ? "carácter especial  @ # $ * . - " : "carácteres especiales @ # $ * . - ";
        return "El campo " + field + " debe contener al menos " + n + " " + charesp;
    },
    validate: (value, args) => {
        let n = args && args.length > 0 ? args[0] : 1;
        return new RegExp("^(?=(?:.*[@#$*.-]){" + n + ",}).+$", "m").test(value);
    }
};

// Regla: El campo debe ser un email o un número de teléfono válido
const email_or_phone = {
    message: (field, args) => { return 'El campo no corresponde a un correo o número de teléfono válido' },
    validate: (value, args) => {
        var input = document.createElement('input');

        input.type = 'email';
        input.required = true;
        input.value = value;

        var emailValidity = typeof input.checkValidity === 'function' ? input.checkValidity() : /\S+@\S+\.\S+/.test(value);
        return /^[0-9]{11,13}$/.test(value) || emailValidity;
    }
};
export { mayus, minus, num, charesp, email_or_phone }