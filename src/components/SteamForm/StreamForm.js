import styles from './StreamForm.module.scss';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { addStream } from '../../redux/slice/streamerSlice';

const StreamForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [game, setGame] = useState('');
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    /* send data to server */
    e.preventDefault();
    dispatch(addStream({title, description, game, startDate, endDate, id}));
    setTitle('');
    setDescription('');
    setGame('');
    setStartDate('');
    setEndDate('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input onChange={(e) => setTitle(e.target.value)} value={title} className={styles.input} type="text" name="title" />
      <input onChange={(e) => setDescription(e.target.value)} value={description} className={styles.input} type="text" name="description" />
      <input onChange={(e) => setGame(e.target.value)} value={game} className={styles.input} type="text" name="game" />
      <input onChange={(e) => setStartDate(e.target.value)} value={startDate} className={styles.input} type="date" name="startDate" />
      <input onChange={(e) => setEndDate(e.target.value)} value={endDate} className={styles.input} type="date" name="endDate" />
      <input onChange={(e) => setId(e.target.value)} value={id} className={styles.input} type="string" name="id" />

      <input type="submit" value="Add Stream"/>
    </form>
  );
};

export default StreamForm;