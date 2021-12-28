export type Validation = {
	[name: string]: {
		mask?: string;
		regex?: RegExp;
		errorMsg?: string;
		required?: boolean;
		validator?: (value: string) => boolean;
		validChars?: 'number' | '+number' | 'alphabet' | RegExp;
	};
};

export type OptionsType = {
	isRsuite?: boolean;
	validation?: Validation;
	// keyListener?: boolean;
	submitBtnSelector?: string;
};

export type TypeEvent = {
	name?: string | number;
	extra?: extraType;
	event: React.ChangeEvent<HTMLInputElement>;
};

export type extraType = {
	isRsuite?: boolean;
	defaultValue?: string;
	validChars?: 'number' | '+number' | 'alphabet' | RegExp;
};

export type InputType = {
	value: string;
	defaultValue?: string;
	dirty: boolean;
	validation?: {
		errorMsg?: string;
		isValid: boolean;
		required?: boolean;
	};
};

export type InputsType = {
	[name: string]: InputType;
};

export type KeyPressCallbackType = (event?: KeyboardEvent, name?: string) => any;

export default OptionsType;
