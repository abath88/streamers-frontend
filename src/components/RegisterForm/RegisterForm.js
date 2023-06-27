import { useState } from "react"
import { registerUser } from '../../redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import styles from './RegisterForm.module.scss';

const RegisterForm = ({setSignIn}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, password }));
    setSignIn(true)
  }
  return (
    <form className={styles.form} onSubmit={handleSignIn}>
      <input className={styles.username} placeholder="Username" value={username} type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
      <input className={styles.password} placeholder="Password" value={password} type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      <input className={styles.submit} type="submit" value="SignUp" />
      <p className={styles.login} onClick={() => setSignIn(true)}>Login</p>
    </form>
  )
}

export default RegisterForm