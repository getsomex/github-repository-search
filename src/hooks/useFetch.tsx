import { useState } from 'react';
type QueryParams = {
  [key: string]: string | number | boolean;
};
type UseFetch<T, E> = {
  isLoading: boolean;
  data: T;
  error: E | undefined;
  fetchData: (params: QueryParams) => Promise<void>;
};

const constructUrl = (url: string, params?: QueryParams): URL => {
  const urlInstance = new URL(url);
  if (params) {
    Object.keys(params).forEach((key) =>
      urlInstance.searchParams.append(key, String(params[key]))
    );
  }
  return urlInstance;
};
/**
 * Fetch Hook
 * @param {string} url
 * @returns UseFetch<T>
 */
export const useFetch = <T, E>(
  url: string,
  initialParams?: QueryParams
): UseFetch<T, E> => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>({} as T);
  const [error, setError] = useState<E>();
  const fetchData = async (params?: QueryParams): Promise<void> => {
    setError(undefined);
    setIsLoading(true);
    const constructedUrl = constructUrl(url, params ? params : initialParams);
    const response = await fetch(constructedUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    if (response.status !== 200) {
      const err = (await response.json()) as unknown as E;
      setError(err);
      setIsLoading(false);
      return;
    }
    const result = (await response.json()) as unknown as T;
    setData(result);
    setIsLoading(false);
  };
  return { isLoading, data, fetchData, error };
};

export default useFetch;
