
// 引入mockjs
const Mock = require('mockjs')

const permissionData = ['admin1', 'admin2', 'admin3', 'admin4']

Mock.mock('/admin/permission', 'post', permissionData)