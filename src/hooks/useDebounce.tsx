import { useEffect, useState } from 'react';

/**
 * debounce hook
 * @param {string} searcValue search value
 * @param {number} timeOut throttling value
 * @returns
 */
export const useDebounce = (searcValue: string, timeOut: number): string => {
  const [debounceValue, setDebounceValue] = useState(searcValue);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(searcValue);
    }, timeOut);

    return () => {
      clearTimeout(handler);
    };
  }, [searcValue]);

  return debounceValue;
};
