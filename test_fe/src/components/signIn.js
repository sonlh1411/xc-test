import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthCtx from "../services/authContext";

export const SignIn = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const { setAuthUser } = useContext(AuthCtx);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
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
        history.push("/");
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  });

  const handleChanges = (event) => {
    console.log(event.target.name);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/sign-in",
        values
      );
      const { token } = res.data.data;
      setAuthUser(res.data.data);
      localStorage.setItem("jwt", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      history.push("/");
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  return (
    <div>
      <div>Sign In</div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={values.username ? values.username : ""}
            onChange={(val) => handleChanges(val)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password ? values.password : ""}
            onChange={(val) => handleChanges(val)}
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};
