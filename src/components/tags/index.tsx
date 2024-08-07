import styles from './styles.module.scss';

const Tags = () => {
    const tags = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming'];

    const handleClick = (tag: string) => {
        console.log(tag);
        // Add logic to set the query based on the clicked tag
    };

    return (
        <div className={styles.tagsContainer}>
            <ul className={styles.tagsList}>
                {tags.map((tag, index) => (
                    <li key={index} className={styles.tagItem} onClick={() => handleClick(tag)}>
                        {tag}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tags;
