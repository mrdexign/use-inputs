/// <reference types="react" />
import * as Types from './Types';
import { extraType } from './Types';
declare const useInputs: (options?: Types.OptionsType | undefined) => {
    register: (name: string, extra?: extraType, isRsuite?: boolean) => object;
    Inputs: Types.InputsType;
    setInputs: import("react").Dispatch<import("react").SetStateAction<Types.InputsType>>;
    isDirty: (name: string) => boolean;
    isSomeDirty: () => boolean;
    validOf: (name: string) => {
        isValid: boolean | undefined;
        isValidDirty: boolean | undefined;
        msg: string;
    };
    isInputsValid: boolean;
    resetInputs: (inputsName?: Array<string>) => void;
    getInputsData: () => any;
    getDirtyInputsData: () => any;
    addExtra: (name: string, extra: extraType) => void;
    setAdditionalData: (name: string, data: any) => void;
    setInputValue: (name: string, value: string) => void;
    defaultValueOf: (name: string) => string | undefined;
    getDefaultInputsData: () => any;
    valueOf: (name: string) => string;
};
export default useInputs;
