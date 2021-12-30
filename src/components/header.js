import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "./input";
import auth from "../services/firebase";

const Header = ({
  setimageArray,
  searchTerm,
  setsearchTerm,
  signIn,
  setsignIn,
}) => {
  const [currentUser, setcurrentUser] = useState(false);
  const [boxDisplay, setboxDisplay] = useState("none");
  const [firstLetter, setfirstLetter] = useState("Sign In");

  const createNewAccount = (email, password, random = false) => {
    setsignIn(false);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setfirstLetter(email.substring(0, 1));
      })
      .catch((error) => {
        if (random === true) {
          let randomChars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let result = "";
          for (var i = 0; i < 10; i++) {
            result += randomChars.charAt(
              Math.floor(Math.random() * randomChars.length)
            );
          }
          email = `${result}@website.com`;
          password = "password12345";
        }
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            setfirstLetter(email.substring(0, 1));
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/email-already-in-use":
                alert(`Email address already in use.`);
                break;
              case "auth/invalid-email":
                alert(`Email address  is invalid.`);
                break;
              case "auth/operation-not-allowed":
                alert(`Error during sign up.`);
                break;
              case "auth/weak-password":
                alert(
                  "Password is not strong enough. Add additional characters including special characters and numbers."
                );
                break;
              default:
                alert(error.message);
                break;
            }
          });
        const unSub = auth.onAuthStateChanged((user) => {
          setcurrentUser(user);
        });
        return unSub;
      });
    const unSub = auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
    });
    return unSub;
  };

  const signInExistingAccount = (email, password) => {
    setsignIn(false);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {})
      .catch((error) => {
        alert(error.message);
      });
    const unSub = auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
    });
    return unSub;
  };

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setfirstLetter(user.email.substring(0, 1));

        setcurrentUser(user);
      } else {
        console.log("No current User");
      }
    });
  });

  const searchPhotos = async () => {
    const res = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=yARgx04JGwM7P8THJFN-9KUkZgAG3yDeRiOKRDgTg7g&query=${searchTerm}&per_page=50`
    );
    const json = await res.json();
    setimageArray(json.results);
  };

  const displaySignIn = () => {
    console.log(firstLetter);
    if (signIn) {
      return setsignIn(false);
    }
    setsignIn(true);
  };

  const signOut = () => {
    auth.signOut().then(
      function () {
        console.log("Signed Out");
        setcurrentUser(false);
        return setfirstLetter("");
      },
      function (error) {
        console.error("Sign Out Error", error);
      }
    );
  };

  const handleChange = (e) => {
    e.preventDefault();
    setsearchTerm(e.target.value);
  };

  const boxDisplayChange = () => {
    if (boxDisplay === "none") {
      return setboxDisplay("flex");
    }
    return setboxDisplay("none");
  };

  return (
    <div className="header">
      <i className="fab fa-pinterest-square"></i>
      <Link to="/">
        <button className="homeButton">Home</button>
      </Link>
      <div className="input-wrapper">
        <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
          <i onClick={searchPhotos} className="fas fa-search"></i>
        </Link>
        <input type="text" onChange={handleChange} placeholder="Search" />
      </div>

      <div onClick={displaySignIn} className="circle">
        <span className="letter">{firstLetter}</span>
      </div>

      <i onClick={boxDisplayChange} className="fas fa-sort-down"></i>

      <div style={{ display: boxDisplay }} className="selectionBox">
        <Link to={currentUser ? "/user-page" : "#"} style={{ color: "grey" }}>
          <button>Collection</button>
        </Link>
        <button onClick={signOut}>Sign Out</button>
      </div>
      {signIn ? (
        <Input
          createNewAccount={createNewAccount}
          signInExistingAccount={signInExistingAccount}
          setsignIn={setsignIn}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default Header;
