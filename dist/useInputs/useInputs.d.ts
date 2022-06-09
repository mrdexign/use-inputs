/// <reference types="react" />
import * as Types from './Types';
import { extraType, InputKeyDownCallbackType, KeyDownCallbackType } from './Types';
declare const useInputs: <T extends Types.OptionsType>(options?: T | undefined) => {
    Inputs: Types.InputsType;
    validOf: (name: string) => {
        isValid: boolean | undefined;
        isValidDirty: boolean | undefined;
        msg: string;
    };
    labelOf: (name: string) => string;
    valueOf: (name: string) => string;
    isDirty: (name: string) => boolean;
    options: T | undefined;
    setDirty: (name: string, isDirty: boolean) => void;
    addExtra: (name: string, extra: extraType) => void;
    register: (name: string, extra?: extraType, isRsuite?: boolean) => Record<string, any>;
    setInputs: import("react").Dispatch<import("react").SetStateAction<Types.InputsType>>;
    tabIndexOf: (name: string) => number | undefined;
    resetInputs: (inputsName?: Array<string>) => void;
    setAllDirty: () => void;
    isSomeDirty: boolean;
    getInputsData: () => any;
    setInputValue: (name: string, value: string) => void;
    isInputsValid: boolean;
    defaultValueOf: (name: string) => string | undefined;
    isSomeModified: boolean;
    onInputKeyDown: (callback: InputKeyDownCallbackType, keyCode?: string | undefined) => void;
    onWindowKeyDown: (callback: KeyDownCallbackType, keyCode?: string | undefined) => void;
    getDirtyInputsData: () => any;
    isDirtyInputsValid: boolean;
    getDefaultInputsData: () => any;
    Data: Record<string, any>;
    setData: import("react").Dispatch<import("react").SetStateAction<Record<string, any>>>;
    addData: (name: string, data: any) => void;
    removeData: (name: string, data: any) => void;
};
export default useInputs;
