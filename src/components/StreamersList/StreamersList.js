import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSteamers } from "../../redux/slice/streamerSlice";
import { Link } from "react-router-dom";
import Block from "../Block/Block";
import StreamerItem from "../StreamerItem/StreamerItem";
import StreamerItemLoading from "../StreamerItemLoading/StreamerItemLoading";
import Vote from "../Vote/Vote";

import styles from './Steamers.module.scss'

const StreamerList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSteamers())
  }, [dispatch])
  
  const streamers = useSelector((state) => state.streamers.streamers)
  const isLoading = useSelector((state) => state.streamers.fetchLoading)
  const error = useSelector((state) => state.streamers.fetchError)

  if (isLoading) {
    return <Block><StreamerItemLoading /></Block>
  }

  if (error) {
    return error
  }

  return (
    <>
      {streamers.map((streamer, key) => (
        <Block key={key} >
          <div className={styles.streamer}>
            <Link to={`${streamer._id}`}><StreamerItem name={streamer.name} /></Link>
            <Vote streamer={streamer}/>
          </div>
        </Block>
      ))}
    </>
  )
}

export default StreamerList;