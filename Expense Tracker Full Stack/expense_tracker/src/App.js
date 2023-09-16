import { useState } from "react";
import "./App.css";
import Auth from "./components/auth/Auth";
import Expense from "./components/expense/Expense";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import PasswordReset from "./components/auth/PasswordReset";

function App() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("token"));
  function onLogInClicked() {
    setIsLogged(true);
  }

  function onLogOutClicked() {
    localStorage.clear();
    setIsLogged(false);
  }

  return (
    <>
      {/* <PasswordReset /> */}
      <Routes>
        <Route
          path="/resetPassword/:forgotPasswordRequestID"
          element={<PasswordReset />}
        />
        <Route
          path="/"
          element={
            <>
              {isLogged && <Header onLogOutClicked={onLogOutClicked} />}
              {!isLogged && <Auth onLogInClicked={onLogInClicked} />}
              {isLogged && <Expense />}
            </>
          }
        />
        <Route path="*" element={<h1>Dont Worry i Will Fix it</h1>} />
      </Routes>
    </>
  );
}

export default App;

//leaderboard toggle, filter bug , forgot password
