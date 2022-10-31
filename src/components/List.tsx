import { Items } from '../types/GithubRepository.types';
type Props = {
  data: Items[];
};
export const List = ({ data }: Props): JSX.Element => {
  return (
    <div className="h-full  overflow-y-auto bg-white shadow">
      <ul className="divide-y divide-gray-100">
        {data.map((el) => (
          <li
            key={el.id}
            className="border-b border-gray-200 p-4 hover:bg-gray-100"
          >
            {el.full_name}
          </li>
        ))}
      </ul>
    </div>
  );
};
