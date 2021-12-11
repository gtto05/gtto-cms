## 完整后台管理系统

1. 请求同意处理，配置axios拦截器
2. react-router-dom v6 (withRouter已被移除, 重定向 1. (登录跳转时)useNavigate 2. (token失效时)Navigate)
3. redux ( store <--核心store--> Reducers )
4. react-redux (connect(mapStateToProps,mapActionsToProps))

### 01. 登录组件

1. 路由、静态页面
2. 校验规则
3. 路由跳转(token)

### 02. 清除表单数据
> React Class Component ref Antd Form resetFields

1. 给Antd Form 整个ref
2. Antd From.Item 中加上name
3. 在想要reset filed的地方利用resetFields重置

