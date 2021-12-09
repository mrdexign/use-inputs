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
var Validations_1 = require("./Validations");
var react_1 = require("react");
var useInputs = function (options) {
    var _a = (0, react_1.useState)(false), isInputsValid = _a[0], setIsInputsValid = _a[1];
    var _b = (0, react_1.useState)({}), Inputs = _b[0], setInputs = _b[1];
    var validateInput = function (name, value) {
        var _a, _b;
        var isValid = true;
        var valid = (_a = __assign(__assign({}, Validations_1.validation), options === null || options === void 0 ? void 0 : options.validation)) === null || _a === void 0 ? void 0 : _a[name];
        if (valid === null || valid === void 0 ? void 0 : valid.regex)
            isValid = isValid && ((_b = valid === null || valid === void 0 ? void 0 : valid.regex) === null || _b === void 0 ? void 0 : _b.test(value));
        if (valid === null || valid === void 0 ? void 0 : valid.validator)
            isValid = isValid && (valid === null || valid === void 0 ? void 0 : valid.validator(value));
        if (valid === null || valid === void 0 ? void 0 : valid.required)
            isValid = isValid && value !== '';
        return isValid;
    };
    //? validity check of all values
    (0, react_1.useEffect)(function () {
        return setIsInputsValid(Object.values(Inputs).every(function (i) {
            var _a;
            if (!(i === null || i === void 0 ? void 0 : i.validation) || Object.keys(i === null || i === void 0 ? void 0 : i.validation).length === 0)
                return true;
            return !!((_a = i === null || i === void 0 ? void 0 : i.validation) === null || _a === void 0 ? void 0 : _a.isValid);
        }));
    }, [Inputs]);
    //? custom onChange
    var onValueChange = (0, react_1.useCallback)(function (name, value, extra) {
        var _a;
        if (value === void 0) { value = ''; }
        if (extra === void 0) { extra = {}; }
        var valid = (_a = __assign(__assign({}, Validations_1.validation), options === null || options === void 0 ? void 0 : options.validation)) === null || _a === void 0 ? void 0 : _a[name];
        var validCharType = valid === null || valid === void 0 ? void 0 : valid.validChars;
        if (validCharType) {
            if (validCharType instanceof RegExp && !validCharType.test(value))
                return;
            else if (validCharType === '+number' && !/^[0-9]*[.]?[0-9]*$/.test(value))
                return;
            else if (validCharType === 'number' && !/^(\-|\+)?[0-9]*[.]?[0-9]*$/.test(value))
                return;
            else if (validCharType === 'alphabet' && !/^[a-zA-Z\s]*$/.test(value))
                return;
        }
        var isValid = validateInput(name, value);
        setInputs(function (state) {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[name] = __assign({ dirty: true, value: value, validation: {
                    isValid: isValid,
                    required: valid === null || valid === void 0 ? void 0 : valid.required,
                    errorMsg: isValid ? '' : valid === null || valid === void 0 ? void 0 : valid.errorMsg,
                } }, extra), _a)));
        });
    }, [options === null || options === void 0 ? void 0 : options.validation]);
    //? custom onChange
    var onChange = (0, react_1.useCallback)(function (event, extra) {
        var _a, _b;
        if (extra === void 0) { extra = {}; }
        var name = ((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.name) || 'unknown';
        var value = ((_b = event === null || event === void 0 ? void 0 : event.target) === null || _b === void 0 ? void 0 : _b.value) || '';
        onValueChange(name, value, extra);
    }, [onValueChange]);
    var setInputValue = function (name, value) {
        return setInputs(function (state) {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[name] = __assign(__assign({}, state === null || state === void 0 ? void 0 : state[name]), { dirty: true, value: value }), _a)));
        });
    };
    var setAdditionalData = function (name, data) {
        return setInputs(function (state) {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[name] = {
                dirty: true,
                value: data,
            }, _a)));
        });
    };
    var valueOf = function (name) { var _a; return (_a = Inputs === null || Inputs === void 0 ? void 0 : Inputs[name]) === null || _a === void 0 ? void 0 : _a.value; };
    var defaultValueOf = function (name) { var _a; return (_a = Inputs === null || Inputs === void 0 ? void 0 : Inputs[name]) === null || _a === void 0 ? void 0 : _a.defaultValue; };
    //? add extra data to some input
    var addExtra = function (name, extra) {
        return setInputs(function (state) {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[name] = __assign(__assign({}, state[name]), extra), _a)));
        });
    };
    //? get dirty state of some input
    var isDirty = function (name) { var _a; return (_a = Inputs === null || Inputs === void 0 ? void 0 : Inputs[name]) === null || _a === void 0 ? void 0 : _a.dirty; };
    //? return true if any dirty input exist
    var isSomeDirty = function () { return Object.values(Inputs).some(function (i) { return i.dirty === true; }); };
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
    //? reset all inputs values
    var resetInputs = (0, react_1.useCallback)(function (inputsName) {
        if (inputsName === void 0) { inputsName = []; }
        setInputs(function (state) {
            var newState = __assign({}, state);
            Object.keys(newState).forEach(function (name) {
                var _a;
                if (inputsName.length === 0 || inputsName.includes(name))
                    newState[name] = __assign(__assign({}, state[name]), { dirty: false, value: ((_a = state === null || state === void 0 ? void 0 : state[name]) === null || _a === void 0 ? void 0 : _a.defaultValue) || '' });
            });
            return newState;
        });
    }, [setInputs]);
    //? get inputs default values
    var getDefaultInputsData = (0, react_1.useCallback)(function () {
        var data = {};
        Object.entries(Inputs).forEach(function (e) { var _a; return (data[e[0]] = (_a = e[1]) === null || _a === void 0 ? void 0 : _a.defaultValue); });
        return data;
    }, [Inputs]);
    //? get an object of all inputs data
    var getInputsData = (0, react_1.useCallback)(function () {
        var data = {};
        Object.entries(Inputs).forEach(function (e) { var _a; return (data[e[0]] = (_a = e[1]) === null || _a === void 0 ? void 0 : _a.value); });
        return data;
    }, [Inputs]);
    //? get an object of all dirty inputs data
    var getDirtyInputsData = (0, react_1.useCallback)(function () {
        var data = {};
        Object.entries(Inputs)
            .filter(function (i) { return i[1].dirty === true; })
            .forEach(function (e) { var _a; return (data[e[0]] = ((_a = e[1]) === null || _a === void 0 ? void 0 : _a.value) || ''); });
        return data;
    }, [Inputs]);
    //? register input element
    //? <input {...register('myInput')} ></input>
    var register = (0, react_1.useCallback)(function (name, extra, isRsuite) {
        var _a, _b;
        if (extra === void 0) { extra = {}; }
        if (isRsuite === void 0) { isRsuite = (options === null || options === void 0 ? void 0 : options.isRsuite) || false; }
        var isInputEmpty = !Inputs[name];
        var isDefaultValueUpdated = (extra === null || extra === void 0 ? void 0 : extra.defaultValue) !== ((_a = Inputs[name]) === null || _a === void 0 ? void 0 : _a.defaultValue);
        if (isInputEmpty || isDefaultValueUpdated) {
            setInputs(function (state) {
                var _a;
                var _b;
                var value = (extra === null || extra === void 0 ? void 0 : extra.defaultValue) || '';
                var validation = (_b = options === null || options === void 0 ? void 0 : options.validation) === null || _b === void 0 ? void 0 : _b[name];
                var isValid = validateInput(name, value);
                return __assign(__assign({}, state), (_a = {}, _a[name] = __assign(__assign({ value: value, dirty: false }, extra), (validation
                    ? {
                        validation: {
                            isValid: isValid,
                            required: validation.required,
                            errorMsg: isValid ? '' : validation.errorMsg,
                        },
                    }
                    : {})), _a));
            });
        }
        return {
            name: name,
            value: ((_b = Inputs === null || Inputs === void 0 ? void 0 : Inputs[name]) === null || _b === void 0 ? void 0 : _b.value) || '',
            onChange: isRsuite
                ? function (value) { return onValueChange(name, value, extra); }
                : function (e) { return onChange(e, extra); },
        };
    }, [Inputs, onValueChange, options === null || options === void 0 ? void 0 : options.isRsuite]);
    return {
        register: register,
        Inputs: Inputs,
        setInputs: setInputs,
        isDirty: isDirty,
        isSomeDirty: isSomeDirty,
        validOf: validOf,
        isInputsValid: isInputsValid,
        resetInputs: resetInputs,
        getInputsData: getInputsData,
        getDirtyInputsData: getDirtyInputsData,
        addExtra: addExtra,
        setAdditionalData: setAdditionalData,
        setInputValue: setInputValue,
        defaultValueOf: defaultValueOf,
        getDefaultInputsData: getDefaultInputsData,
        valueOf: valueOf,
    };
};
exports.default = useInputs;
