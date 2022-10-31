import { useState, useEffect } from 'react';

type UseFetch<T> = {
  loading: boolean;
  data?: T;
  fetchData: (url: string) => Promise<void>;
};
export const useFetch = <T,>(url: string, q?: string): UseFetch<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();

  const fetchData = async (query?: string): Promise<void> => {
    setLoading(true);
    const response = await fetch(`${url}?${(query || q) ?? ''}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = (await response.json()) as unknown as T;
    console.log(result);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    void fetchData();
  }, [url]);

  return { loading, data, fetchData };
};

export default useFetch;
