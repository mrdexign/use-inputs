import { useEffect, useState, useCallback } from 'react';
import * as Types from './FormTypes';
import { validation } from './formValidations';

const useForm = (options?: Types.UseFormOptionsType) => {
	const [isFormValid, setIsFormValid] = useState(false);
	const [Inputs, setInputs] = useState<Types.InputsType>({});

	//? custom onChange
	const onValueChange = useCallback(
		(name: string, value: string = '', extra: object = {}) => {
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
		(event: React.ChangeEvent<HTMLInputElement>, extra: object = {}) => {
			const name = event?.target?.name || 'unknown';
			const value = event?.target?.value || '';
			console.log(value);
			onValueChange(name, value, extra);
		},
		[onValueChange]
	);

	//? validity check of all values
	useEffect(
		() => setIsFormValid(Object.values(Inputs).every(i => i.validation?.isValid === true)),
		[Inputs]
	);

	//? add extra data to some input
	const addExtra = (name: string, extra: object) =>
		setInputs(state => ({
			...state,
			[name]: {
				...state[name],
				...extra,
			},
		}));

	//? get dirty state of some input
	const isDirty = (name: string) => Inputs?.[name]?.dirty;

	//? get validation info about some input
	const validOf = (name: string) => {
		const isValid = Inputs?.[name]?.validation?.isValid;
		return {
			isValid,
			isValidDirty: !isDirty(name) || isValid,
			msg: Inputs?.[name]?.validation?.errorMsg || '',
		};
	};

	//? reset all form values
	const resetFormValues = useCallback(
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
	const getFormData = () => {
		const data: any = {};
		Object.entries(Inputs).forEach(e => (data[e[0]] = e[1]?.value));
		return data;
	};

	//? register input element to useForm
	//? <input {...register('myInput')} ></input>
	const register = useCallback(
		(name: string, extra: {} = {}, isRsuite: boolean = options?.isRsuite || false) => {
			!Inputs[name] &&
				setInputs(state => ({
					...state,
					[name]: {
						value: '',
						dirty: false,
					},
				}));
			return {
				name,
				value: Inputs?.[name]?.value || '',
				onChange: isRsuite
					? (value: string) => onValueChange(name, value)
					: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e, extra),
				...extra,
			} as object;
		},
		[Inputs, onChange, onValueChange, options?.isRsuite]
	);

	return {
		isDirty,
		register,
		validOf,
		isFormValid,
		Inputs,
		setInputs,
		getFormData,
		resetFormValues,
		addExtra,
	};
};

export default useForm;
