import React,{Component} from 'react';
import axios from 'axios';
import {Switch,Route} from 'react-router-dom';
import '../less/reg.less';

class reg extends Component{
	 constructor(){
	  	super();
	  	this.state = {
	  		 NameinpValu:'',
	  		 PassinpValu:'',
	  		Phone:'',
	  		Yz:'',
	  		hint:'按要求填信息',
	  		style:'red'
	  	}
	  }
  	componentDidMount(){
		this.refs.text.focus();
		this.setState({
            	hint:''
        	})
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
  		}else if(e.target.className=="Phone"){
  			this.setState({
            	Phone:e.target.value
        	})
  		}else if(e.target.className=="Yz"){
  			this.setState({
            	Yz:e.target.value
        	})
  		}
    }
  	reg=()=>{
		let Name=this.state.NameinpValu;
		let Pass=this.state.PassinpValu;
		let Phone=this.state.Phone;
		let Yz=this.state.Yz;
		if((Name!="")||(Pass!="")||(Phone!="")||(Yz!="")){
		axios.post('http://127.0.0.1:7000/api/use/reg',{
		params:{
				NameinpValu:Name,
		  		PassinpValu:Pass,
		  		Phone:Phone,
//		  		Yz:Yz,
			}
		}).then(res=>{
			let sta = res.data.msg;
			if(sta=="注册成功"){
				this.setState({
					style:'green',
            		hint:sta
        		})
				 this.props.history.push("/user");
				
			}else{
				this.setState({
					style:'red',
            		hint:sta
        		})
			}
			
		});
		}else{
			this.setState({
            	hint:'按要求把信息填全'
        	})
		}
  	}
  	login=()=>{
  		this.props.history.push("/user");
  	}

    render(){
        let {match} = this.props;
        return <div className="reg">
           <div className="utop"><span className="fa fa-angle-left left"></span>会员注册</div>
           <div className="username">用户名<span>*</span></div>
           <div className="usninput"><input className="Name" type="text" placeholder="用户名请用中文  字母或下划线" ref='text' onChange={this.handelChange.bind(this)} defaultValue={this.state.NameinpValu}/></div>
           <div className="userpass">密码<span>*</span></div>
            <div className="uspinput"><input className="Pass" type="text" onChange={this.handelChange.bind(this)} defaultValue={this.state.PassinpValu}  placeholder="不少于6个字符 建议使用英文数字和符号"/></div>
            <div className="userph">电话<span>*</span></div>
            <div className="usphinput"><span className="g">国内<span className="fa fa-chevron-right"></span></span><input type="text" placeholder="不少于6个字符 建议使用英文数字和符号" className="Phone" onChange={this.handelChange.bind(this)} defaultValue={this.state.Phone}/></div>
        	<div className="none"></div>
       		<div className="yzm"><input type="text" placeholder="验证码" className="Yz"onChange={this.handelChange.bind(this)} defaultValue={this.state.Yz} /></div>
       		<div className="hint " style={{color:this.state.style}}>{this.state.hint}</div>
       		<div className="userreg">
         		<button className="regbutton" onClick={this.reg}>注册</button>
   			</div>
   			<div className="login">
        		<button className="loginbutton" onClick={this.login}>登录</button>
    		</div>
       </div>
    }
}

export {reg};