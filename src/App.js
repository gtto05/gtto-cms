import {Routes, Route,Navigate } from 'react-router-dom'

import Admin from './pages/admin/Admin';
import Login from './pages/login/Login';

import './App.less'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='login' element={<Login/>}></Route>
        <Route path='admin' element={<Admin/>}></Route>
        <Route path='' element={<Navigate to='login'/>}/>
      </Routes>
    </div>
  );
}

export default App;
