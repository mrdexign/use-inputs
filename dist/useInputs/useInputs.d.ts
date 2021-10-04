/// <reference types="react" />
import * as Types from './Types';
declare const useInputs: (options?: Types.OptionsType | undefined) => {
    register: (name: string, extra?: {}, isRsuite?: boolean) => object;
    Inputs: Types.InputsType;
    setInputs: import("react").Dispatch<import("react").SetStateAction<Types.InputsType>>;
    isDirty: (name: string) => boolean;
    validOf: (name: string) => {
        isValid: boolean | undefined;
        isValidDirty: boolean | undefined;
        msg: string;
    };
    isInputsValid: boolean;
    resetInputs: (inputsName?: Array<string>) => void;
    getInputsData: () => any;
    addExtra: (name: string, extra: object) => void;
};
export default useInputs;
