import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../../services/movies';
import s from './styles.module.scss';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, error, isLoading } = useGetMovieDetailsQuery(id as string);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className={s['movie-details']}>
      <h1>{movie.title}</h1>
      <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
};

export default MovieDetails;
