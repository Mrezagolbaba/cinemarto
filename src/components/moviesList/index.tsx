import React from 'react';
import Pagination from '../pagination';
import { Movie } from '../../types/movie';
import { CardMovie } from './CardMovie';
import styles from './styles.module.scss';


interface MoviesListProps {
  isLoading: boolean;
  error: any;
  movies: Movie[] | undefined;
  totalPages: number | undefined;
  currentPage: number;
  setPage: (page: number) => void;
}

const MoviesList: React.FC<MoviesListProps> = ({ isLoading, error, movies, totalPages, setPage, currentPage }) => {

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        {movies?.map((movie) => (
          <CardMovie key={movie.id} movie={movie} />
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination currentPage={currentPage} totalPages={totalPages || 1} onPageChange={setPage} />
      </div>
    </div>
      );
};

      export default MoviesList;
