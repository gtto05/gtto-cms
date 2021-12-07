import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { Component } from 'react';
import './css/login.less';
import logo from './images/logo.jpg';

export default class Login extends Component {

  onFinish = (values) => {
    console.log('Received values of form: ', values);
  }


  // 获取校验规则
  getRules = (type) => {
    type = type === 'username' ? '用户名' : '密码'
    return [
      {
        min:4,
        message:`${type}最小为4位`
      },
      {
        max:12,
        message:`${type}最大为12位`
      },
      {
        pattern:/^\w+$/,
        message:`${type}不合法!`
      },
      {
        required: true,
        message: `请输入${type}!`,
      },
    ]
  }

  render() {
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
}
