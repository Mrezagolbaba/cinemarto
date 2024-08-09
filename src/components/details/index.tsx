import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieDetailsQuery } from 'src/services/movies';
import styles from './styles.module.scss';
import GoBack from 'src/assets/arrowRight.svg';
import Rating from 'src/components/Rating';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, error, isLoading } = useGetMovieDetailsQuery(id as string);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  const handleGoBack = () => {
    window.history.back();
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={GoBack} alt="Go Back" onClick={handleGoBack} />
      </div>
      <div className={styles.content}>
        <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        <div className={styles.details}>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <Rating totalStars={movie.vote_average} />
        </div>
      </div>

    </div>
  );
};

export default MovieDetails;
