import StreamerForm from '../StreamerForm/SteamerForm';
import StreamerList from '../StreamersList/StreamersList';
import { useSelector } from "react-redux";

const HomePage = () => {
  const username = useSelector(state => state.auth.username);
  return (
    <>
      {username && <StreamerForm />}
      <StreamerList></StreamerList>
    </>
  )
}

export default HomePage;