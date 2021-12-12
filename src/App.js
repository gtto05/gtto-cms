import { Navigate, Route, Routes } from 'react-router-dom'
import './App.less'
import Admin from './components/admin/Admin'
import Bar from './components/admin/sider/charts/bar/Bar'
import Line from './components/admin/sider/charts/line/Line'
import Pie from './components/admin/sider/charts/pie/Pie'
import Home from './components/admin/sider/home/Home'
import Category from './components/admin/sider/prod_about/category/Category'
import Product from './components/admin/sider/prod_about/product/Product'
import Role from './components/admin/sider/role/Role'
import User from './components/admin/sider/user/User'
import Login from './components/login/Login'



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='admin' element={<Admin />}>
          <Route path='home' element={<Home />} />
          <Route path='prod_about'>
            <Route path='category' element={<Category />} />
            <Route path='product' element={<Product />} />
          </Route>
          <Route path='user' element={<User />} />
          <Route path='role' element={<Role />} />
          <Route path='charts'>
            <Route path='bar' element={<Bar />} />
            <Route path='line' element={<Line />} />
            <Route path='pie' element={<Pie />} />
          </Route>
          <Route path='' element={<Navigate to='home' />} />
        </Route>
        <Route path='*' element={<Navigate to='admin/home'/>}/>
      </Routes>
    </div>
  );
}

export default App;
