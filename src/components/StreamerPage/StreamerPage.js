import styles from './StreamerPage.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchStreamer } from '../../redux/slice/streamerSlice';
import profile from '../../profile.png'
import Vote from '../Vote/Vote';

const StreamerPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStreamer({id}))
  }, [dispatch, id])

  const streamer = useSelector((state) => {return state.streamers.streamer})
  const isLoading = useSelector((state) => state.streamers.fetchLoading)
  const error = useSelector((state) => state.streamers.fetchError)

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
        <h2>{streamer.platform}</h2>
        <Vote streamer={streamer}/>
          
        </div>
      </>
      }
    </div> 
  )
}

export default StreamerPage;