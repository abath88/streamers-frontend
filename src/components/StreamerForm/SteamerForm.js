import { useState } from 'react';
import styles from './SteamerForm.module.scss';
import { addStreamer } from '../../redux/slice/streamerSlice';
import { useDispatch, useSelector } from 'react-redux';

const StreamerForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('Twitch');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStreamer({name, description, platform}))
    setName('');
    setDescription('');
    setPlatform('Twitch');
  }

  const error = useSelector((state) => state.streamers.addError)
  
  return (
    
    <form className={styles.form} onSubmit={handleSubmit}>
      <input placeholder='Name' className={styles.name} type='text' name="name" value={name} onChange={(e) => setName(e.target.value)}/>
      <select className={styles.platform} name="platform" value={platform} onChange={(e) => setPlatform(e.target.value)}>
        <option defaultValue value="Twitch">Twitch</option>
        <option value="YouTube">YouTube</option>
        <option value="TikTok">TikTok</option>
        <option value="Kick">Kick</option>
        <option value="Rumble">Rumble</option>
      </select>
      <textarea placeholder='Description' className={styles.description} name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <input className={styles.submit} type="submit" value="Submit"/>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  )
}

export default StreamerForm