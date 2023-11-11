import './App.css';
import { useState, useEffect, useCallback } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedElement from '../ProtectedElement/ProtectedElement';

import { mainApi } from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LoggedInContext from '../../contexts/LoggedInContext';
import FailContext from '../../contexts/FailContext';
import IsSendContext from '../../contexts/IsSendContext';

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn ] = useState(false);

  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  const [isSend, setIsSend] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleBurgerMenuClick () {
    setIsBurgerClicked(!isBurgerClicked)
  }

  function handleLogin(data) {
    setIsSend(true);
    mainApi.setAuthorization(data)
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        setIsSend(false);
        navigate("/movies");
      })
      .catch((err) => {
        setIsFail(true);
        console.error(`Login failed: ${err}`)
      })
      .finally(() => {
        setIsSend(false);
      })
  }

  function handleRegister(data) {
    setIsSend(true);
    mainApi
    .setRegistration(data)
    .then((res) => {
      handleLogin(data);
    })
    .catch((err) => {
      setIsFail(true)
      console.error(`Registration failed: ${err}`);
    })
    .finally(() => {
      setIsSend(false);
    })
  }



function handleEditUser(data) {
  setIsSend(true);
  mainApi.setUserInfo(data)
    .then((res) => {
      setCurrentUser(res);
      setIsSend(false);
      setIsOnEdit(false);
      setIsSuccess(true);
    })
    .catch((err) => {
      setIsFail(true);
      setIsSend(false);
      console.error(`Edit profile failed: ${err}`);
    })
    .finally(() => {
      console.log(isFail)
    })
}


  function handleExit() {
    mainApi.signOut()
      .then(() => {
        // setLoggedIn(false);
        setCurrentUser({});
      })
      .finally(() => {
        navigate('/')
        setLoggedIn(false);})
      .catch(err => {
        console.error(`Signout failed: ${err}`);
      });
  }

  useEffect(() => {
    if (!isLoggedIn) {
    mainApi.getUserInfo()
    .then((userData) => {
      setLoggedIn(true);
      setCurrentUser(userData);
      navigate('/');
    })
    .catch((error) => console.error(`Ошибка авторизации ${error}`));
  }
  }, [isLoggedIn, navigate]);

  // return markup

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
    <CurrentUserContext.Provider value={currentUser}>
      <IsSendContext.Provider value={isSend}>
      <FailContext.Provider value={[isFail, setIsFail]}>
    <div className="app">
      <div className="app__container">
        <Routes>
          <Route 
            path="/"
            element={
              <>
                <Header 
                  isBurgerClicked={isBurgerClicked}
                  onClickBurger={handleBurgerMenuClick}
                />
                <Main />
                <Footer />
              </>
          }/>
          <Route path="/signup" element={<Register onSignUp={handleRegister} />}/>
          <Route path="/signin" element={<Login onSignIn={handleLogin} />}/>
          <Route
            path="/movies" 
            element={
              <ProtectedRoute
                element={ProtectedElement}
                elementType="movies"
                isBurgerClicked={isBurgerClicked}
                handleBurgerMenuClick={handleBurgerMenuClick}
              />
            }/>
          <Route
            path="/saved-movies" 
            element={
              <ProtectedRoute
                element={ProtectedElement}
                elementType="savedMovies"
                isBurgerClicked={isBurgerClicked}
                handleBurgerMenuClick={handleBurgerMenuClick}
              />
            }/>
          <Route
            path="/profile" 
            element={
              <ProtectedRoute
                element={ProtectedElement}
                elementType="profile"
                isBurgerClicked={isBurgerClicked}
                handleBurgerMenuClick={handleBurgerMenuClick}
                handleSubmit={handleEditUser}
                handleExit={handleExit}
                isOnEdit={isOnEdit}
                setIsOnEdit={setIsOnEdit}
                isSuccess={isSuccess}
                setIsSuccess={setIsSuccess}
              />
            }/>
          <Route
            path="/404" 
            element={<NotFound />}
          />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </div>
    </FailContext.Provider>
    </IsSendContext.Provider>
    </CurrentUserContext.Provider>
    </LoggedInContext.Provider>
  );
}

export default App;
