import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const inputPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  const { token, login } = authCtx;

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const password = inputPasswordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA7cKfrG98jqjqZMsnahJ0oeLNAd27-djg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: password,
          returnSecureToken: true
        }),
        headers: {
          'content-Type': 'application/json'
        }
      }
    ).then(res => {
      return res.json()
    })
      .then((data) => {
        login(data.idToken);
        console.log(data.idToken)
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength="7" ref={inputPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
