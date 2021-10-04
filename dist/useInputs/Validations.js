"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
exports.validation = {
    email: {
        regex: /^[\w._%+-]+@[\w-]+\.+.[A-Za-z]{2,}$/,
        errorMsg: 'email is invalid',
    },
    phone: {
        regex: /^(\+)?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        errorMsg: 'phone number is invalid',
    },
};
