import s from './styles.module.scss';

interface SearchProps {
  search: string;
  setSearch: (search: string) => void;
}

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className={s['container']}>
      <input value={search} type="text" placeholder="Search" onChange={handleSearch} />
    </div>
  );
};

export default Search;
