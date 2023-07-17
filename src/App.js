import './App.css';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import LoginButton from './components/LoginButton/LoginButton';
import Logo from './components/Logo/Logo';

import { Routes, Route } from "react-router-dom";
import NoMatchPage from './components/NoMatchPage/NoMatchPage';
import HomePage from './components/HomePage/HomePage';

import StreamerPage from './components/StreamerPage/StreamerPage';
import PageAddStream from './components/PageAddStream/PageAddStream';
function App() {
  return (
    <>
      <Header>
        <Container style={{justifyContent: 'space-between'}}>
          <Logo />
          <LoginButton />
        </Container>
      </Header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addstream" element={<PageAddStream />} />
          <Route path="/:id" element={<StreamerPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
