import { useState, useEffect } from "react";
import ColorThief from "color-thief-ts";

const colorThief = new ColorThief({ crossOrigin: false });

export function useColor(image?: string, quality: number = 100) {
  const [color, setColor] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if(image){
      colorThief
        .getColorAsync(image, { colorType: "hex", quality })
        .then((color) => {
          setColor(typeof color === "string" ? color : "#1d1d1d");
          setLoading(false);
        })
        .catch(() => setLoading(false));  
    }
    setLoading(false)
  }, [image]);

  return { color, isLoading };
}
