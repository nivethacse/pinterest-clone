import auth from "../services/firebase";
import { db } from "../services/firebase";
import { useHistory } from "react-router-dom";

const Image = ({ item, setsignIn }) => {
  const history = useHistory();
  let newUrl = item.user.portfolio_url;
  let linkPage = item.user.portfolio_url;
  if (newUrl !== null) {
    if (newUrl.match(/https?:\/\//)) {
      newUrl = newUrl.replace(/https?:\/\//, "");
    }
  } else {
    newUrl = item.user.instagram_username;
    linkPage = `https://www.instagram.com/${item.user.instagram_username}`;
  }
  const itemId = item.id;
  const newTo = {
    pathname: `/image/${itemId}`,
    state: item,
    newUrl: newUrl,
    linkPage: linkPage,
  };
  const savePhoto = async () => {
    if (auth.currentUser === null) {
      setsignIn(true);
      return null;
    }
    let con = auth.currentUser.uid;
    const currentArray = db.collection("users").doc(con);
    const doc = await currentArray.get();

    if (!doc.exists) {
      const savedPhotoArray = [];
      savedPhotoArray.push({ 0: item.urls.small, 1: item.urls.regular });

      return db.collection("users").doc(con).set({
        name: "name",
        photoArray: savedPhotoArray,
      });
    } else {
      let newArray = doc.data().photoArray;
      newArray.push({ 0: item.urls.small, 1: item.urls.regular });
      return db.collection("users").doc(con).update({
        name: "name",
        photoArray: newArray,
      });
    }
  };
  const viewPhoto = () => {
    return history.push(newTo);
  };
  return (
    <div className="card">
      <div
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="shell"
      >
        <div className="popup-background"></div>
        <div className="saveButton">
          <button className="view" onClick={viewPhoto}>
            View
          </button>
          <button onClick={savePhoto}>Save</button>
        </div>

        <img src={item.urls.small} alt=""></img>

        <div className="buttonBox">
          {newUrl ? (
            <div className="linkBackground">
              <i class="fa fa-arrow-up" aria-hidden="true"></i>{" "}
              <button
                onClick={() => {
                  window.open(linkPage);
                }}
              >
                {newUrl}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default Image;
