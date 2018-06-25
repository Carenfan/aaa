/*
* 应用中给所有接口请求函数模块
* 根据接口编写
* 函数的返回值是promise
* */

import ajax from './ajax'

export const reqLogin=(username,password)=>ajax('./login',{username,password},'POST')

export const reqRegister=({username,password,type})=>ajax('/register',{username,password,type},'POST')
