/// <reference types="react" />
export declare type Validation = {
    [name: string]: {
        regex?: RegExp;
        errorMsg?: string;
        required?: boolean;
        validator?: (value: string) => boolean;
    };
};
export declare type UseFormOptionsType = {
    validation?: Validation;
    isRsuite?: boolean;
};
export declare type TypeEvent = {
    name?: string | number;
    extra?: object;
    event: React.ChangeEvent<HTMLInputElement>;
};
export declare type InputType = {
    value: string;
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
export default UseFormOptionsType;
