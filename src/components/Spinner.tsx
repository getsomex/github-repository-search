import { ImSpinner8 } from 'react-icons/im';

export const Spinner = (): JSX.Element => {
  return (
    <>
      <ImSpinner8 className="h-20	w-20 animate-spin dark:text-gray-600" />
      <span className="sr-only">Loading...</span>
    </>
  );
};
