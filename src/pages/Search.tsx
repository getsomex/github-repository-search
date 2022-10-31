/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { ReactComponent as GithubIcon } from '../assets/icons/github.svg';
import { List, Pagiation, SearchField } from '../components';
import { useDebounce, useFetch } from '../hooks';
import usePagination from '../hooks/usePagintaion';
import { Repository } from '../types/GithubRepository.types';

const Search = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const throttledValue = useDebounce(searchTerm, 500);
  const { currentPage, maxPage } = usePagination(100, 20);
  // eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
  // const { data, loading, fetchData } = useFetch<Repository>(
  //   `https://api.github.com/search/repositories?q=page=1`
  // );
  useEffect(() => {
    const fetchRepo = async (): Promise<void> => {
      if (!throttledValue) {
        return undefined;
      }
      // await fetchData(`q=${throttledValue}`);
      // console.log(data);
      // const url = `https://api.github.com/search/repositories?q=${throttledValue}&order=asc&per_page=100&page=1`;
      // const res = await fetch(url);
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // const data = await res.json();
      // console.log(data);
    };
    void fetchRepo();
  }, [throttledValue]);

  /**
   * search term hanlder
   * @param {string} searchTerm
   * @returns void
   */
  const handleOnChangeSearchTerm = (searchTerm: string): void => {
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
  return (
    <div className="h-screen flex-col justify-center bg-gray-50 py-6 sm:py-12">
      <h1 className="mb-4 flex justify-center	 text-center text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl">
        Search <GithubIcon />
        <span className="text-blue-600 dark:text-blue-500">repositories</span>
      </h1>
      <div className="flex h-[85vh] flex-col justify-center gap-4 overflow-hidden rounded p-10">
        <SearchField
          placeHolder="Search Repoistory"
          onChange={handleOnChangeSearchTerm}
          onClear={handleOnClearSearchTerm}
        />
        <h2 className="text-xl">Search Results</h2>
        <div className="h-full overflow-auto">
          {/* {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <List data={data?.items || []} />
          )} */}
        </div>
        <Pagiation currentPage={currentPage} numOfPages={maxPage} />
      </div>
    </div>
  );
};
export default Search;
