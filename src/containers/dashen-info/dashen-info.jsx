/*
* 大神信息完善组件
* */

import React, {Component} from "react"
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'

  class DashenInfo extends Component {
        state = {
            header: '',
            post: '',
            info: '',
        }
    handleChange =(name,value) =>{
            this.setState({
                [name]:value
            })
    }
    setHeader =(header)=>{
            this.setState({header})
    }
save =()=>{
            this.props.updateUser(this.state)
}
render (){
            const{user} =this.props

    if(user.header){
                return <Redirect to ='/dashen'/>
    }

        return(
            <div>
                <NavBar>大神信息完善</NavBar>
               < HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='求职岗位' onChange={value=>this.handleChange('post',value)}>求职岗位 </InputItem>
                <TextareaItem title='个人介绍:' rows={3} placeholder='个人介绍'
                onChange={value => this.handleChange("info",value)}/>
                <Button type='primary' onClick={()=>this.props.updateUser(this.state) }>保存</Button>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
        {updateUser})(DashenInfo)


