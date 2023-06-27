import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <Link to="/"><div className={styles.logo}>Strea<span className={styles.accent}>mems</span></div></Link>
  )
}

export default Logo