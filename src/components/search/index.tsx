import React, { useEffect } from 'react';
import s from './styles.module.scss';
import { useDebounce } from '../../hooks/useDebunce';

interface SearchProps {
  search: string;
  setSearch: (search: string) => void;
  onDebouncedSearch: (debouncedValue: string) => void;
}

const Search: React.FC<SearchProps> = ({ search, setSearch, onDebouncedSearch }) => {
  const debouncedSearch = useDebounce(search, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    onDebouncedSearch(debouncedSearch);
  }, [debouncedSearch, onDebouncedSearch]);

  return (
    <div className={s['container']}>
      <input value={search} type="text" placeholder="Search" onChange={handleSearch} />
    </div>
  );
};

export default Search;
