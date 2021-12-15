import { Routes,Route,Navigate } from 'react-router-dom'
import Login from './component/login/Login'
import Admin from './component/admin/Admin'
import './App.less'
export default function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='login' element={ <Login/> }></Route>
        <Route path='admin' element={ <Admin/> } ></Route>
        <Route path='' element={ <Navigate to='login' /> }></Route>
      </Routes>
    </div>
  )
}