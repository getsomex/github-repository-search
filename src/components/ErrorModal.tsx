import { useEffect, useState } from 'react';
import { BiError, BiXCircle } from 'react-icons/bi';
type Props = {
  message: string;
  isShow: boolean;
};

/**
 * Error Modal
 * @returns JSX.Element
 */
export const ErrorModal = ({ message, isShow }: Props): JSX.Element => {
  const [isModalShow, setIsModalShow] = useState(false);
  useEffect(() => {
    setIsModalShow(isShow);
  }, [isShow]);

  if (!isModalShow) {
    return <></>;
  }

  return (
    <div className="relative z-10 ">
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="relative flex h-2/6 w-3/6 flex-col items-center gap-10 bg-white">
          <button
            onClick={(): void => setIsModalShow(false)}
            className="absolute top-0 right-0"
          >
            <BiXCircle className="h-7 w-7" />
          </button>

          <div className=" mt-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
            <BiError className="h-10 w-10 fill-red-500" />
          </div>
          <div className="mt-3 p-3 text-center  sm:text-left">
            <h3
              className="text-lg font-medium leading-6 text-gray-900"
              id="modal-title"
            >
              {message}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
