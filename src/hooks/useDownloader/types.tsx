import { ISong } from "../../interfaces";

export type IDownload = {
  key: string;
  name: string;
  percentage: number;
  isInProgress: boolean;
};

export type IDownloadFunction = (track: ISong) => string;

export type IErrorMessage = {
  errorMessage: string;
} | null;

export type IDownloaderList = [
  downloadsList: IDownload[],
  setDownloadsList: React.Dispatch<React.SetStateAction<IDownload[]>>
];
