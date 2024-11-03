import { IShellOptions } from './shell';
import { IFlagTypes } from './whisper';
import { ITranscriptLine } from './tsToArray';
interface IOptions {
    modelName?: string;
    modelPath?: string;
    whisperOptions?: IFlagTypes;
    shellOptions?: IShellOptions;
}
export declare const whisper: (filePath: string, options?: IOptions) => Promise<ITranscriptLine[]>;
export default whisper;
