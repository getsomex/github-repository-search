import { HiChevronRight, HiStar } from 'react-icons/hi';
import { Items } from '../types/GithubRepository.types';

type Props = {
  data: Items[];
};

export const List = ({ data }: Props): JSX.Element => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  if (data.length < 1) {
    return <span className="text-4xl">No Data</span>;
  }

  return (
    <div className="h-full  w-full overflow-y-auto bg-white shadow">
      <ul className="flex w-full flex-col divide-y">
        {data.map((el) => (
          <a
            key={el.id}
            href={el.html_url}
            className="relative block"
            target="_blank"
          >
            <li className="flex flex-row">
              <div className="flex flex-1 cursor-pointer select-none items-center p-4 hover:bg-gray-50">
                <div className="mr-4 flex h-10 w-10 flex-col items-center justify-center">
                  <img
                    alt="profil"
                    src={el.owner.avatar_url}
                    className="mx-auto h-10 w-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 pl-1">
                  <div className="font-medium dark:text-white"> {el.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-200">
                    {el.full_name}
                  </div>
                </div>
                <div className="flex flex-row justify-center">
                  <div className="text-xs text-gray-600 dark:text-gray-200">
                    <span className="flex items-center gap-1 text-sm dark:text-gray-200">
                      {formatter.format(el.watchers)}{' '}
                      <i>
                        <HiStar />
                      </i>
                    </span>
                  </div>
                  <button className="flex w-10 justify-end text-right">
                    <HiChevronRight className="hover:text-gray-800" />
                  </button>
                </div>
              </div>
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};
