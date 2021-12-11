
import { Menu } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'


import menuConfig from '../../../../utils/menu-config';
import { withRouter } from '../../../../utils/withRouter';
import {createSaveTitleAction} from '../../../../redux/actions/menuAction'
import './left_nav.less';
import logo from '../../../../assets/img/logo.jpg'

const { SubMenu, Item } = Menu;


@connect(
  state=>({}),
  {
    saveTitle:createSaveTitleAction
  }
)
@withRouter
class LeftNav extends Component {
  

  // 格式化菜单
  menuFormat = (target) => {
    return target.map((item) => {
      if (!item.children) {
        return (
          <Item key={item.key} icon={item.icon} onClick={() => {
            this.save(item.title)
          }}>
            <Link to={item.path}>{item.title}</Link>
          </Item>
        )
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.menuFormat(item.children)}
          </SubMenu>
        )
      }
    })
  }

  // 当前选中keys
  getSelectedKey = () => {
    const selectedKey = this.props.location.pathname.split('/').reverse()[0]
    return selectedKey
  }
  getOpenKeys = () => {
    const openKeys = this.props.location.pathname.split('/').splice(2)
    return openKeys
  }

  // 保存title
  save = (title) => {
    this.props.saveTitle(title)
  }

  render() {
    // console.log(this.menuFormat(menuConfig));
    return (
      <div className='left_nav'>
        <header className='nav-header'>
          <img src={logo} alt="" />
          <h1>商品管理系统</h1>
        </header>
        <Menu
          defaultSelectedKeys={this.getSelectedKey()}
          defaultOpenKeys={this.getOpenKeys()}
          mode="inline"
          className='menu'
          
        >
          {
            this.menuFormat(menuConfig)
          }
        </Menu>
      </div>
    )
  }
}

export default LeftNav
