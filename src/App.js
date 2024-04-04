import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import CreateBlog from './Pages/CreateBlog';
import Read from './Pages/Read';

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/Dashboard" element = {<Dashboard/>} />
      <Route path = "/CreateBlog" element = {<CreateBlog/>}/>
      <Route path = "/Dashboard/view/:id" element = {<Read/>}/>
    </Routes>
  );
}

export default App;
