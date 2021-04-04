import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import AuthCtx from "./services/authContext";
import axios from "axios";
import { SignIn } from "./components/signIn";
import { Home } from "./components/home";
import { SignUp } from "./components/signUp";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      history.push("/sign-in");
      return;
    }
    axios
      .post("http://localhost:5000/auth/my-profile", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAuthUser(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }, [history]);

  return (
    <AuthCtx.Provider value={{ authUser, setAuthUser }}>
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/" component={Home} />
      </Switch>
    </AuthCtx.Provider>
  );
}

export default App;
