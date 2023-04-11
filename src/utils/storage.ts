import { useState, useEffect } from "react";
import { appLocalDataDir } from "@tauri-apps/api/path";
import * as fs from "@tauri-apps/api/fs";
import axios from "axios";

export function useSaveLocal(songID: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    axios
      .get(`song/${songID}/audio`, {
        responseType: "blob",
        onDownloadProgress: (progressEvent: ProgressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progress);
        },
      })
      .then(async (res) => {
        const localDir = await appLocalDataDir();
        fs.writeBinaryFile(localDir + "test.mp3", await res.data.arrayBuffer());
      });
  }, []);
  return progress;
}
// .get(`/media/songs/${songID}.mp3`, {
