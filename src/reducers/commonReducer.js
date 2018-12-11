let initState = {
    // 是否显示底部tab菜单
    bottomdisplay:' ',
    login:0
}
let commonReducer = (state=initState,action)=>{
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                bottomdisplay:action.payload
            }
            
        case 'CHANGELOGIN':
            return {
                ...state,
                login:action.payload
            }

        default:
            return state;
    }
}

export default commonReducer;