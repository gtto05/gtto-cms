import React, { Component } from 'react'
import { Button, Card, Input, message, Select, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { reqProductList,reqUpdateProdStatus } from '../../../../../utils/api';
import { PAGE_SIZE } from '../../../../../utils/constant';

const {Option} = Select
export default class Product extends Component {

  state = {
    productList:[], // 商品列表
    total:'', //总条数
    current:1, // 当前页
    keyWord:'', // 关键字
    searchType:'name' //搜索类型
  }

  getProductList = async(number=1) => {
    let result = await reqProductList(number,PAGE_SIZE)
    const { status,data } = result
    if(status === 0) {
      // console.log(data);
      this.setState(() => {
        return {
          productList:[...data.list],
          total:data.total,
          current:data.pageNum
        }
      })
    } else {
      message.error('获取商品列表失败')
    }
  }

  // TODO:更新商品状态
  updateProdStatus = async({_id,status}) => {
    let productList = [...this.state.productList]
    if(status === 1) status = 2
    else status = 1
    const result = await reqUpdateProdStatus(_id,status)
    if(result.status === 0) {
      message.success('更新商品状态成功')
      productList.map((item) => {
        if(item._id === _id) {
          item.status = status
        } 
        return item
      })
      this.setState({productList})
    } else {
      message.error('更新商品失败')
    }
  }

  // TODO:搜索商品
  search = () => {
    const {keyWord,searchType} = this.state
    console.log(keyWord,searchType);
  }

  // demo = (e) => {
  //   this.setState({keyWord:e.target.value})
  // }

  componentDidMount() {
    this.getProductList()
  }
  render() {
    const dataSource = this.state.productList

    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width:'18%'
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width:'9%',
        render: (price) => { return '￥' + price }
      },
      {
        title: '状态',
        // dataIndex: 'status',
        key: 'status',
        align: 'center',
        width:'9%',
        render: (item) => {
          return (
            <div>
              <Button 
              type={item.status === 1 ? 'danger':'primary'}
              onClick={()=>{this.updateProdStatus(item)}}
              >
                {item.status === 1 ? '下架':'上架'}
              </Button>
              <br /> 
              {item.status === 1 ? '在售':'停售'}
            </div>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'opera',
        key: 'opera',
        width:'9%',
        render: (opera) => { 
          return (
            <div>
              <Button type='link primary'>详情</Button>
              <br />
              <Button type='link primary'>修改</Button>
            </div>
          )
        }
      },
    ];
    return (
      <div>
        <Card
          title={
            <>
              <Select
                style={{ width: '200px' }}
                defaultValue='name'
                onChange={(value)=>{this.setState({searchType:value})}}
              >
                <Option value='name'>按名称搜索</Option>
                <Option value='desc'>按描述搜索</Option>
              </Select>
              <Input
                style={{ width: '20%', margin: '0px 10px' }}
                placeholder='请输入关键字'
                allowClear
                onChange={(e)=>{this.setState({keyWord:e.target.value})}}
              />
              <Button
                type='primary'
                icon={<SearchOutlined />}
                onClick={this.search}
              >搜索</Button>
            </>
          }
          extra={<Button type='primary'>添加商品</Button>}
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            rowKey='_id'
            pagination={{
              current:this.state.current,
              pageSize:PAGE_SIZE,
              total:this.state.total,
              onChange:this.getProductList
            }}
          />
        </Card>
      </div>
    )
  }
}
