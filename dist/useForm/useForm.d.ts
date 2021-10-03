/// <reference types="react" />
import * as Types from './FormTypes';
declare const useForm: (options?: Types.UseFormOptionsType | undefined) => {
    isDirty: (name: string) => boolean;
    register: (name: string, extra?: {}, isRsuite?: boolean) => object;
    validOf: (name: string) => {
        isValid: boolean | undefined;
        isValidDirty: boolean | undefined;
        msg: string;
    };
    isFormValid: boolean;
    Inputs: Types.InputsType;
    setInputs: import("react").Dispatch<import("react").SetStateAction<Types.InputsType>>;
    getFormData: () => any;
    resetFormValues: (inputsName?: Array<string>) => void;
    addExtra: (name: string, extra: object) => void;
};
export default useForm;
