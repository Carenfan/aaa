/*
* 老板信息完善组件
* */

import React, {Component} from "react"
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '/..componts/header-selector/header-selector'
import  {updateUser} from "../../redux/actions";

class LaobanInfo extends Component{
    state={
        header:'',
        post:'',
        company:'',
        salary:'',
        info:'',

    }

    handleChange = (name,value)=>{
        this.setState({
            [name]:value
        })
    }
    setHeader =(header)=>{
        this.setState({header})
    }
    save=()=>{
        this.props.updateUser(this.state)
    }

    render(){
        const {user}=this.props
        if(user.header){
            return<Readirect to='/laoban'/>
        }
        return(
            <div>
                <NavBar>完善老板信息</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder="招聘职位" onChange={value =>this.handlechange("post",value)}>招聘职位：</InputItem>
               <InputItem plaeceholder='公司名称' onChange={value=>this.handleChange('post',value)}>公司名称:</InputItem>
                <InputItem plaeceholder='职位薪资' onChange={value=>this.handleChange('post',value)}>职位薪资:</InputItem>

                < TextareaItem title='职位要求' rows={3} onChange={value=>this.handleChange('info',value)}/>

                <Button type='primary' onClick={()=>this.props.updateUser(this.save)}>保存</Button>

    </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),{updateUser}
)(LaobanInfo)


