
//改变bottomdisplay
export function tabbar(status){
    return {
        type:'CHANGE',
        payload:status
    }
}
//登录状态
export function login(status){
    return {
        type:'CHANGELOGIN',
        payload:status
    }
}

