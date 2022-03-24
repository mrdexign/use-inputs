import { regex, validCharsRegex } from './constants';

export type LabelsType = { [name: string]: string };

export type InputsType = { [name: string]: InputType };

export type Validation = { [name: string]: InputValidation };

export type ValidCharsType = RegExp | keyof typeof validCharsRegex;

export type OptionsType = Record<string, any> & {
	isRsuite?: boolean;
	labels?: LabelsType;
	validation?: Validation; //Deprecated
	inputs?: InputConfigType;
};

export type InputType = {
	value: string;
	defaultValue?: string;
	dirty: boolean;
	validation?: {
		isValid: boolean;
		errorMsg?: string;
		required?: boolean;
	};
};

export type InputValidation = {
	mask?: string;
	regex?: RegExp | keyof typeof regex;
	errorMsg?: string;
	required?: boolean;
	validator?: (value: string) => boolean;
	validChars?: ValidCharsType;
};

export type InputConfigType = {
	[name: string]: {
		label?: string;
		validation?: InputValidation;
		valueMap?: (value: string) => string;
	};
};

export type TypeEvent = {
	name?: string | number;
	extra?: extraType;
	event: React.ChangeEvent<HTMLInputElement>;
};

export type extraType = {
	isRsuite?: boolean;
	defaultValue?: string;
	validChars?: ValidCharsType;
	onBlur?: Function | false;
	onKeyDown?: ((e: KeyboardEvent) => void) | false;
	onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | false;
};

export type KeyDownCallbackType = (event?: KeyboardEvent) => any;
export type InputKeyDownCallbackType = (event?: KeyboardEvent, name?: string) => any;

export default OptionsType;
