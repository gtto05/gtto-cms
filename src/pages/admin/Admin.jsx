import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Navigate} from 'react-router-dom'

@connect(
  // 映射属性
  state => ({userInfo:state.userInfo}),
  // 映射方法
  {}
)
class Admin extends Component {
  render() {
    const {isLogin} = this.props.userInfo
    if(!isLogin) {
      return <Navigate to='../login'/>
    } else {
      return (
        <div>
          Admin
        </div>
      )
    }
  }
  componentDidMount() {
    console.log(this.props);
  }
}



export default Admin
