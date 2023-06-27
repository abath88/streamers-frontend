import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import styles from './LoginButton.module.scss';
import { useSelector } from "react-redux";
import RegisterForm from '../RegisterForm/RegisterForm';

const LoginButton = () => {
  const username = useSelector(state => state.auth.username);
  const [signIn, setSignIn] = useState(true)
  if(!username)
    return (
      <div className={styles.loginContainer}>
        SignIn/SignUp
        <div className={styles.loginForm}>
          {signIn && <LoginForm setSignIn={setSignIn}/>}
          {!signIn && <RegisterForm setSignIn={setSignIn}/>}
        </div>
      </div>
    )
  return <div>{username}</div>
}

export default LoginButton;