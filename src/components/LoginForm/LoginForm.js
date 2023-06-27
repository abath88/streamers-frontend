import { useState } from "react"
import { userLogin } from '../../redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import styles from './LoginForm.module.scss';

const LoginForm = ({setSignIn}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(userLogin({ username, password }));
  }
  return (
    <form className={styles.form} onSubmit={handleSignIn}>
      <input className={styles.username} placeholder="Username" value={username} type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
      <input className={styles.password} placeholder="Password" value={password} type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      <input className={styles.submit} type="submit" value="SignIn" />
      <p className={styles.register} onClick={() => setSignIn(false)}>Register</p>
    </form>
  )
}

export default LoginForm