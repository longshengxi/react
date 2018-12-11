import React,{Component} from 'react';
import '../less/user.less';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../action';
import axios from 'axios';
class user extends Component{
	constructor(props){
       	super(props);
	  	this.state = {
	  		 NameinpValu:'',
	  		 PassinpValu:'',
	  		hint:'按要求填信息',
	  		style:'red',
	  		ts:''
	  	}
    }
	componentDidMount(){
//		console.log(this.props.login)
		this.refs.text.focus();
		this.setState({
            ts:''
        })
		let login=this.props.login
		if(login==0){
			this.props.history.push("/user");
		}else if(login==1){
			this.props.history.push("/My");
		}
		
	}
	goreg=()=>{
//		console.log(this)
       this.props.history.push("/reg");
    }
	handelChange(e){
  		if(e.target.className=="Name"){
			 this.setState({
            	NameinpValu:e.target.value,
       		})
  		}else if(e.target.className=="Pass"){
  			this.setState({
            	PassinpValu:e.target.value
        	})
  		}
  		}
	login=()=>{
		let Name=this.state.NameinpValu;
		let Pass=this.state.PassinpValu;
		axios.post('http://127.0.0.1:7000/api/use/login',{
		params:{
				NameinpValu:Name,
		  		PassinpValu:Pass,
			}
		}).then(res=>{
			if(res.data.msg=="登录成功"){
				this.props.changelogin(1) //进来就改变状态
				this.props.history.push(`/My/:${Name}`);
			}else{
				this.setState({
            		ts:'用户名或密码错误'
        		})
			}
			
		});
	}
	
	render(){
		return <div className="user">
			  <div className="utop"><span className="fa fa-angle-left left"></span>会员登录</div>
			  <div className="userb">
			  	<img src="./img/user.png" alt=""/><br/>
			  	<span>会员登录</span>
			  </div>
			  <div className="userName">
			  	用户名<input type="text" className="Name" ref='text'onChange={this.handelChange.bind(this)} defaultValue={this.state.NameinpValu}/>
			  </div>
			  <div className="userPass">
			  	密&nbsp;&nbsp;&nbsp;码<input type="password"  className="Pass" onChange={this.handelChange.bind(this)} defaultValue={this.state.PassinpValu}/>
			  </div>
			  <div className="regForget">
			  	<button className="reg" onClick={this.goreg}>请先注册</button>
			  	<button className="Forget">忘记密码</button>
			  </div>
			  <div className="ts">{this.state.ts}</div>
			  <div className="login">
			  	<button className="loginbutton" onClick={this.login}>登录</button>
			  </div>
			  
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

let mapDispatchToProps = dispatch=>{
//	console.log(dispatch)
    return {
        // 把change方法映射到props
        changelogin(status){
            dispatch(login(status));
        }
    }
}


user = connect(mapStateToProps,mapDispatchToProps)(user);


user=withRouter(user)

export {user};