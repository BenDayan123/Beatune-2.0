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
// export type TIME_FORMAT = "auto" | "mm:ss" | "hh:mm:ss";

// const addHeadingZero = (num: number): string => {
//   return num > 9 ? num.toString() : `0${num}`;
// };

// export const getDisplayTimeBySeconds = (
//   seconds: number,
//   totalSeconds: number,
//   timeFormat: TIME_FORMAT
// ) => {
//   if (!isFinite(seconds)) {
//     return null;
//   }

//   const min = Math.floor(seconds / 60);
//   const minStr = addHeadingZero(min);
//   const secStr = addHeadingZero(Math.floor(seconds % 60));
//   const minStrForHour = addHeadingZero(Math.floor(min % 60));
//   const hourStr = Math.floor(min / 60);

//   const mmSs = `${minStr}:${secStr}`;
//   const hhMmSs = `${hourStr}:${minStrForHour}:${secStr}`;

//   if (timeFormat === "auto") {
//     if (totalSeconds >= 3600) {
//       return hhMmSs;
//     } else {
//       return mmSs;
//     }
//   } else if (timeFormat === "mm:ss") {
//     return mmSs;
//   } else if (timeFormat === "hh:mm:ss") {
//     return hhMmSs;
//   }
// };
