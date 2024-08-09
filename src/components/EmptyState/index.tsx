import IM from 'src/assets/bg.jpg'
import styles from './styles.module.scss';
const EmptyState: React.FC = () => {
    return (
        <div className={styles.container}>
            <h4>No result availble please try anothet search</h4>
            <img src={IM} alt="Empty State" />
        </div>
    );
};
export default EmptyState;