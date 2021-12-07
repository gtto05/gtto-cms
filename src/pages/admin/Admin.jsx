import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Navigate} from 'react-router-dom'
import {createDeleteLoginAction} from '../../redux/actions/loginAction'

@connect(
  // 映射属性
  state => ({userInfo:state.userInfo}),
  // 映射方法
  {
    deleteInfo:createDeleteLoginAction
  }
)
class Admin extends Component {

  logout = () => {
    this.props.deleteInfo()
  }

  render() {
    const {isLogin} = this.props.userInfo
    if(!isLogin) {
      return <Navigate to='../login'/>
    } else {
      return (
        <div>
          Admin
          <button onClick={this.logout}>退出</button>
        </div>
      )
    }
  }
  componentDidMount() {
  }
}



export default Admin
