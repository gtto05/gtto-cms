import React, { Component } from 'react'
// 引入antd组件
import { Button, Card, Input, Modal, Table, Form, message } from 'antd'
// 引入ant图标
import { PlusOutlined } from '@ant-design/icons';
// 引入请求接口----商品分类
import { reqCategoryList, reqAddCategory, reqUpdateCategory } from '../../../../../utils/api'
// 引入常量-----分页器
import { PAGE_SIZE } from '../../../../../utils/constant';



export default class Category extends Component {

  formRef = React.createRef()

  state = {
    categoryList: [], // 分类列表
    visible: false, // 弹窗是否展示
    operType: '', // 操作类型
    modalCurrentName: '', // 弹窗显示的名
    modalCurrentId: '', // 弹窗显示的ID
    isLoading: true // 是否展示loading
  }

  // 获取分类列表
  getCategoryList = async () => {
    let res = await reqCategoryList()
    this.setState({ isLoading: false })
    const { status, data, msg } = res
    if (status === 0) {
      this.setState({
        categoryList: data
      })
    }

  }

  // 控制弹出框的展示
  showModal = (operType, values) => {
    if (values) {
      let { _id, name } = values
      this.setState({
        modalCurrentName: name,
        modalCurrentId: _id

      })
    }
    this.setState({
      visible: !this.state.visible,
      operType,
    })
  }

  toAdd = async (values) => {
    let res = await reqAddCategory(values)
    const { status, data, msg } = res
    if (status === 0) {
      message.success('商品分类添加成功')
      this.setState((state) => {
        return {
          categoryList: [data, ...state.categoryList]
        }
      })
      // 清空表单域
      this.formRef.current.resetFields()
    }
    if (status === 1) {
      message.error(msg)
      // 不隐藏弹窗
      this.setState({ visible: true })
      
    }
  }

  toUpdate = async (values) => {
    let result = await reqUpdateCategory(values)
    const { status, msg } = result
    if (status === 0) {
      message.success('更新商品成功！')
      // 清空表单域
      this.formRef.current.resetFields()
      // 关闭弹窗
      this.setState({
        visible:false
      })
      // 更新页面
      this.getCategoryList()
    }
  }

  // 弹窗确定回调
  handleOk = async () => {
    const { operType } = this.state


    // 重置表单域
    try {
      let values = await this.formRef.current.validateFields(['categoryName'])
      if (operType === 'update') {
        const { categoryName } = values
        const categoryId = this.state.modalCurrentId
        // console.log(categoryName,this.state.modalCurrentId);
        this.toUpdate({ categoryName, categoryId })
        console.log('你是要修改');
      }
      if (operType === 'add') {
        this.toAdd(values)
        console.log('你是要新增');
      }
    } catch (error) {
      message.error('表单输入有误，请检查')
      return;
    }



    this.setState({ operType: '' })
  }

  // 弹窗取消回调
  handleCancel = () => {
    this.setState((state) => {
      return {
        visible: !state.visible
      }
    })

    // 重置表单数据: 之前想过用withForm包裹去form属性上去取resetFields，结果有个警告bug：
    // Instance created by `useForm` is not connect to any Form element
    // 尝试在Modal组件中添加上 getContainer={false} ，警告依旧
    // 于是查文档，resetFields 该方法在真实节点
    this.formRef.current.resetFields()

  }

  componentDidMount() {
    this.getCategoryList()
  }

  render() {
    const dataSource = this.state.categoryList


    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        // dataIndex: 'name',
        render: (values) => <Button type='link' onClick={() => { this.showModal('update', values) }}>修改分类</Button>,
        key: 'age',
        width: '25%',
        align: 'center'
      }
    ];
    return (
      <>
        <Card extra={<Button type='primary' icon={<PlusOutlined />} onClick={() => { this.showModal('add') }}> 添加</Button>} className='content'>

          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            rowKey='_id'
            pagination={{ pageSize: PAGE_SIZE, showQuickJumper: {} }}
            loading={this.state.isLoading}
          />
        </Card>
        <Modal
          title={this.operType === 'update' ? '修改分类' : '添加分类'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          getContainer={false}>
          <Form
            size="large"
            ref={this.formRef}
          >
            <Form.Item
              name="categoryName"
              initialValue={this.state.modalCurrentName}
              rules={[
                { required: true, message: '分类名必须输入' }
              ]}
            >
              <Input placeholder={this.state.modalCurrentName} />
            </Form.Item>

          </Form>
        </Modal>
      </>
    )
  }
}


// export default Category
