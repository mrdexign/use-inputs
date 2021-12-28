/// <reference types="react" />
import * as Types from './Types';
import { extraType, KeyPressCallbackType as KeyDownCallbackType } from './Types';
declare const useInputs: (options?: Types.OptionsType | undefined) => {
    Inputs: Types.InputsType;
    validOf: (name: string) => {
        isValid: boolean | undefined;
        isValidDirty: boolean | undefined;
        msg: string;
    };
    valueOf: (name: string) => string;
    isDirty: (name: string) => boolean;
    addExtra: (name: string, extra: extraType) => void;
    register: (name: string, extra?: extraType, isRsuite?: boolean) => object;
    setInputs: import("react").Dispatch<import("react").SetStateAction<Types.InputsType>>;
    resetInputs: (inputsName?: Array<string>) => void;
    isSomeDirty: boolean;
    getInputsData: () => any;
    setInputValue: (name: string, value: string) => void;
    isInputsValid: boolean;
    defaultValueOf: (name: string) => string | undefined;
    isSomeModified: boolean;
    onInputKeyDown: (callback: KeyDownCallbackType, keyCode?: string | undefined) => void;
    setAdditionalData: (name: string, data: any) => void;
    getDirtyInputsData: () => any;
    getDefaultInputsData: () => any;
};
export default useInputs;
