import auth from "../services/firebase";
import { db } from "../services/firebase";
import { useEffect, useState } from "react";
import Savedimage from "./savedimage";

const UserPage = () => {
  const [newArray, setnewArray] = useState([]);

  const getArray = async (change, item) => {
    if (change) {
      let con = auth.currentUser.uid;
      for (var i = 0; i < newArray.length; i++) {
        if (newArray[i][0] === item) {
          newArray.splice(i, 1);
        }
      }
      const myArray = newArray;
      db.collection("users").doc(con).update({
        name: "name",
        photoArray: myArray,
      });

      return setnewArray(myArray);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        let con = auth.currentUser.uid;
        const currentArray = db.collection("users").doc(con);
        const doc = await currentArray.get();

        return setnewArray(doc.data().photoArray);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="gallery">
      <div className="imageContainer">
        {newArray.map((item, index) => (
          <Savedimage key={index} item={item} getArray={getArray} />
        ))}
      </div>
    </div>
  );
};
export default UserPage;
