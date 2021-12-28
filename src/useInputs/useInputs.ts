import * as Types from './Types';
import { extraType, KeyPressCallbackType as KeyDownCallbackType } from './Types';
import { validation } from './Validations';
import { useEffect, useState, useCallback, useRef } from 'react';

const useInputs = (options?: Types.OptionsType) => {
	const [isInputsValid, setIsInputsValid] = useState(false);
	const [Inputs, setInputs] = useState<Types.InputsType>({});

	const validateInput = (name: string, value: string): boolean => {
		let isValid = true;
		const valid = { ...validation, ...options?.validation }?.[name];
		if (valid?.regex) isValid = isValid && valid?.regex?.test(value);
		if (valid?.validator) isValid = isValid && valid?.validator(value);
		if (valid?.required) isValid = isValid && value !== '';
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

	//? custom onChange
	const onValueChange = useCallback(
		(name: string, value: string = '', extra: extraType = {}) => {
			const valid = { ...validation, ...options?.validation }?.[name];

			const validCharType = extra?.validChars || valid?.validChars;
			if (validCharType) {
				if (validCharType instanceof RegExp && !validCharType.test(value)) return;
				else if (validCharType === '+number' && !/^[0-9]*[.]?[0-9]*$/.test(value)) return;
				else if (validCharType === 'number' && !/^(\-|\+)?[0-9]*[.]?[0-9]*$/.test(value)) return;
				else if (validCharType === 'alphabet' && !/^[a-zA-Z\s]*$/.test(value)) return;
			}

			let isValid = validateInput(name, value);

			setInputs(state => ({
				...state,
				[name]: {
					dirty: true,
					value: value,
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

	//? custom onChange
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

	//?set additional data to Inputs
	const setAdditionalData = (name: string, data: any) =>
		setInputs(state => ({
			...state,
			[name]: {
				dirty: true,
				value: data,
			},
		}));

	//? get value of some input
	const valueOf = (name: string) => Inputs?.[name]?.value;

	//? get default value of some input
	const defaultValueOf = (name: string) => Inputs?.[name]?.defaultValue;

	//? add extra data to some input
	const addExtra = (name: string, extra: extraType) =>
		setInputs(state => ({
			...state,
			[name]: {
				...state?.[name],
				...extra,
			},
		}));

	//? get dirty state of some input
	const isDirty = (name: string) => Inputs?.[name]?.dirty;

	//? return true if any dirty input exist
	const isSomeDirty = Object.values(Inputs).some(i => i.dirty === true);

	//? return true if any inputs value changed
	const isSomeModified = Object.values(Inputs).some(i => i.value !== (i.defaultValue === undefined ? '' : i.defaultValue));

	//? get validation info about some input
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

	//? key press listeners
	type KeyCodes = string;
	const keyCallbacks = useRef<{ cb: KeyDownCallbackType; code?: KeyCodes }[]>([]);
	const onKeyDownHandler = (e: KeyboardEvent, name: string) =>
		keyCallbacks.current.forEach(
			({ cb, code }) => (code === undefined || code?.toLowerCase?.() === e?.code?.toLowerCase?.()) && cb(e, name)
		);
	const onInputKeyDown = useCallback((callback: KeyDownCallbackType, keyCode?: KeyCodes) => {
		keyCallbacks.current.push({ cb: callback, code: keyCode });
	}, []);

	//? register input element
	//? <input {...register('myInput')} />
	const register = useCallback(
		(name: string, extra: extraType = {}, isRsuite: boolean = options?.isRsuite || false) => {
			const isInputEmpty = !Inputs[name];
			const isDefaultValueUpdated = extra?.defaultValue !== Inputs[name]?.defaultValue;
			if (isInputEmpty || isDefaultValueUpdated) {
				setInputs(state => {
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
			}

			return {
				name,
				value: Inputs?.[name]?.value || '',
				onKeyDown: (e: KeyboardEvent) => onKeyDownHandler(e, name),
				onChange:
					isRsuite || !!extra?.isRsuite
						? (value: string) => onValueChange(name, value, extra)
						: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e, extra),
			} as object;
		},
		[Inputs, onValueChange, options?.isRsuite]
	);

	return {
		Inputs,
		validOf,
		valueOf,
		isDirty,
		addExtra,
		register,
		setInputs,
		resetInputs,
		isSomeDirty,
		getInputsData,
		setInputValue,
		isInputsValid,
		defaultValueOf,
		isSomeModified,
		onInputKeyDown,
		setAdditionalData,
		getDirtyInputsData,
		getDefaultInputsData,
	};
};

export default useInputs;
