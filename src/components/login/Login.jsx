import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Navigate } from 'react-router-dom';
import { createSaveLoginAction } from '../../redux/actions/loginAction';

import { reqLogin } from '../../utils/api'
import { withRouter } from '../../utils/withRouter';

import './css/login.less';
import logo from '../../assets/img/logo.jpg';


@connect(
  state=>({isLogin:state.userInfo.isLogin}),
  {
    saveUserInfo:createSaveLoginAction
  }
)
@withRouter
class Login extends Component {

  onFinish = async (values) => {
    // console.log('Received values of form: ', values);
    // 发送请求
    // reqLogin(values)
    // .then(result=>{
    //   console.log(result);
    // })
    // .catch(reason=>{
    //   console.log(reason);
    // })

    let result = await reqLogin(values)
    const { status,msg,data } = result

    if (status === 0) {
      // 保存到redux
      this.props.saveUserInfo(data)

      // 跳转admin
      // console.log(data);
      // this.props.history.replace('/admin')
      // console.log(this.props);
      this.props.navigate('../admin/home')
    } else {
      message.warning(msg)
    }
  }


  // 获取校验规则
  getRules = (type) => {
    type = type === 'username' ? '用户名' : '密码'
    return [
      {
        min: 4,
        message: `${type}最小为4位`
      },
      {
        max: 12,
        message: `${type}最大为12位`
      },
      {
        pattern: /^\w+$/,
        message: `${type}不合法!`
      },
      {
        required: true,
        message: `请输入${type}!`,
      },
    ]
  }

  render() {
    const {isLogin} = this.props
    if(isLogin) {
      return <Navigate to='../admin'/>
    }
    return (
      <div className='login'>
        <header className='header'>
          <img src={logo} alt="" />
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          {/* antd表单 */}
          <Form
            name="normal_login"
            className="login-form"
            size="large"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={this.getRules('username')}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={this.getRules('password')}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }

  componentDidMount() {
    // console.log(this);
  }
}

export default Login
