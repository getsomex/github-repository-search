/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { GoMarkGithub } from 'react-icons/go';
import {
  ErrorModal,
  List,
  Pagiation,
  SearchField,
  Spinner,
} from '../components';
import { GITHUB_API } from '../constant/constant';
import { useDebounce, useFetch } from '../hooks';
import { usePagination } from '../hooks/usePagintaion';
import type {
  Repository,
  RepositoryError,
} from '../types/GithubRepository.types';
/**
 * Github repository search page
 */
const defaultSearchValue = 'react';

const Search = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const throttledValue = useDebounce(searchTerm, GITHUB_API.API_THROTTLE);

  const { data, isLoading, fetchData, error } = useFetch<
    Repository,
    RepositoryError
  >(GITHUB_API.BASE_URL);
  // total data
  const totalCount =
    GITHUB_API.TOTAL_COUNT > data.total_count
      ? data.total_count
      : GITHUB_API.TOTAL_COUNT;

  const numberOfPages = Math.ceil(totalCount / GITHUB_API.LIMIT);
  const { current, range, jumpToPage, setNextPage, setPreviousPage } =
    usePagination(GITHUB_API.INITAL_PAGE, numberOfPages);

  useEffect(() => {
    const fetchRepo = async (): Promise<void> => {
      await fetchData({
        // q: throttledValue ? `${throttledValue}` : `${defaultSearchValue}`,
        page: current,
        per_page: GITHUB_API.LIMIT,
      }).catch((err) => {
        console.log(err);
      });
    };
    void fetchRepo();
  }, [throttledValue, current]);
  /**
   * search term hanlder
   * @param {string} searchTerm
   * @returns void
   */
  const handleOnChangeSearchTerm = (searchTerm: string): void => {
    console.log(searchTerm);
    if (!searchTerm.trim()) {
      return undefined;
    }
    setSearchTerm(searchTerm);
  };
  /**
   * search term clear handler
   * @returns void
   */
  const handleOnClearSearchTerm = (): void => {
    setSearchTerm('');
  };

  console.log(error);
  return (
    <div className="h-screen flex-col justify-center bg-gray-50 py-6 sm:py-12">
      <h1 className="mb-4 flex justify-center	 text-center text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl">
        Search <GoMarkGithub />
        <span className="text-blue-600 dark:text-blue-500">repositories</span>
      </h1>
      <div className="flex h-[85vh] flex-col justify-center gap-4 overflow-hidden rounded px-10 py-5">
        <SearchField
          placeHolder="Search Repoistory"
          onChange={handleOnChangeSearchTerm}
          onClear={handleOnClearSearchTerm}
        />
        <h2 className="text-xl">Search Results</h2>
        <div className="align-center flex h-full items-center justify-center overflow-auto">
          {isLoading ? <Spinner /> : <List data={data?.items || []} />}
        </div>
        <div className="flex justify-center">
          <Pagiation
            currentPage={current}
            range={range}
            onPageClick={jumpToPage}
            onClickNext={setNextPage}
            onClickPrev={setPreviousPage}
          />
        </div>
      </div>
      {error && (
        <ErrorModal message={error.message} isShow={error ? true : false} />
      )}
    </div>
  );
};
export default Search;
