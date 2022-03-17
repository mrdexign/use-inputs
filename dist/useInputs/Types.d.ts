/// <reference types="react" />
import { regex, validCharsRegex } from './constants';
export declare type LabelsType = {
    [name: string]: string;
};
export declare type InputsType = {
    [name: string]: InputType;
};
export declare type Validation = {
    [name: string]: InputValidation;
};
export declare type ValidCharsType = RegExp | keyof typeof validCharsRegex;
export declare type OptionsType = Record<string, any> & {
    isRsuite?: boolean;
    labels?: LabelsType;
    validation?: Validation;
    inputs?: InputConfigType;
};
export declare type InputType = {
    value: string;
    defaultValue?: string;
    dirty: boolean;
    validation?: {
        isValid: boolean;
        errorMsg?: string;
        required?: boolean;
    };
};
export declare type InputValidation = {
    mask?: string;
    regex?: RegExp | keyof typeof regex;
    errorMsg?: string;
    required?: boolean;
    validator?: (value: string) => boolean;
    validChars?: ValidCharsType;
};
export declare type InputConfigType = {
    [name: string]: {
        label?: string;
        validation?: InputValidation;
        valueMap?: (value: string) => string;
    };
};
export declare type TypeEvent = {
    name?: string | number;
    extra?: extraType;
    event: React.ChangeEvent<HTMLInputElement>;
};
export declare type extraType = {
    isRsuite?: boolean;
    defaultValue?: string;
    validChars?: ValidCharsType;
};
export declare type KeyDownCallbackType = (event?: KeyboardEvent) => any;
export declare type InputKeyDownCallbackType = (event?: KeyboardEvent, name?: string) => any;
export default OptionsType;
