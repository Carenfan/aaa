/*
用户注册的路由组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { NavBar,WingBlank,List,InputItem,WhiteSpace,Radio, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'
const ListItem=List.Item
class Register extends Component {
    state = {
        username:'',
        password:'',
        password2:'',
        type:'dashen'
    }
    //处理输入框/单选框变化，收集数据到state
    handleChange = (name,value)=>{
        this.setState({[name]:value})
    }
    //注册
    register=()=>{
        this.props.register(this.state)
    }

//跳转到login路由
    toLogin=()=>{
        this.props.history.replace('/login')
    }

    render() {
        const{type}=this.state
        return (
            <div>
                <NavBar>用户注册</NavBar>
                <logo/>
                <WingBlank>
                    <List>
                        {msg ? <p className='error-msg'>{msg}</p>:null}
                        <WhiteSpace/>
                        <InputItem> placeholder='请输入用户名'
                            onChange={val =>this.handleChange('username',val)}>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            placeholder='输入密码'
                            onChange={val => this.handleChange('password', val)}
                        >
                            密&nbsp;&nbsp;&nbsp;码:
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            placeholder='确认密码'
                            onChange={val => this.handleChange('password2', val)}
                        >
                            确认密码:
                        </InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span  >用户类型:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio onChange={()=>this.handleChange("type",'dashen')}
                                   checked={type==='dashen'}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio onChange={()=>this.handleChange("type",'laoban')}
                                   checked={type==='laoban'}>老板</Radio>&nbsp;&nbsp;
                        </ListItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已经有账号</Button>

                    </List>

                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    (register),
)(Register)