import styles from './Block.module.scss';

const Block = ({ children }) => {
  return (
    <div className={styles.block}>{children}</div>
  )
}

export default Block;