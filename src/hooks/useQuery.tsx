import React from "react";
import { useSearchParams } from "react-router-dom";

export function useURLQuery(query: string): any {
  const [searchParams] = useSearchParams();

  return React.useMemo(() => {
    return searchParams.get(query);
  }, [searchParams, query]);
}
