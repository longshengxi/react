import React,{Component} from 'react';
//import '../less/user.less';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
//import axios from 'axios';

class mine extends Component{
	 constructor(){
	  	super();
	  	this.state = {
	  		
	  	}
	 }
	 componentDidMount(){
//		console.log(this.props.login)
		let login=this.props.login
		if(login==0){
//			console.log('没有登录')
			this.props.history.push("/user");
		}else if(login==1){
//			console.log("登录了")
			this.props.history.push("/My");
		}
		
	}
	
	
    render(){   
        return <div className="mine">
     			这是我的
       </div>
    }
}

let mapStateToProps = state=>{
    // 此处必须返回一个对象
//  console.log(state);
//  console.log(state.commonReducer.bottomdisplay)
    return {
        //把state.commonReducer.tabbarStatus映射到props
        bottomdisplay:state.commonReducer.bottomdisplay,
        login:state.commonReducer.login,
    }
}

mine = connect(mapStateToProps)(mine);


mine=withRouter(mine)

export {mine};