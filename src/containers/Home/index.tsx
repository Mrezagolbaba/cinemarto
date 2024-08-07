import React, { useState } from 'react';
import Search from '../../components/search';
import Tags from '../../components/tags';
import MoviesList from '../../components/moviesList';
import { useGetMoviesListQuery, useSearchMoviesQuery } from '../../services/movies';
import './styles.module.scss'
import { useDebounce } from '../../hooks/useDebunce';

const Home: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 300);

  const { data, error, isLoading } = useGetMoviesListQuery(page);
  const { data: searchResults, error: searchError, isLoading: isSearchLoading } = useSearchMoviesQuery(debouncedSearch, {
    skip: !debouncedSearch, // Skip query if debouncedSearch is empty
  });

  return (
    <div className='container'>
      <Search search={search} setSearch={setSearch} />
      <Tags />
      <MoviesList
        setPage={setPage}
        currentPage={page}
        totalPages={debouncedSearch ? searchResults?.total_pages : data?.total_pages} 
        movies={debouncedSearch ? searchResults?.results : data?.results} 
        error={debouncedSearch ? searchError : error}
        isLoading={debouncedSearch ? isSearchLoading : isLoading} 
      />
    </div>
  );
};

export default Home;

