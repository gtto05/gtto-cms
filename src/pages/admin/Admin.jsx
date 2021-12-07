import React, { Component } from 'react'
import {connect} from 'react-redux'
class Admin extends Component {
  render() {
    return (
      <div>
        Admin
      </div>
    )
  }
  componentDidMount() {
    console.log(this.props.userInfo);
  }
}

export default connect(
  // 映射属性
  state => ({userInfo:state.userInfo}),
  // 映射方法
  {}
)(Admin)
