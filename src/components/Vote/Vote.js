import styles from './Vote.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { voteSteamer } from '../../redux/slice/streamerSlice';

const Vote = ({ streamer }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.streamers.voteLoading);

  const handleUpvote = (e) => {
    dispatch(voteSteamer({id: streamer._id, vote: 1}))
  }

  const handleDownvote = (e) => {
    dispatch(voteSteamer({id: streamer._id, vote: 0}))
  }

  if (isLoading) {
    return 'loading...'
  }

  return (
    <div className={styles.vote}>
    {console.log(streamer)}
    { streamer.hasOwnProperty('vote') &&
      <>
        <button onClick={handleUpvote} className={styles.button}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <div className={styles.amount}>{streamer.vote.positive.length - streamer.vote.negative.length}</div>
        <button onClick={handleDownvote} className={styles.button}>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </>
    }
    </div>
  )
};

export default Vote;
