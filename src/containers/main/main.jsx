/*
* 主体界面的容器组件*/
/*
应用主界面路由组件
 */
import React, {Component} from 'react'
import {connect} from "react-redux"
import {Switch,Route,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import  {NavBar} from 'antd-mobile'

import DashenInfo from '../dashen-info/dashen-info'
import LaobanInfo from '../laoban-info/laoban-info'
import Laoban from '/laoban/laoban'
import Dashen from '/dashen/dashen'
import Message from '/message/message'
import Personal from '/personal/personal'
import NotFound from '/../components/not-found/not-found'
import {getUser} from '/../redux/actions'
import NavFooter from '/../components/nav-footer/nav-footer'


import {getRedirectPath} from "../../utils"

export default  class Main extends Component {
    navList=[
        {
            path:'/laoban',
            component:Laoban,
            title:'大神列表',
            icon:'dashen',
            text:'大神'
        },
        {
            path:'/dashen',
            component:Dashen,
            title:'老板列表',
            icon:'laoban',
            text:'老板'
        },
        {
            path:'/message',
            component:Message,
            title:'消息列表',
            icon:'message',
            text:'消息'
        },
        {
            path:'/personal',
            component:Personal,
            title:'用户中心',
            icon:'personal',
            text:'个人'
        },

    ]
    componentDidMount(){
        const userid=Cookies.get('userid')
        const {user} =this.props
        if(userid && !user._id){
            //只是一寝登陆过，但是现在还未登陆
        }
            this.props.getUser()  //发请求获取用户信息，实现的自动登陆
        }
    }
    render()
{
    //读取cookie中的userid
    //若么有，自动重定向到登陆界面
    //若有，
    //检测用户以前是否登陆过

    const userid = Cookies.get("userid")
    if (!userid) {
        //如果没有登陆过，直接掉转到登录界面

        return <Redirect to='/login'/>
    }
    //检查当前是否已登陆
    const {user} = this.props
    if (!user._id) { //当前么有登陆过
        return null//暂不做任何显示
    }

    //当前已经登陆
    const path = this.props.location.pathname   //当前请求的path
    //如果请求的是根路径，自动跳转道对应的路界面
    if (path === '/') {
        return <Redirect to={getRedirecPath(user.type, user.header)}/>
    }

    const navList = this.navList
    //确定哪个nav 需要隐藏（添加隐藏的标识属性）
    if (user.type === 'laoban') {
        navList[1].hide = true
    } else {
        navList[0].hide = true
    }
    const currentNav = navList.find(nav => nav.path === path)
    return (
        <div>
            {currentNav ? <Navbar>{currentNav.title}</Navbar> : null}
            <Switch>
                <Route path='/dasheninfo' component={DashenInfo}/>
                <Route path='/laobaninfo' component={LaobanInfo}/>
                <Route path='/dashen' component={Dashen}/>
                <Route path='/message' component={Message}/>
                <Route path='/personal' component={Personal}/>
                <Route conmponent={NotFound}/>
            </Switch>
            {currentNav ? <NavFooter navList={navList}/> : null}
        </div>
    )


}

export default connect(
    state =>({user:state.user}),{getUser}
)(Main)

//实现自动登录
/*
* 1.如果cookie中有usrid，发请求获取对应的user，暂时不错任何处理
* 2.如果cookie中么有usrid，自动进入login页面
*
* 如果已经登录请求根路径：
* 根据user和type 和header来计算一个重定向的路径，并自动重定向

*
* */