export type Validation = {
	[name: string]: {
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
};

export type TypeEvent = {
	name?: string | number;
	extra?: extraType;
	event: React.ChangeEvent<HTMLInputElement>;
};

export type extraType = {
	defaultValue?: string;
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

export default OptionsType;
