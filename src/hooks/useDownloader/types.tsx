export type IDownload = {
  key: string;
  percentage: number;
  isInProgress: boolean;
};

export type IDownloadFunction = (url: string) => string;

export type IErrorMessage = {
  errorMessage: string;
} | null;

export type IDownloaderList = [
  downloadsList: IDownload[],
  setDownloadsList: React.Dispatch<React.SetStateAction<IDownload[]>>
];
