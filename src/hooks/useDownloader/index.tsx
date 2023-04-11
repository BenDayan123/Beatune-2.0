import React, { PropsWithChildren, createContext, useState } from "react";
import { IDownload, IDownloadFunction, IDownloaderList } from "./types";
import axios from "axios";
import { generateUUID } from "../../utils/general";
import { appLocalDataDir } from "@tauri-apps/api/path";
import * as fs from "@tauri-apps/api/fs";

type Context = IDownloaderList;

const DownloaderContext = createContext<Context>({} as Context);

export function useDownloaderList() {
  return React.useContext(DownloaderContext);
}

export const useDownload = () => {
  const [downloadsList, setDownloadsList] = useDownloaderList();

  const download: IDownloadFunction = (url) => {
    const key = generateUUID();

    setDownloadsList([
      ...downloadsList,
      { key, percentage: 0, isInProgress: true },
    ]);
    axios
      .get(url, {
        responseType: "blob",
        onDownloadProgress: (progressEvent: ProgressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setDownloadsList((prev) =>
            prev.map((e) => (e.key == key ? { ...e, percentage: progress } : e))
          );
        },
      })
      .then(async (res) => {
        const localDir = await appLocalDataDir();
        fs.writeBinaryFile(
          localDir + `${key}.file`,
          await res.data.arrayBuffer()
        );
        setDownloadsList((prev) => prev.filter((e) => e.key != key));
      });
    return key;
  };

  return { download, setDownloadsList };
};

export const DownloaderProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [downloadsList, setDownloadsList] = useState<IDownload[]>([]);

  return (
    <DownloaderContext.Provider value={[downloadsList, setDownloadsList]}>
      {children}
    </DownloaderContext.Provider>
  );
};
