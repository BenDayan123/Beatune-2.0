export const secondsToISOFormet = (sec: number) => {
  return sec ? new Date(sec * 1000).toISOString().substring(14, 19) : "00:00";
  // return new Date(sec * 1000).toISOString().substring(11, 16);
};

export function numberWithCommas(num: string | number): string {
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function toShortNumber(num: number) {
  return Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(num);
}

export function unixTimeToDateFormat(unix_timestamp: number) {
  const date = new Date(unix_timestamp * 1000);
  return date.toLocaleDateString("en-US");
  // var year = date.getUTCFullYear();
  // var month = date.getUTCMonth();
  // var day = date.getUTCDay();

  // return day + "/" + month + "/" + year;
}
