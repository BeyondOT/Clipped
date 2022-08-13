import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/user/login`,
      withCredentials: true,
      "Content-Type": "application/json",
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
        setEmailError(err.response.data.errors.email);
        setPasswordError(err.response.data.errors.password);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-in-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => {
          setEmailError("");
          setEmail(e.target.value);
        }}
      />
      <div className="email error">{emailError}</div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => {
          setPasswordError("");
          setPassword(e.target.value);
        }}
      />
      <div className="password error">{passwordError}</div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
