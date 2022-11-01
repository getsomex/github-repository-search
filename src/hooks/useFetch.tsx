import { useState, useEffect } from 'react';
type UseFetch<T> = {
  loading: boolean;
  data?: T;
  fetchData: (url: string) => Promise<void>;
};
/**
 * Fetch Hoo
 * @param {string} url
 * @returns UseFetch<T>
 */
export const useFetch = <T,>(url: string): UseFetch<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();

  const fetchData = async (query?: string): Promise<void> => {
    setLoading(true);
    const response = await fetch(`${url}${query ? '?' + query : ''}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const result = (await response.json()) as unknown as T;
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    void fetchData();
  }, [url]);

  return { loading, data, fetchData };
};

export default useFetch;
