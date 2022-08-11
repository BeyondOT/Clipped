import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [pseudoError, setPseudoError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [controlPassword, setControlPassword] = useState("");
  const [controlPasswordError, setControlPasswordError] = useState("");

  const [termsError, setTermsError] = useState("");
  const [errors, setErrors] = useState(false);
  const [formSubmited, setFormSubmited] = useState(false);

  const checkForm = () => {
    setErrors(false);

    const terms = document.getElementById("terms");

    if (pseudo === "") {
      setPseudoError("Veuillez saisir votre pseudo.");
    }
    if (email === "") {
      setEmailError("Veuillez saisir votre e-mail.");
    }
    if (password === "") {
      setPasswordError("Veuillez remplir ce champ.");
    }
    if (controlPassword === "") {
      setControlPasswordError("Veuillez remplir ce champ");
    }
    if (password !== controlPassword) {
      setPasswordError("Les mots de passe ne sont pas identiques.");
    }
    if (!terms.checked) {
      setTermsError("Veuillez cocher cette case.");
    }
    if (
      pseudo === "" ||
      email === "" ||
      password === "" ||
      controlPassword === "" ||
      password !== controlPassword ||
      !terms.checked
    ) {
      setErrors(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    checkForm();
    if (errors === true) {
      return;
    }

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/user/register`,
      data: {
        pseudo,
        email,
        password,
      },
    })
      .then((res) => {
        setFormSubmited(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setPseudoError(err.response.data.errors.pseudo);
        setEmailError(err.response.data.errors.email);
        setPasswordError(err.response.data.errors.password);
      });
  };

  return (
    <>
      {formSubmited ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            value={pseudo}
            onChange={(e) => {
              setPseudo(e.target.value);
              setPseudoError("");
            }}
          />
          <div className="pseudo error">{pseudoError}</div>
          <br />
          <label htmlFor="email">E-mail</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
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
              setPassword(e.target.value);
              setPasswordError("");
            }}
          />
          <div className="password error">{passwordError}</div>
          <br />
          <label htmlFor="controlPassword">Confirmer le mot de passe</label>
          <br />
          <input
            type="password"
            name="controlPassword"
            id="controlPassword"
            onChange={(e) => {
              setControlPassword(e.target.value);
              setControlPasswordError("");
            }}
          />
          <div className="controlPassword error">{controlPasswordError}</div>
          <br />
          <input
            type="checkbox"
            name="terms"
            id="terms"
            onChange={(e) => {
              setTermsError("");
            }}
          />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              {" "}
              conditions générales
            </a>
          </label>
          <div className="terms error">{termsError}</div>
          <br />
          <input type="submit" value="Valider l'inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
