import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card } from "@mui/material";
import HomePage from "./pages/HomePage";


firebase.initializeApp({
  apiKey: "AIzaSyCV-bMBng0nyBqgo7V_dnKh832PQoSf9Gs",
  authDomain: "online-store-992a2.firebaseapp.com",
  projectId: "online-store-992a2",
  storageBucket: "online-store-992a2.appspot.com",
  messagingSenderId: "424236533894",
  appId: "1:424236533894:web:300368820c52ca183ce907",
});

const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {

  const theme = createTheme({
    typography: {
      fontFamily: 'Helvetica'
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
    navigate("/");
  };

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            exact 
            path={'/'}
            element={
              <HomePage
                user={user ? user : null}
                objectsRef={firestore.collection('objects')}
              />
            }
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
