

import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import DataProvider from './context/DataProvider';
import { useState } from 'react';

//Components
import Login from "./components/account/Login";
import Home from "./components/Home";
import Header from './components/header/Header';
import CreatePost from "./components/create/CreatePost";
import DetailView from './components/details/details';
import UpdatePost from './components/create/UpdatePost';

const PrivateRoute = ({isAuthenticated}) => {
  console.log(isAuthenticated)
  return isAuthenticated ?
  <>
    <Header />
    <Outlet />
  </> 
  : 
  <Navigate replace to = '/login' />;
}


function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false)


  return (
    <div className="App">
      <DataProvider>
        
        <BrowserRouter>
          
          <div style={{ marginTop : 64 }}>
            <Routes>
              <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
              <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path='/' element={<Home />} />              
              </Route>
              <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path='/create' element={<CreatePost />} />              
              </Route>
              <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path='/details/:id' element={<DetailView  />} />              
              </Route>
              <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path='/update/:id' element={<UpdatePost  />} />              
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;

