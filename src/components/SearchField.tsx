import { useRef } from 'react';
import { HiX, HiSearch } from 'react-icons/hi';

type Props = {
  placeHolder?: string;
  hasError?: boolean;
  value?: string;
  onChange?: (searchTerm: string) => void;
  onClear?: () => void;
};
export const SearchField = ({
  placeHolder,
  hasError,
  value,
  onChange,
  onClear,
}: Props): JSX.Element => {
  const inputRef = useRef<null | HTMLInputElement>(null);

  /**
   * clear search field
   */
  const handleOnClickClear = (): void => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onClear?.();
  };
  /**
   * search field change handler
   * @param {string} val
   */
  const handleOnchange = (val: string): void => {
    if (val.length > 0 && !val.trim()) return;
    onChange?.(val.trim());
  };
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <HiSearch />
      </div>
      <input
        type="text"
        value={value}
        className={`block w-full rounded-lg border  ${
          hasError ? 'dark:border-red-500' : 'dark:border-gray-800'
        } p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 dark:placeholder-gray-400`}
        placeholder={placeHolder}
        required
        onChange={(e): void => handleOnchange(e.target.value)}
        maxLength={256}
        ref={inputRef}
        pattern="[^\s]+"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center pr-3"
        onClick={handleOnClickClear}
      >
        <HiX />
      </button>
    </div>
  );
};
