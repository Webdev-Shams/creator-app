import './App.css';
import CreatorPage from './Pages/CreatorPage/CreatorPage'; 
import Home from './Pages/Home'; 
import { Route, Router, Routes } from 'react-router-dom';
import RequiredAuth from './Pages/RequiredAuth';
import CreatorForm from './Pages/CreatorPage/CreatorForm';
import Signin from './Pages/Signin/Signin';
import Banner from './Pages/Banner/Banner';
import Editprofile from './Pages/Editprofile/Editprofile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>        
        <Route path='/signin' element={<Signin></Signin>}></Route>        
          <Route path='/creatorform' element={<RequiredAuth><CreatorForm></CreatorForm></RequiredAuth>}></Route>        
          <Route path='/user/:userId' element={<RequiredAuth><CreatorPage></CreatorPage></RequiredAuth>}></Route>
          {/* <Route path='/edit' element={<Editprofile></Editprofile>}></Route> */}
          <Route path="/edit-profile/:userId" element={<Editprofile></Editprofile>} />
          <Route path="/banner" element={<Banner></Banner>} />
        
      </Routes>
    </div>
  );
}

export default App;
