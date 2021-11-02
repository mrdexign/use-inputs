import * as Types from './Types';
import { validation } from './Validations';
import { useEffect, useState, useCallback } from 'react';
import { extraType } from './Types';

const useInputs = (options?: Types.OptionsType) => {
	const [isInputsValid, setIsInputsValid] = useState(false);
	const [Inputs, setInputs] = useState<Types.InputsType>({});

	//? validity check of all values
	useEffect(() => setIsInputsValid(Object.values(Inputs).every(i => i.validation?.isValid === true)), [Inputs]);

	//? custom onChange
	const onValueChange = useCallback(
		(name: string, value: string = '', extra: extraType = {}) => {
			const valid = { ...validation, ...options?.validation }?.[name];
			let isValid = true;
			if (valid?.regex) isValid = isValid && valid?.regex?.test(value);
			if (valid?.validator) isValid = isValid && valid?.validator(value);
			if (valid?.required) isValid = isValid && value !== '';

			setInputs(state => ({
				...state,
				[name]: {
					dirty: true,
					value: value,
					validation: {
						isValid,
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

	//? add extra data to some input
	const addExtra = (name: string, extra: extraType) =>
		setInputs(state => ({
			...state,
			[name]: {
				...state[name],
				...extra,
			},
		}));

	//? get dirty state of some input
	const isDirty = (name: string) => Inputs?.[name]?.dirty;

	//? return true if any dirty input exist
	const isSomeDirty = () => Object.values(Inputs).some(i => i.dirty === true);

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
							value: '',
							dirty: false,
						};
				});
				return newState;
			});
		},
		[setInputs]
	);

	//? get an object of all inputs data
	const getInputsData = useCallback(() => {
		const data: any = {};
		Object.entries(Inputs).forEach(e => (data[e[0]] = e[1]?.value));
		return data;
	}, [Inputs]);

	//? register input element
	//? <input {...register('myInput')} ></input>
	const register = useCallback(
		(name: string, extra: extraType = {}, isRsuite: boolean = options?.isRsuite || false) => {
			const isInputEmpty = !Inputs[name];
			const isDefaultValueUpdated = extra?.defaultValue !== Inputs[name]?.defaultValue;
			if (isInputEmpty || isDefaultValueUpdated) {
				setInputs(state => {
					return {
						...state,
						[name]: {
							value: extra?.defaultValue || '',
							dirty: false,
							...extra,
						},
					};
				});
			}
			return {
				name,
				value: Inputs?.[name]?.value || '',
				onChange: isRsuite
					? (value: string) => onValueChange(name, value, extra)
					: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e, extra),
			} as object;
		},
		[Inputs, onValueChange, options?.isRsuite]
	);

	return {
		register,
		Inputs,
		setInputs,
		isDirty,
		isSomeDirty,
		validOf,
		isInputsValid,
		resetInputs,
		getInputsData,
		addExtra,
	};
};

export default useInputs;
