import React, { useState } from 'react';
import Search from 'src/components/search';
import Tags from 'src/components/tags';
import MoviesList from 'src/components/moviesList';
import { useGetMoviesListQuery, useSearchMoviesQuery } from 'src/services/movies';
import { useDebounce } from 'src/hooks/useDebunce';
import EmptyState from 'src/components/EmptyState';

import styles from './styles.module.scss'


const Home: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 300);

  const { data, error, isLoading } = useGetMoviesListQuery(page);
  const { data: searchResults, error: searchError, isLoading: isSearchLoading } = useSearchMoviesQuery(debouncedSearch, {
    skip: !debouncedSearch, // Skip query if debouncedSearch is empty
  });
  
  return (
    <div className={styles.container}>
      <Search search={search} setSearch={setSearch} />
      {/* <Tags /> */}
      <MoviesList
        setPage={setPage}
        currentPage={page}
        totalPages={debouncedSearch ? searchResults?.total_pages : data?.total_pages} 
        movies={debouncedSearch ? searchResults?.results : data?.results} 
        error={debouncedSearch ? searchError : error}
        isLoading={debouncedSearch ? isSearchLoading : isLoading} 
      />
      {debouncedSearch && searchResults?.results.length === 0 && <EmptyState />}
    </div>
  );
};

export default Home;

