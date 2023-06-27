import styles from './Container.module.scss';

const Container = ({ children, style }) => {
  return (
    <div style={style} className={styles.container}>{ children }</div>
  )
};

export default Container;