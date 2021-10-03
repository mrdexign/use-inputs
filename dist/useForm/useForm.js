"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var formValidations_1 = require("./formValidations");
var useForm = function (options) {
    var _a = react_1.useState(false), isFormValid = _a[0], setIsFormValid = _a[1];
    var _b = react_1.useState({}), Inputs = _b[0], setInputs = _b[1];
    //? custom onChange
    var onValueChange = react_1.useCallback(function (name, value, extra) {
        var _a, _b;
        if (value === void 0) { value = ''; }
        if (extra === void 0) { extra = {}; }
        var valid = (_a = __assign(__assign({}, formValidations_1.validation), options === null || options === void 0 ? void 0 : options.validation)) === null || _a === void 0 ? void 0 : _a[name];
        var isValid = true;
        if (valid === null || valid === void 0 ? void 0 : valid.regex)
            isValid = isValid && ((_b = valid === null || valid === void 0 ? void 0 : valid.regex) === null || _b === void 0 ? void 0 : _b.test(value));
        if (valid === null || valid === void 0 ? void 0 : valid.validator)
            isValid = isValid && (valid === null || valid === void 0 ? void 0 : valid.validator(value));
        if (valid === null || valid === void 0 ? void 0 : valid.required)
            isValid = isValid && value !== '';
        setInputs(function (state) {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[name] = __assign({ dirty: true, value: value, validation: {
                    isValid: isValid,
                    errorMsg: isValid ? '' : valid === null || valid === void 0 ? void 0 : valid.errorMsg,
                } }, extra), _a)));
        });
    }, [options === null || options === void 0 ? void 0 : options.validation]);
    //? custom onChange
    var onChange = react_1.useCallback(function (event, extra) {
        var _a, _b;
        if (extra === void 0) { extra = {}; }
        var name = ((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.name) || 'unknown';
        var value = ((_b = event === null || event === void 0 ? void 0 : event.target) === null || _b === void 0 ? void 0 : _b.value) || '';
        console.log(value);
        onValueChange(name, value, extra);
    }, [onValueChange]);
    //? validity check of all values
    react_1.useEffect(function () { return setIsFormValid(Object.values(Inputs).every(function (i) { var _a; return ((_a = i.validation) === null || _a === void 0 ? void 0 : _a.isValid) === true; })); }, [Inputs]);
    //? add extra data to some input
    var addExtra = function (name, extra) {
        return setInputs(function (state) {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[name] = __assign(__assign({}, state[name]), extra), _a)));
        });
    };
    //? get dirty state of some input
    var isDirty = function (name) { var _a; return (_a = Inputs === null || Inputs === void 0 ? void 0 : Inputs[name]) === null || _a === void 0 ? void 0 : _a.dirty; };
    //? get validation info about some input
    var validOf = function (name) {
        var _a, _b, _c, _d;
        var isValid = (_b = (_a = Inputs === null || Inputs === void 0 ? void 0 : Inputs[name]) === null || _a === void 0 ? void 0 : _a.validation) === null || _b === void 0 ? void 0 : _b.isValid;
        return {
            isValid: isValid,
            isValidDirty: !isDirty(name) || isValid,
            msg: ((_d = (_c = Inputs === null || Inputs === void 0 ? void 0 : Inputs[name]) === null || _c === void 0 ? void 0 : _c.validation) === null || _d === void 0 ? void 0 : _d.errorMsg) || '',
        };
    };
    //? reset all form values
    var resetFormValues = react_1.useCallback(function (inputsName) {
        if (inputsName === void 0) { inputsName = []; }
        setInputs(function (state) {
            var newState = __assign({}, state);
            Object.keys(newState).forEach(function (name) {
                if (inputsName.length === 0 || inputsName.includes(name))
                    newState[name] = __assign(__assign({}, state[name]), { value: '', dirty: false });
            });
            return newState;
        });
    }, [setInputs]);
    //? get an object of all inputs data
    var getFormData = function () {
        var data = {};
        Object.entries(Inputs).forEach(function (e) { var _a; return (data[e[0]] = (_a = e[1]) === null || _a === void 0 ? void 0 : _a.value); });
        return data;
    };
    //? register input element to useForm
    //? <input {...register('myInput')} ></input>
    var register = react_1.useCallback(function (name, extra, isRsuite) {
        var _a;
        if (extra === void 0) { extra = {}; }
        if (isRsuite === void 0) { isRsuite = (options === null || options === void 0 ? void 0 : options.isRsuite) || false; }
        !Inputs[name] &&
            setInputs(function (state) {
                var _a;
                return (__assign(__assign({}, state), (_a = {}, _a[name] = {
                    value: '',
                    dirty: false,
                }, _a)));
            });
        return __assign({ name: name, value: ((_a = Inputs === null || Inputs === void 0 ? void 0 : Inputs[name]) === null || _a === void 0 ? void 0 : _a.value) || '', onChange: isRsuite
                ? function (value) { return onValueChange(name, value); }
                : function (e) { return onChange(e, extra); } }, extra);
    }, [Inputs, onChange, onValueChange, options === null || options === void 0 ? void 0 : options.isRsuite]);
    return {
        isDirty: isDirty,
        register: register,
        validOf: validOf,
        isFormValid: isFormValid,
        Inputs: Inputs,
        setInputs: setInputs,
        getFormData: getFormData,
        resetFormValues: resetFormValues,
        addExtra: addExtra,
    };
};
exports.default = useForm;
