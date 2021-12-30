import './App.scss';
import {useState, useEffect} from "react"
import Header from "./components/header";
import Footer from "./components/footer";
import Gallery from "./components/gallery";
import ImagePage from "./components/imagepage";
import UserPage from "./components/userpage";
import {BrowserRouter,Route} from 'react-router-dom'

function App() {
  const [imageArray, setimageArray] = useState([])
  const [searchTerm, setsearchTerm] = useState("puppy")
  const [signIn, setsignIn] = useState(false)

  useEffect(() => {
    const createDefaultArray = async () => {
      const res = await fetch(`https://api.unsplash.com/search/photos/?client_id=yARgx04JGwM7P8THJFN-9KUkZgAG3yDeRiOKRDgTg7g&query=${searchTerm}&per_page=30`)
      const json = await res.json()
      setimageArray(json.results)  
      }
      return createDefaultArray()
  }, [searchTerm]);
  
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div className="App">
    <Header setimageArray={setimageArray} 
      searchTerm={searchTerm} 
      setsearchTerm={setsearchTerm} 
      signIn={signIn} 
      setsignIn={setsignIn}/>
    <Route exact path="/">
      <Gallery imageArray={imageArray} setsignIn={setsignIn}/>
    </Route>
    <Route exact path={`/image/:subId`} >
      <ImagePage searchTerm={searchTerm}/>
    </Route>
    <Route exact path="/user-page" >
      <UserPage/>
    </Route>
    <Footer/>
    </div>
    </BrowserRouter>
  );
}
export default App;