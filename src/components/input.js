import { useState } from "react";

const Input = ({ createNewAccount, signInExistingAccount, setsignIn }) => {
  const [currentEmail, setcurrentEmail] = useState();
  const [currentPassword, setcurrentPassword] = useState();
  const [passwordRepeat, setpasswordRepeat] = useState();

  const emailChange = (e) => {
    e.preventDefault();
    setcurrentEmail(e.target.value);
  };
  const passwordChange = (e) => {
    e.preventDefault();
    setcurrentPassword(e.target.value);
  };
  const repeatChange = (e) => {
    e.preventDefault();
    setpasswordRepeat(e.target.value);
  };
  const sendCred = () => {
    if (currentPassword !== passwordRepeat) {
      alert("Please make sure the passwords match.");
      return null;
    }
    return createNewAccount(currentEmail, currentPassword);
  };
  const signIn = (random = false) => {
    if (random === true) {
      return createNewAccount("random", "password12345", true);
    }
    return signInExistingAccount(currentEmail, currentPassword);
  };
  return (
    <div className="input">
      <div className="signInScreen">
        <button
          className="inputClose"
          onClick={() => {
            setsignIn(false);
          }}
        >
          X
        </button>
        <h5>Create New Account</h5>
        <input type="text" onChange={emailChange} placeholder="Email"></input>
        <input
          type="text"
          onChange={passwordChange}
          placeholder="Password"
        ></input>
        <input
          type="text"
          onChange={repeatChange}
          placeholder="Confirm Password"
        ></input>
        <button className="continue" onClick={sendCred}>
          Create New Account
        </button>

        <h5>Sign In</h5>
        <input type="text" onChange={emailChange} placeholder="Email"></input>
        <input
          type="text"
          onChange={passwordChange}
          placeholder="Password"
        ></input>
        <button className="continue" onClick={signIn}>
          Sign In
        </button>

        <h5>Use Demo Account</h5>
        <button
          className="continue"
          onClick={() => {
            signIn(true);
          }}
        >
          Use Demo Account
        </button>
      </div>
    </div>
  );
};
export default Input;
