import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card } from "@mui/material";
import GuitarPage from "./guitar/pages/GuitarPage";
import NewProjectPage from "./pages/NewProjectPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import LogoutPage from "./pages/LogoutPage";
import Navbar from "./components/Navbar";
import MyProjectsPage from "./pages/MyProjectsPage";
import CurrentProjectPage from "./pages/CurrentProjectPage";
import TrackPage from "./pages/TrackPage";
import PracticePage from "./practice/pages/PracticePage";
import AllUsersPage from "./pages/AllUsersPage";
import GenerationsPage from "./practice/pages/GenerationsPage";
import GridGamePage from "./grid-game/GridGamePage";
import GridReduxPage from "./grid-redux/GridReduxPage";
import CommunityPage from "./community/CommunityPage";


firebase.initializeApp({
  apiKey: "AIzaSyDxQxK6gGK9AqEVRG7Jde47oiYryNqU83o",
  authDomain: "rs-graphical-wiki.firebaseapp.com",
  projectId: "rs-graphical-wiki",
  storageBucket: "rs-graphical-wiki.appspot.com",
  messagingSenderId: "301721311709",
  appId: "1:301721311709:web:fd769a657410b07a747e34"
});

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const theme = createTheme({
    typography: {
      fontFamily: 'Quicksand'
    },
    palette: {
      primary: {
        main: '#0000FF',
      },
      secondary: {
        main: "#FF00FF",
      },
      success: {
        main: "#00FF88",
      },
      error: {
        main: "#FF0000",
      },
      info: {
        main: "#FF8800",
      }
    },
  });

  const background = document.getElementsByTagName("html")[0];
  const [user] = useAuthState(auth);
  
  const navigate = useNavigate();

  const loginUser = () => {
    navigate("/login");
  };

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Navbar user={user ? user : null} />
        <Routes>
          <Route
            exact
            path={'/'}
            element={
              <HomePage user={user ? user : null}/>
            }
          />
          <Route
            exact 
            path={'/guitar-graph'}
            element={
              <GuitarPage
                user={user ? user : null}
              />
            }
          />
          <Route
            exact
            path={'/new-project'}
            element={
              <NewProjectPage
                user={user ? user : null}
                userRef={user ? firestore.collection('users').doc(user.uid) : null}
              />
            }
          />
          {
            user ?
              <>
                <Route
                  exact
                  path={'/my-projects'}
                  element={
                    <MyProjectsPage
                      user={user}
                      userRef={firestore.collection('users').doc(user.uid)}
                    />
                  }
                />
                <Route
                  path={'/my-projects/:id'}
                  element={
                    <CurrentProjectPage
                      userRef={firestore.collection('users').doc(user.uid)}
                    />
                  }
                />
                <Route
                  path={'/my-projects/:id/tracks/:trackId'}
                  element={
                    <TrackPage
                      userRef={firestore.collection('users').doc(user.uid)}
                    />
                  }
                />
                <Route
                  path={'/my-profile'}
                  element={
                    <ProfilePage
                      user={user}
                      userRef={firestore.collection('users').doc(user.uid)}
                      auth={auth}
                      takenNamesRef={firestore.collection('taken_usernames').doc('main_list')}
                      onLogin={() => loginUser()}
                    />
                  }
                />
                <Route
                  path={'/all-users'}
                  element={
                    <AllUsersPage
                      user={user}
                      usersRef={firestore.collection('users')}
                    />
                  }
                />
                <Route
                  path={'/logout'}
                  element={
                    <LogoutPage
                      auth={auth}
                    />
                  }
                />
                <Route
                  path={'/practice-page'}
                  element={
                    <PracticePage />
                  }
                />
                <Route
                  path={'/generations'}
                  element={
                    <GenerationsPage />
                  }
                />
                <Route
                  path={'/grid-game'}
                  element={
                    <GridGamePage />
                  }
                />
                <Route
                  path={'/grid-game-redux'}
                  element={
                    <GridReduxPage />
                  }
                />
                <Route
                  path={'/community'}
                  element={
                    <CommunityPage />
                  }
                />
              </>
            : 
              <>
                <Route
                  path={'/login'}
                  element={
                    <LoginPage
                      usersRef={firestore.collection('users')}
                      auth={auth}
                      onLogin={() => navigate('/my-profile')}
                    />
                  }
                />
              </>
          }
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
