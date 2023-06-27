import styles from './StreamerItem.module.scss';
import profile from '../../profile.png'

const StreamerItem = ({name}) => {
  return(
    <div className={styles.streamer}>
        <img className={styles.profile} src={profile} alt="profile"/>
        <h1 className={styles.name}>{name}</h1>
    </div>
  )
}

export default StreamerItem