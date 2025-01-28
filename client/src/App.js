import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Frondpage from './component/Frondpage';
import './App.css';
import Loginpage from './component/Login';
import About from './component/about';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={Frondpage}></Route>
      <Route path='/Login' Component={Loginpage}></Route>
      <Route path='/About'Component={About}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
