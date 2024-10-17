import './App.css';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from "./pages/WelcomePage/WelcomePage.js"
import RegisterPage from './pages/RegisterPage/RegisterPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import LandingPage from './pages/LandingPage/LandingPage.js';
import About from './pages/AboutPage/About.js';


function App() {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage/>}></Route>
      <Route path='/register' element={<RegisterPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/dashboard' element={<LandingPage/>}></Route>
      <Route path='/about' element={<About/>}></Route>
    </Routes>
  );
}

export default App;
