export declare const createCppCommand: ({ filePath, modelName, modelPath, options }: CppCommandTypes) => string;
export declare const MODELS_LIST: {
    tiny: string;
    "tiny.en": string;
    base: string;
    "base.en": string;
    small: string;
    "small.en": string;
    medium: string;
    "medium.en": string;
    "large-v1": string;
    large: string;
};
type CppCommandTypes = {
    filePath: string;
    modelName?: string;
    modelPath?: string;
    options?: IFlagTypes;
};
export type IFlagTypes = {
    "gen_file_txt"?: boolean;
    "gen_file_subtitle"?: boolean;
    "gen_file_vtt"?: boolean;
    "timestamp_size"?: number;
    "word_timestamps"?: boolean;
    "language"?: string;
};
export {};
