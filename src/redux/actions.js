/*包含n个action creator函数的模块
* 同步action（与type的个数一样）
* 异步action（与异步ajax请求个数一样）
* */
import {AUTH_SUCCESS,ERROR_MSG,RESET_USR,RECESIVE_USER} from "./action-types";
import {reqLogin,reqRegister,reqUpdateUser} from "../api/index";
//请求成功的同步action
const authSuccess =(user)=>({type:AUTH_SUCCESS,data:user})
//请求失败的 同步action
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg})
//接受用户的同步action
const receiveUser=(user) =>({type:RECESIVE_USER,data:user})

//重置用户的同步action
const resetUser=(msg)=>({type:RESET_USR,data:msg})

//请求失败的同步action
/*
export const register =({username,password,type})=>{
    return dispatch=>{
        reqRegister({username,password,type}).then(response=>{
            const result=reponse.data   //response.data{code:0/1 : data/msg :??}
            if(result.code===0){
                const user = result.data
                dispatch(authSuccess(user))

            }else{
                dispatch(errorMsg(result.msg))
            }

        })
    }
}
*/

//注册的异步acrion
export const rejister=({username,password,password2,type})=>{
    if (!username){
        return errorMsg('必须指定的用户名')
    }else if(!password){
        return errorMsg('必须指定的密码')

    }
    return async dispatch=>{
        if(password!==password2){
            dispatch(errorMsg('两个密码必须一致'))
            return
        }
        //执行异步ajax请求注册接口
        //已同步编码方式得到promise异步执行的结果
        const response=await reqRegister({username,password,type  })
        const result=response.data
        if(result.code===0){
            dispatch(authSuccess(user))
        }else{
            dispatch(errorMsg(result.msg))
        }

    }
}

//登陆异步action
export const Login =(username,password)=>{
    if(!username){
        return errorMsg("必须指定用户名")
    }else if(!password){
        return errorMsg("必须指定密码")
    }
    return async dispatch=>{
       const response=await reqLogin(username,password)
        const result =response.data
            if(result.code===0){
                dispatch(authSuccess(user))
            }else{
                dispatch(errorMsg(result.msg))
            }


    }
}
//更新用户的异步action

export const updateUser=(user)=>{
    return async dispatch => {
      const response =await reqUpdateUser(user)
        const result =response.data
        if(result.code===0){
          dispatch(receiveUser(result.data))
        }else{
          dispatch(resetUser(result.msg))
        }
    }
}


/*
* asnyc 和await d 作用
*  简化promise编码
*  使用同步编码实现异步流程
*  哪里使用await
*  在执行一个返回promise 对象的函数的左侧（不是想得到promise，是想得到异步执行的结果）
*  哪里使用async
*    使用了await所在的函数定义左侧
*
*  */
