import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./router/mainRouter";
import Header from "./router/header/header";
import Login from "./router/login";
import React, { useState } from "react";

const UserContext = React.createContext(null);

function App() {
  const [username, setUsername] = useState(null);

  const setLoggedInUsername = (value) => {
    setUsername(value);
  };

  return (
    <>
      {username ? (
        <UserContext.Provider value={username}>
          <BrowserRouter>
            <Header />
            <MainRouter />
          </BrowserRouter>
        </UserContext.Provider>
      ) : (
        <Login setLoggedInUsername={setLoggedInUsername} />
      )}
    </>
  );
}

export { App, UserContext };
