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

function App() {
  const navigate = useNavigate();

  // demo dev functions

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  function handleBurgerMenuClick () {
    setIsBurgerClicked(!isBurgerClicked)
  }

  function handleRegister(data) {
    mainApi
    .setRegistration(data)
    .then((res) => {
      mainApi.setAuthorization(data)
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.error(`Login failed: ${err}`);
    })
    .catch((err) => {
      console.error(`Registration failed: ${err}`);
    });
    })
  }

  function handleLogin(data) {
    mainApi.setAuthorization(data)
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.error(`Login failed: ${err}`);
  })
}

function handleSubmit(data) {
  mainApi.setUserInfo(data)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.error(`Edit profile failed: ${err}`);
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
    <CurrentUserContext.Provider value={currentUser}>
    <div className="app">
      <div className="app__container">
        <Routes>
          <Route 
            path="/"
            element={
              <>
                <Header 
                  isLoggedIn={isLoggedIn}
                  isBurgerClicked={isBurgerClicked}
                  onClickBurger={handleBurgerMenuClick}
                />
                <Main />
                <Footer />
              </>
          }/>
          <Route path="/signup" element={<Register onSignUp={handleRegister}/>}/>
          <Route path="/signin" element={<Login onSignIn={handleLogin}/>}/>
          <Route
            path="/movies" 
            element={
              <ProtectedRoute
                element={ProtectedElement}
                elementType="movies"
                isLoggedIn={isLoggedIn}
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
                isLoggedIn={isLoggedIn}
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
                isLoggedIn={isLoggedIn}
                loggedIn={isLoggedIn}
                isBurgerClicked={isBurgerClicked}
                handleBurgerMenuClick={handleBurgerMenuClick}
                handleSubmit={handleSubmit}
                handleExit={handleExit}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
