import styles from './StreamerPage.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchStreamer } from '../../redux/slice/streamerSlice';
import profile from '../../profile.png'
import Vote from '../Vote/Vote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';

const StreamerPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStreamer({id}))
  }, [dispatch, id])

  const streamer = useSelector((state) => {return state.streamers.streamer})
  const isLoading = useSelector((state) => state.streamers.fetchLoading)
  const error = useSelector((state) => state.streamers.fetchError)

  const renderPlatformIcon = (platform) => {
    switch(platform) {
      case 'Twitch': return <FontAwesomeIcon icon={faTwitch} />
      case 'YouTube': return <FontAwesomeIcon icon={faYoutube} />
      case 'TikTok': return <FontAwesomeIcon icon={faTiktok} />
      case 'Kick': return 'Kick'
      case 'Rumble': return 'Rumble'
      default: return <FontAwesomeIcon icon={faTwitch} />
    }
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  if (error) {
    return error
  }

  return (
   
    <div className={styles.block}>
      {streamer &&
      <>
        <div className={styles.body}>
          <img className={styles.profile} src={profile} alt="profile"/>
          <div className={styles.nameDescription}>
            <h1 className={styles.name}>{streamer.name}</h1>
            <p>{streamer.description}</p>
          </div>
        </div>
        <div className={styles.footer}>
          <h2>{renderPlatformIcon(streamer.platform)}</h2>
          <Vote streamer={streamer}/>
        </div>
      </>
      }
    </div> 
  )
}

export default StreamerPage;