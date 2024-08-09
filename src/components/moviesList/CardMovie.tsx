import { Link } from "react-router-dom";
import Rating from "src/components/Rating";
import styles from './styles.module.scss';
import { getYear } from "src/helper";
import IM from 'src/assets/bg.jpg';

interface CardMovieProps {
    movie: {
        id: number;
        title: string;
        poster_path: string;
        vote_average: number;
        release_date: string;
    };
}

export const CardMovie = ({ movie }: CardMovieProps) => {
    const img = movie.poster_path ? `http://image.tmdb.org/t/p/w500/` + movie.poster_path : IM;
    return (
        <div className={styles.movieCard} key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
                <img
                    src={img}
                    className={styles.cardImgTop}
                    alt={movie.title}
                />
            </Link>
            <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>{movie.title}</h5>
                <div className={styles.cardFooter}>
                    <Rating totalStars={movie.vote_average==0?1:movie.vote_average} />
                    <span className={styles.movieInfo}>
                        <i className="fas fa-star">
                            </i> {getYear(movie.release_date)}
                            </span>
                </div>
            </div>
        </div>
    );
}
