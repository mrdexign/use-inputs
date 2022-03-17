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
var constants_1 = require("./constants");
var react_1 = require("react");
var useInputs = function (options) {
    var _a = (0, react_1.useState)(false), isInputsValid = _a[0], setIsInputsValid = _a[1];
    var _b = (0, react_1.useState)({}), Inputs = _b[0], setInputs = _b[1];
    var _c = (0, react_1.useState)({}), Data = _c[0], setData = _c[1];
    var validationOf = function (name) {
        var _a, _b, _c;
        return (__assign(__assign(__assign({}, Validations_1.validation), (_a = options === null || options === void 0 ? void 0 : options.validation) === null || _a === void 0 ? void 0 : _a[name]), (((_c = (_b = options === null || options === void 0 ? void 0 : options.inputs) === null || _b === void 0 ? void 0 : _b[name]) === null || _c === void 0 ? void 0 : _c.validation) || {})));
    };
    var validateInput = function (name, value) {
        var _a, _b, _c;
        var isValid = true;
        var valid = validationOf(name);
        var inputValue = (_a = (value || '')) === null || _a === void 0 ? void 0 : _a.trim();
        if (valid === null || valid === void 0 ? void 0 : valid.required)
            isValid = isValid && inputValue !== '';
        if (valid === null || valid === void 0 ? void 0 : valid.validator)
            isValid = isValid && (valid === null || valid === void 0 ? void 0 : valid.validator(inputValue));
        if (valid === null || valid === void 0 ? void 0 : valid.regex) {
            if ((valid === null || valid === void 0 ? void 0 : valid.regex) instanceof RegExp)
                isValid = isValid && ((_b = valid === null || valid === void 0 ? void 0 : valid.regex) === null || _b === void 0 ? void 0 : _b.test(inputValue));
            else
                isValid = isValid && ((_c = constants_1.regex === null || constants_1.regex === void 0 ? void 0 : constants_1.regex[valid === null || valid === void 0 ? void 0 : valid.regex]) === null || _c === void 0 ? void 0 : _c.test(inputValue));
        }
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
    //? root onChange
    var onValueChange = (0, react_1.useCallback)(function (name, value, extra) {
        if (value === void 0) { value = ''; }
        if (extra === void 0) { extra = {}; }
        var valid = validationOf(name);
        var validCharType = (extra === null || extra === void 0 ? void 0 : extra.validChars) || (valid === null || valid === void 0 ? void 0 : valid.validChars);
        if (validCharType) {
            if (validCharType instanceof RegExp && !validCharType.test(value))
                return;
            if (typeof validCharType === 'string') {
                var regex_1 = constants_1.validCharsRegex === null || constants_1.validCharsRegex === void 0 ? void 0 : constants_1.validCharsRegex[validCharType];
                if (regex_1 && !(regex_1 === null || regex_1 === void 0 ? void 0 : regex_1.test(value)))
                    return;
            }
        }
        var isValid = validateInput(name, value);
        setInputs(function (state) {
            var _a;
            var _b, _c, _d;
            return (__assign(__assign({}, state), (_a = {}, _a[name] = __assign({ dirty: true, value: ((_d = (_c = (_b = options === null || options === void 0 ? void 0 : options.inputs) === null || _b === void 0 ? void 0 : _b[name]) === null || _c === void 0 ? void 0 : _c.valueMap) === null || _d === void 0 ? void 0 : _d.call(_c, value)) || value, validation: {
                    isValid: isValid,
                    required: valid === null || valid === void 0 ? void 0 : valid.required,
                    errorMsg: isValid ? '' : valid === null || valid === void 0 ? void 0 : valid.errorMsg,
                } }, extra), _a)));
        });
    }, [options === null || options === void 0 ? void 0 : options.validation]);
    //? original input onChange
    var onChange = (0, react_1.useCallback)(function (event, extra) {
        var _a, _b;
        if (extra === void 0) { extra = {}; }
        var name = ((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.name) || 'unknown';
        var value = ((_b = event === null || event === void 0 ? void 0 : event.target) === null || _b === void 0 ? void 0 : _b.value) || '';
        onValueChange(name, value, extra);
    }, [onValueChange]);
    //? set Input value manually
    var setInputValue = function (name, value) {
        var _a;
        var isValid = validateInput(name, value);
        var validation = (_a = options === null || options === void 0 ? void 0 : options.validation) === null || _a === void 0 ? void 0 : _a[name];
        return setInputs(function (state) {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[name] = __assign(__assign(__assign({}, state === null || state === void 0 ? void 0 : state[name]), { dirty: true, value: value }), (validation
                ? {
                    validation: {
                        isValid: isValid,
                        required: validation.required,
                        errorMsg: isValid ? '' : validation.errorMsg,
                    },
                }
                : {})), _a)));
        });
    };
    //? add data
    var addData = function (name, data) { return setData(function (state) {
        var _a;
        return (__assign(__assign({}, state), (_a = {}, _a[name] = data, _a)));
    }); };
    //? remove data
    var removeData = function (name, data) {
        return setData(function (state) {
            var newState = __assign({}, state);
            newState === null || newState === void 0 ? true : delete newState[name];
            return newState;
        });
    };
    //? add extra data to some input
    var addExtra = function (name, extra) {
        return setInputs(function (state) {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[name] = __assign(__assign({}, state === null || state === void 0 ? void 0 : state[name]), extra), _a)));
        });
    };
    //? make all inputs dirty
    var setAllDirty = function () {
        return setInputs(function (state) {
            var _a;
            var newState = __assign({}, state);
            (_a = Object === null || Object === void 0 ? void 0 : Object.entries(newState)) === null || _a === void 0 ? void 0 : _a.forEach(function (_a) {
                var name = _a[0];
                var curInput = newState === null || newState === void 0 ? void 0 : newState[name];
                curInput.dirty = true;
                if (curInput === null || curInput === void 0 ? void 0 : curInput.validation)
                    curInput.validation.isValid = validateInput(name, curInput.value);
            });
            return newState;
        });
    };
    //? control dirty state of an input
    var setDirty = function (name, isDirty) {
        return setInputs(function (state) {
            var newState = __assign({}, state);
            var curInput = newState === null || newState === void 0 ? void 0 : newState[name];
            if (!curInput)
                return newState;
            curInput.dirty = isDirty;
            if (curInput === null || curInput === void 0 ? void 0 : curInput.validation)
                curInput.validation.isValid = validateInput(name, curInput.value);
            return newState;
        });
    };
    //? get dirty state of some input
    var isDirty = function (name) { var _a; return (_a = Inputs === null || Inputs === void 0 ? void 0 : Inputs[name]) === null || _a === void 0 ? void 0 : _a.dirty; };
    //? get value of some input
    var valueOf = function (name) { var _a; return (_a = Inputs === null || Inputs === void 0 ? void 0 : Inputs[name]) === null || _a === void 0 ? void 0 : _a.value; };
    //? get default value of some input
    var defaultValueOf = function (name) { var _a; return (_a = Inputs === null || Inputs === void 0 ? void 0 : Inputs[name]) === null || _a === void 0 ? void 0 : _a.defaultValue; };
    //? get label of an input
    var labelOf = function (name) { var _a, _b, _c; return ((_b = (_a = options === null || options === void 0 ? void 0 : options.inputs) === null || _a === void 0 ? void 0 : _a[name]) === null || _b === void 0 ? void 0 : _b.label) || ((_c = options === null || options === void 0 ? void 0 : options.labels) === null || _c === void 0 ? void 0 : _c[name]) || ''; };
    //? return true if any dirty input exist
    var isSomeDirty = Object.values(Inputs).some(function (i) { return i.dirty === true; });
    //? return true if any inputs value changed
    var isSomeModified = Object.values(Inputs).some(function (i) { return i.value !== (i.defaultValue === undefined ? '' : i.defaultValue); });
    //? get validation info about an input
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
    var windowKeyCallbacks = (0, react_1.useRef)([]);
    var onWindowKeyDownHandler = function (e) {
        windowKeyCallbacks.current.forEach(function (_a) {
            var _b, _c, _d;
            var cb = _a.cb, code = _a.code;
            return (code === undefined || ((_b = code === null || code === void 0 ? void 0 : code.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(code)) === ((_d = (_c = e === null || e === void 0 ? void 0 : e.code) === null || _c === void 0 ? void 0 : _c.toLowerCase) === null || _d === void 0 ? void 0 : _d.call(_c))) && cb(e);
        });
    };
    var onWindowKeyDown = (0, react_1.useCallback)(function (callback, keyCode) {
        windowKeyCallbacks.current.push({ cb: callback, code: keyCode });
    }, []);
    (0, react_1.useEffect)(function () {
        window.addEventListener('keydown', onWindowKeyDownHandler);
        return function () { return window.removeEventListener('keydown', onWindowKeyDownHandler); };
    }, []);
    //?----------------------------- input key listeners --------------------------------
    var inputKeyCallbacks = (0, react_1.useRef)([]);
    var onInputKeyDownHandler = function (e, name) {
        return inputKeyCallbacks.current.forEach(function (_a) {
            var _b, _c, _d;
            var cb = _a.cb, code = _a.code;
            return (code === undefined || ((_b = code === null || code === void 0 ? void 0 : code.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(code)) === ((_d = (_c = e === null || e === void 0 ? void 0 : e.code) === null || _c === void 0 ? void 0 : _c.toLowerCase) === null || _d === void 0 ? void 0 : _d.call(_c))) && cb(e, name);
        });
    };
    var onInputKeyDown = (0, react_1.useCallback)(function (callback, keyCode) {
        inputKeyCallbacks.current.push({ cb: callback, code: keyCode });
    }, []);
    //?----------------------------------------------------------------------------------
    var _initializeInput = function (name, extra) {
        var _a;
        if (extra === void 0) { extra = {}; }
        var isInputEmpty = !Inputs[name];
        var isDefaultValueUpdated = (extra === null || extra === void 0 ? void 0 : extra.defaultValue) !== ((_a = Inputs[name]) === null || _a === void 0 ? void 0 : _a.defaultValue);
        if (isInputEmpty || isDefaultValueUpdated)
            return setInputs(function (state) {
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
    };
    (0, react_1.useEffect)(function () {
        var all = __assign(__assign(__assign({}, ((options === null || options === void 0 ? void 0 : options.inputs) || {})), ((options === null || options === void 0 ? void 0 : options.labels) || {})), ((options === null || options === void 0 ? void 0 : options.validation) || {}));
        Object.keys(all).forEach(function (name) { return !(Inputs === null || Inputs === void 0 ? void 0 : Inputs[name]) && _initializeInput(name); });
    }, [options === null || options === void 0 ? void 0 : options.inputs, options === null || options === void 0 ? void 0 : options.labels, options === null || options === void 0 ? void 0 : options.validation]);
    //? register input element
    //? <input {...register('myInput')} />
    var register = (0, react_1.useCallback)(function (name, extra, isRsuite) {
        var _a;
        if (extra === void 0) { extra = {}; }
        if (isRsuite === void 0) { isRsuite = (options === null || options === void 0 ? void 0 : options.isRsuite) || false; }
        var _onChange = function (e) { return onChange(e, extra); };
        if (isRsuite || !!(extra === null || extra === void 0 ? void 0 : extra.isRsuite))
            _onChange = function (value) { return onValueChange(name, value, extra); };
        _initializeInput(name, extra);
        return {
            name: name,
            onChange: _onChange,
            value: ((_a = Inputs === null || Inputs === void 0 ? void 0 : Inputs[name]) === null || _a === void 0 ? void 0 : _a.value) || '',
            onBlur: function () { var _a; return !((_a = Inputs[name]) === null || _a === void 0 ? void 0 : _a.dirty) && setDirty(name, true); },
            onKeyDown: function (e) { return onInputKeyDownHandler(e, name); },
        };
    }, [Inputs, onValueChange, options === null || options === void 0 ? void 0 : options.isRsuite]);
    return {
        Inputs: Inputs,
        validOf: validOf,
        labelOf: labelOf,
        valueOf: valueOf,
        isDirty: isDirty,
        options: options,
        setDirty: setDirty,
        addExtra: addExtra,
        register: register,
        setInputs: setInputs,
        resetInputs: resetInputs,
        setAllDirty: setAllDirty,
        isSomeDirty: isSomeDirty,
        getInputsData: getInputsData,
        setInputValue: setInputValue,
        isInputsValid: isInputsValid,
        defaultValueOf: defaultValueOf,
        isSomeModified: isSomeModified,
        onInputKeyDown: onInputKeyDown,
        onWindowKeyDown: onWindowKeyDown,
        getDirtyInputsData: getDirtyInputsData,
        getDefaultInputsData: getDefaultInputsData,
        Data: Data,
        setData: setData,
        addData: addData,
        removeData: removeData,
    };
};
exports.default = useInputs;
