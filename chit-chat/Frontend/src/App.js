import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/auth/Auth";
import { useEffect, useState } from "react";
import axios from "axios";
import ChatBox from "./components/Chat/ChatBox";
import Header from "./components/Header/Header";
import { authLogOutUrl } from "./utils/myUrls";
import { useDispatch } from "react-redux";
import { userActions } from "./components/store/redux/UsersReducer";
import useSocket from "./components/hooks/useSocket";

function App() {
  const socket = useSocket();
  useEffect(() => {
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("token") !== null
  );

  if (isLogged)
    axios.defaults.headers.common["AuthenticationToken"] =
      localStorage.getItem("token");

  function onLogInClicked(userLoginData) {
    console.log(userLoginData);
    localStorage.setItem("token", userLoginData.token);
    setIsLogged(true);
    dispatch(userActions.setUser(userLoginData.user));
  }

  async function onLogOutClicked() {
    try {
      const result = await axios.get(authLogOutUrl);
      console.log(result.data);
      // localStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("receiver");
      localStorage.removeItem("group");
      localStorage.removeItem("isGroupInFocus");
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
