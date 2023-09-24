import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/auth/Auth";
import ChatBox from "./components/Chat/ChatBox";
import { useState } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import { addMessageUrl, authLogOutUrl } from "./utils/myUrls";

function App() {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("token") !== null
  );
  if (isLogged)
    axios.defaults.headers.common["AuthenticationToken"] =
      localStorage.getItem("token");
  function onLogInClicked(userLoginData) {
    console.log(userLoginData);
    localStorage.setItem("token", userLoginData.token);
    axios.defaults.headers.common["AuthenticationToken"] = userLoginData.token;
    setIsLogged(true);
  }

  async function onLogOutClicked() {
    try {
      const result = await axios.get(authLogOutUrl);
      console.log(result.data);
      localStorage.clear();
      setIsLogged(false);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {!isLogged && <Auth onLogInClicked={onLogInClicked} />}
            {isLogged && <Header onLogOutClicked={onLogOutClicked} />}
            {isLogged && <ChatBox />}
          </>
        }
      />
    </Routes>
  );
}

export default App;
