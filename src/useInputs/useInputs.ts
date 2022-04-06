import * as Types from './Types';
import { validation } from './Validations';
import { regex, validCharsRegex } from './constants';
import { useEffect, useState, useCallback, useRef } from 'react';
import { extraType, InputKeyDownCallbackType, KeyDownCallbackType } from './Types';

const useInputs = <T extends Types.OptionsType>(options?: T) => {
	const [Inputs, setInputs] = useState<Types.InputsType>({});
	const [Data, setData] = useState<Record<string, any>>({});
	const [isInputsValid, setIsInputsValid] = useState(false);

	const validationOf = (name: string) => ({
		...validation,
		...options?.validation?.[name],
		...(options?.inputs?.[name]?.validation || {}),
	});

	const validateInput = (name: string, value: string): boolean => {
		let isValid = true;
		const valid = validationOf(name);
		const inputValue = (value || '')?.trim();

		if (valid?.required) isValid = isValid && inputValue !== '';

		if (valid?.validator) isValid = isValid && valid?.validator?.(inputValue);

		if (valid?.regex) isValid = isValid && (valid?.regex instanceof RegExp ? valid?.regex : regex?.[valid?.regex])?.test(inputValue);

		if (options?.passwordTuples) {
			const passTuple = options?.passwordTuples?.find(t => t?.includes(name));
			if (passTuple) {
				const otherName = passTuple?.filter(n => n !== name)?.[0];
				const isEquals = Inputs?.[otherName]?.value === inputValue;
				if (isDirty(otherName)) {
					isValid = isValid && isEquals;
					setInputValidity(otherName, isValid);
				}
			}
		}

		return isValid;
	};

	//? validity check of all values
	useEffect(
		() =>
			setIsInputsValid(
				Object.values(Inputs).every(i => {
					if (!i?.validation || Object.keys(i?.validation).length === 0) return true;
					return !!i?.validation?.isValid;
				})
			),
		[Inputs]
	);

	//? root onChange
	const onValueChange = useCallback(
		(name: string, value: string = '', extra: extraType = {}) => {
			const valid = validationOf(name);
			const validCharType = extra?.validChars || valid?.validChars;

			if (validCharType) {
				if (validCharType instanceof RegExp && !validCharType.test(value)) return;
				if (typeof validCharType === 'string') {
					const regex = validCharsRegex?.[validCharType];
					if (regex && !regex?.test(value)) return;
				}
			}

			let isValid = validateInput(name, value);
			setInputs(state => ({
				...state,
				[name]: {
					dirty: true,
					value: options?.inputs?.[name]?.valueMap?.(value) || value,
					validation: {
						isValid,
						required: valid?.required,
						errorMsg: isValid ? '' : valid?.errorMsg,
					},
					...extra,
				},
			}));
		},
		[options?.validation]
	);

	//? original input onChange
	const onChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>, extra: extraType = {}) => {
			const name = event?.target?.name || 'unknown';
			const value = event?.target?.value || '';
			onValueChange(name, value, extra);
		},
		[onValueChange]
	);

	//? set Input value manually
	const setInputValue = (name: string, value: string) => {
		const isValid = validateInput(name, value);
		const validation = options?.validation?.[name];
		return setInputs(state => ({
			...state,
			[name]: {
				...state?.[name],
				dirty: true,
				value: value,
				...(validation
					? {
							validation: {
								isValid,
								required: validation.required,
								errorMsg: isValid ? '' : validation.errorMsg,
							},
					  }
					: {}),
			},
		}));
	};

	//? add data
	const addData = (name: string, data: any) => setData(state => ({ ...state, [name]: data }));

	//? remove data
	const removeData = (name: string, data: any) =>
		setData(state => {
			const newState = { ...state };
			delete newState?.[name];
			return newState;
		});

	//? add extra data to some input
	const addExtra = (name: string, extra: extraType) =>
		setInputs(state => ({
			...state,
			[name]: {
				...state?.[name],
				...extra,
			},
		}));

	//? make all inputs dirty
	const setAllDirty = () =>
		setInputs(state => {
			const newState = { ...state };
			Object?.entries(newState)?.forEach(([name]) => {
				const curInput = newState?.[name];
				curInput.dirty = true;
				if (curInput?.validation) curInput.validation.isValid = validateInput(name, curInput.value);
			});
			return newState;
		});

	//? control dirty state of an input
	const setDirty = (name: string, isDirty: boolean) =>
		setInputs(state => {
			const newState = { ...state };
			const curInput = newState?.[name];
			if (!curInput) return newState;
			curInput.dirty = isDirty;
			if (curInput?.validation) curInput.validation.isValid = validateInput(name, curInput.value);
			return newState;
		});

	//? manually set an input validity
	const setInputValidity = (name: string, isValid: boolean) =>
		setInputs(state => {
			const newState = { ...state };
			const curInput = newState?.[name];
			if (!curInput) return newState;
			curInput?.validation && (curInput.validation.isValid = isValid);
			return newState;
		});

	//? get dirty state of some input
	const isDirty = (name: string) => Inputs?.[name]?.dirty;

	//? get value of some input
	const valueOf = (name: string) => Inputs?.[name]?.value;

	//? get default value of some input
	const defaultValueOf = (name: string) => Inputs?.[name]?.defaultValue;

	//? get label of an input
	const labelOf = (name: string) => options?.inputs?.[name]?.label || options?.labels?.[name] || '';

	//? return true if any dirty input exist
	const isSomeDirty = Object.values(Inputs).some(i => i.dirty === true);

	//? return true if any inputs value changed
	const isSomeModified = Object.values(Inputs).some(i => i.value !== (i.defaultValue === undefined ? '' : i.defaultValue));

	//? get validation info about an input
	const validOf = (name: string) => {
		const isValid = Inputs?.[name]?.validation?.isValid;
		return {
			isValid,
			isValidDirty: !isDirty(name) || isValid,
			msg: Inputs?.[name]?.validation?.errorMsg || '',
		};
	};

	//? reset all inputs values
	const resetInputs = useCallback(
		(inputsName: Array<string> = []) => {
			setInputs(state => {
				const newState = { ...state };
				Object.keys(newState).forEach(name => {
					if (inputsName.length === 0 || inputsName.includes(name))
						newState[name] = {
							...state[name],
							dirty: false,
							value: state?.[name]?.defaultValue || '',
						};
				});
				return newState;
			});
		},
		[setInputs]
	);

	//? get inputs default values
	const getDefaultInputsData = useCallback(() => {
		const data: any = {};
		Object.entries(Inputs).forEach(e => (data[e[0]] = e[1]?.defaultValue));
		return data;
	}, [Inputs]);

	//? get an object of all inputs data
	const getInputsData = useCallback(() => {
		const data: any = {};
		Object.entries(Inputs).forEach(e => (data[e[0]] = e[1]?.value));
		return data;
	}, [Inputs]);

	//? get an object of all dirty inputs data
	const getDirtyInputsData = useCallback(() => {
		const data: any = {};
		Object.entries(Inputs)
			.filter(i => i[1].dirty === true)
			.forEach(e => (data[e[0]] = e[1]?.value || ''));
		return data;
	}, [Inputs]);

	//?------------------------- key listeners --------------------------------
	type KeyCodes = string;
	const windowKeyCallbacks = useRef<{ cb: (event?: KeyboardEvent | undefined) => any; code?: KeyCodes }[]>([]);
	const onWindowKeyDownHandler = (e: KeyboardEvent) => {
		windowKeyCallbacks.current.forEach(
			({ cb, code }) => (code === undefined || code?.toLowerCase?.() === e?.code?.toLowerCase?.()) && cb(e)
		);
	};
	const onWindowKeyDown = useCallback((callback: KeyDownCallbackType, keyCode?: KeyCodes) => {
		windowKeyCallbacks.current.push({ cb: callback, code: keyCode });
	}, []);
	useEffect(() => {
		window.addEventListener('keydown', onWindowKeyDownHandler);
		return () => window.removeEventListener('keydown', onWindowKeyDownHandler);
	}, []);

	//?----------------------------- input key listeners --------------------------------
	const inputKeyCallbacks = useRef<{ cb: InputKeyDownCallbackType; code?: KeyCodes }[]>([]);
	const onInputKeyDownHandler = (e: KeyboardEvent, name: string) =>
		inputKeyCallbacks.current.forEach(
			({ cb, code }) => (code === undefined || code?.toLowerCase?.() === e?.code?.toLowerCase?.()) && cb(e, name)
		);
	const onInputKeyDown = useCallback((callback: InputKeyDownCallbackType, keyCode?: KeyCodes) => {
		inputKeyCallbacks.current.push({ cb: callback, code: keyCode });
	}, []);
	//?----------------------------------------------------------------------------------

	const _initializeInput = (name: string, extra: extraType = {}) => {
		const isInputEmpty = !Inputs[name];
		const isDefaultValueUpdated = extra?.defaultValue !== Inputs[name]?.defaultValue;
		if (isInputEmpty || isDefaultValueUpdated)
			return setInputs(state => {
				const value = extra?.defaultValue || '';
				const validation = options?.validation?.[name];
				const isValid = validateInput(name, value);
				return {
					...state,
					[name]: {
						value,
						dirty: false,
						...extra,
						...(validation
							? {
									validation: {
										isValid,
										required: validation.required,
										errorMsg: isValid ? '' : validation.errorMsg,
									},
							  }
							: {}),
					},
				};
			});
	};

	useEffect(() => {
		const all = { ...(options?.inputs || {}), ...(options?.labels || {}), ...(options?.validation || {}) };
		Object.keys(all).forEach(name => !Inputs?.[name] && _initializeInput(name));
	}, [options?.inputs, options?.labels, options?.validation]);

	//? register input element
	//? <input {...register('myInput')} />
	const register = useCallback(
		(name: string, extra: extraType = {}, isRsuite: boolean = options?.isRsuite || false) => {
			let _onChange: any = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e, extra);
			if (isRsuite || !!extra?.isRsuite) _onChange = (value: string) => onValueChange(name, value, extra);
			_initializeInput(name, extra);

			const registerObj: Record<string, any> = {
				name,
				value: Inputs?.[name]?.value || '',
				onChange: extra?.onChange ?? _onChange,
				onBlur: extra?.onBlur ?? (() => !Inputs[name]?.dirty && setDirty(name, true)),
				onKeyDown: extra?.onKeyDown ?? ((e: KeyboardEvent) => onInputKeyDownHandler(e, name)),
			};

			['onChange', 'onBlur', 'onKeyDown'].forEach(e => extra?.[e] === false && delete registerObj[e]);

			return registerObj;
		},
		[Inputs, onValueChange, options?.isRsuite]
	);

	return {
		Inputs,
		validOf,
		labelOf,
		valueOf,
		isDirty,
		options,
		setDirty,
		addExtra,
		register,
		setInputs,
		resetInputs,
		setAllDirty,
		isSomeDirty,
		getInputsData,
		setInputValue,
		isInputsValid,
		defaultValueOf,
		isSomeModified,
		onInputKeyDown,
		onWindowKeyDown,
		getDirtyInputsData,
		getDefaultInputsData,

		Data,
		setData,
		addData,
		removeData,
	};
};

export default useInputs;
