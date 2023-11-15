import './App.css';
import { useState, useEffect, } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedElement from '../ProtectedElement/ProtectedElement';

import { mainApi } from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LoggedInContext from '../../contexts/LoggedInContext';
import FailContext from '../../contexts/FailContext';
import IsSendContext from '../../contexts/IsSendContext';
import Preloader from '../Preloader/Preloader';

function App() {
  const navigate = useNavigate();

  const [inProgress, setInProgress] = useState(true);

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn ] = useState(false);

  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  const [isSend, setIsSend] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  function handleBurgerMenuClick () {
    setIsBurgerClicked(!isBurgerClicked)
  }

  // логика пользователя

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
      setIsOnEdit(false);
      setIsSuccess(true);
      console.log(isSuccess);
    })
    .catch((err) => {
      setIsFail(true);
      console.error(`Edit profile failed: ${err}`);
    })
    .finally(() => {
      setIsSend(false);
    })
}

  function handleExit() {
    mainApi.signOut()
      .then(() => {
        setLoggedIn(false);
        localStorage.clear();
        navigate('/')
      })
      .catch(err => {
        console.error(`Signout failed: ${err}`);
      });
  }

  // добавление и удаление фильмов

  function handleMovieLike(data) {
    mainApi
      .addMovie(data)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        setIsFail(true);
        console.log(`Failed to save movie: ${err}`);
      });
  }

  function handleMovieDislike(data) {
    const searchInSaved = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
    handleMovieDelete(searchInSaved[0])
}

  function handleMovieDelete(data) {
    console.log(savedMovies)
    mainApi
      .deleteMovie(data)
      .then(() => {
        const updList = savedMovies.filter(movie => { return movie._id !== data._id })
        setSavedMovies(updList);
        console.log(savedMovies)
      })
      .catch((err) => {
        setIsFail(true);
        console.log(`Failed to delete movie: ${err}`);
      });
  }

  // фоновая авторизация

  useEffect(() => {
    if (!isLoggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([userData, moviesData]) => {
          setLoggedIn(true);
          setCurrentUser(userData);
          setSavedMovies(moviesData)
          setInProgress(false);
        })
        .catch((error) => console.error(`Ошибка авторизации ${error}`))
        .finally(() => setInProgress(false))
      }
      }, [isLoggedIn, navigate]);

  // return markup

  return (
    <div className="app">
      <div className="app__container">
        {inProgress ? <Preloader /> :
        <LoggedInContext.Provider value={isLoggedIn}>
          <CurrentUserContext.Provider value={currentUser}>
            <IsSendContext.Provider value={isSend}>
              <FailContext.Provider value={[isFail, setIsFail]}>
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
                  <Route path="/signup" element={isLoggedIn ? <Navigate to='/movies' replace /> : <Register onSignUp={handleRegister} />}/>
                  <Route path="/signin" element={isLoggedIn ? <Navigate to='/movies' replace /> : <Login onSignIn={handleLogin} />}/>
                  <Route
                    path="/movies" 
                    element={
                      <ProtectedRoute
                        element={ProtectedElement}
                        elementType="movies"
                        isBurgerClicked={isBurgerClicked}
                        handleBurgerMenuClick={handleBurgerMenuClick}
                        savedMovies={savedMovies}
                        handleMovieLike={handleMovieLike}
                        handleMovieDislike={handleMovieDislike}
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
                        savedMovies={savedMovies}
                        handleMovieDelete={handleMovieDelete}
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
              </FailContext.Provider>
            </IsSendContext.Provider>
          </CurrentUserContext.Provider>
        </LoggedInContext.Provider>
        }
      
      </div>
    </div>
  );
}

export default App;
