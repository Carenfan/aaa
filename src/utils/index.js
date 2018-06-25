/*
* 包含n个工具函数的模块*/
/*
* 动态计算跳转的path
* /laoban
* /laobaninfo
* /dashen-info
*  /dasheninfo
*  */

export function getRedirectPath(type,header) {
    let path=''
    path =type==='laoban'? '/laoban':'dashen-info'

    if (!header){
        path  +="info"
    }
    return path
}


