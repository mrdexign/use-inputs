/// <reference types="react" />
export declare type Validation = {
    [name: string]: {
        mask?: string;
        regex?: RegExp;
        errorMsg?: string;
        required?: boolean;
        validator?: (value: string) => boolean;
        validChars?: 'number' | '+number' | 'alphabet' | RegExp;
    };
};
export declare type OptionsType = {
    isRsuite?: boolean;
    validation?: Validation;
};
export declare type TypeEvent = {
    name?: string | number;
    extra?: extraType;
    event: React.ChangeEvent<HTMLInputElement>;
};
export declare type extraType = {
    isRsuite?: boolean;
    defaultValue?: string;
    validChars?: 'number' | '+number' | 'alphabet' | RegExp;
};
export declare type InputType = {
    value: string;
    defaultValue?: string;
    dirty: boolean;
    validation?: {
        errorMsg?: string;
        isValid: boolean;
        required?: boolean;
    };
};
export declare type InputsType = {
    [name: string]: InputType;
};
export default OptionsType;
