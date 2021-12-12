import { Button } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import { createDeleteLoginAction } from '../../../redux/actions/loginAction'
import { withRouter } from '../../../utils/withRouter'

import './Header.less'
import menuConfig from '../../../utils/menu-config'

@connect(
  state => ({ 
    userInfo: state.userInfo,
    title:state.title
   }),
  {
    deleteInfo: createDeleteLoginAction
  }
)
@withRouter

class Header extends Component {

  state = {
    date: dayjs().format('YYYY 年 MM月DD日 HH:mm:ss'),
    title:''
  }

  // 登出
  logout = () => {
    this.props.deleteInfo()
  }

  // 获取title
  getTitle = () => {
    // console.log('@@@@@@@');
    const { pathname } = this.props.location
    const pathKey = pathname.split('/').reverse()[0]
    let title = ''
    menuConfig.forEach((item) => {
      if(!item.children) {
        if(item.key === pathKey) title = item.title
      } else {
        let res = item.children.find((ic) => {
          return ic.key === pathKey 
        })
        if(res) title = res.title
      }
    })
    this.setState({
      title
    })
  }



  componentDidMount() {
    this.timerId = setInterval(()=> {
      this.setState({
        date:dayjs().format('YYYY 年 MM月DD日 HH:mm:ss')
      })
    },1000)

    this.getTitle()
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  render() {
    const { username } = this.props.userInfo.user
    // console.log(this.props);
    return (
      <header className='header'>
        <div className="header-top">
          欢迎，
          <Button type='text'>{username}</Button>
          <Button type='link parimary' onClick={this.logout}>退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="title">{this.props.title || this.state.title}</div>
          <div className="date">{this.state.date}</div>
        </div>
      </header>
    )
  }
}

export default Header
