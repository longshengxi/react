import React,{Component} from 'react';
import axios from 'axios';
import {Switch,Route} from 'react-router-dom';
import '../less/My.less';
import {connect} from 'react-redux';
import {login} from '../action';

class My extends Component{
	 constructor(){
	  	super();
	  	this.state = {
	  		name:""

	  	}
	 }
	 componentDidMount(){
		
		let name=this.props.location.pathname.split(":")[1]
		console.log(name)
		this.setState({
            		name:name
        })
	}
	ect=()=>{
		this.props.changelogin(0) //进来就改变状态
		this.props.history.push("/mine");
	}
	
    render(){   
        return <div className="my">
         	<div className="myTop">
         		<div className="myTT">
         			<span className="fa fa-angle-left left"></span>
         			<span className="right"><span className="fa fa-home"></span><span className="fa fa-gear"></span></span>
         		</div>
         		<div className="user"><span className="fa fa-user-circle"></span></div>
         		<div className="mybottom">
         		<span className="usn">{this.state.name}</span><br/>
         		<span>黄金会员</span><br/>
         		<span>会员编号:004877</span><br/>
         		<button>ff</button>
         		</div>
         	</div>
         	<div className="Message"><span className="Messageleft">消息</span><span className="fa fa-angle-right Messageright"></span></div>
         	<div className="assets"><span className="Messageleft"><span className="fa fa-money money"></span>&nbsp;&nbsp;我的资产</span><span className="fa fa-angle-right Messageright"></span></div>
 			<div className="four">
				<div>
					<span className="fa fa-database fatu"></span>
					<span>积分</span>
				</div>
				<div>
					<span className="fa fa-ticket fatu"></span>
					<span>券</span>
				</div>
				<div style={{' border':"none"}}>
					<span className="fa fa-newspaper-o fatu"></span>
					<span>账单</span>
				</div>
				<div>
					
				</div>
			</div>
			<div className="Message"><span className="Messageleft">我的资料</span><span className="fa fa-angle-right Messageright"></span></div>
			<div className="Message"><span className="Messageleft">会员卡</span><span className="fa fa-angle-right Messageright"></span></div>
			<div className="Message"><span className="Messageleft">我的评价</span><span className="fa fa-angle-right Messageright"></span></div>
			<div className="inputdiv"><input type="button" value="退出" onClick={this.ect}/></div>
			<div className="last"></div>
			
       </div>
    }
}

let mapDispatchToProps = dispatch=>{
    return {
        // 把change方法映射到props
        changelogin(status){
            dispatch(login(status));
        }
    }
}
My = connect('',mapDispatchToProps)(My);


export {My};