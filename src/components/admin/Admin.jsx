import { Layout } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate,Outlet } from 'react-router-dom';
import { createDeleteLoginAction } from '../../redux/actions/loginAction';
import { reqCategoryList } from '../../utils/api';
import './Admin.less';
import Header from './header/Header';
import LeftNav from './sider/left_nav/LeftNav';




const { Footer, Sider, Content } = Layout;

@connect(
  // 映射属性
  state => ({ userInfo: state.userInfo }),
  // 映射方法
  {
    deleteInfo: createDeleteLoginAction
  }
)
class Admin extends Component {

  

  demo = async () => {
    let res = await reqCategoryList()
    console.log(res);
  }

  render() {
    const { isLogin } = this.props.userInfo
    if (!isLogin) {
      return <Navigate to='../login' />
    } else {
      return (
        <Layout className='admin'>
          <Sider className='sider'>
            <LeftNav />
          </Sider>
          <Layout>
            <Header />
            <Content className='content'>
              <Outlet />
            </Content>
            <Footer className='footer'>
              推荐使用Chrome内核浏览器，获取最佳体验
            </Footer>
          </Layout>
        </Layout>
      )
    }
  }
  componentDidMount() {
  }
}



export default Admin
