export type Validation = {
	[name: string]: {
		regex?: RegExp;
		errorMsg?: string;
		required?: boolean;
		validator?: (value: string) => boolean;
	};
};

export type UseFormOptionsType = {
	validation?: Validation;
	isRsuite?: boolean;
};

export type TypeEvent = {
	name?: string | number;
	extra?: object;
	event: React.ChangeEvent<HTMLInputElement>;
};

export type InputType = {
	value: string;
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

export default UseFormOptionsType;
