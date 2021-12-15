import React from 'react'
import './Login.less'
import logo from '../../assets/logo.jpg'
export default function Login() {
  return (
    <div className='login'>
      <header className='header'>
        <img src={logo} alt="后台管理系统" className="logo" />
        <h1 className="title">商品管理系统</h1>
      </header>
      <main>
        <div className="user">
          <h1>用户登录</h1>
          {/* antd-form */}
        </div>
      </main>
    </div>
  )
}
