import React,{Component} from 'react';

import {Switch,Route} from 'react-router-dom';
import '../less/message.less';
import {connect} from 'react-redux';
import {tabbar} from '../action';
import store from '../store.js'
class message extends Component{
   	constructor(props){
        super(props);
    }
  	componentDidMount(){
//		console.log(this.props)
		this.refs.text.focus();
		this.props.change('none') //进来就改变状态
	}
  	componentWillUnmount(){
  		this.props.change('')   //改组件死掉后就把状态改回
  	}

	goback=()=>{
		this.props.history.go(-1)
	}
    render(){
        let {match} = this.props;
        return <div className="message">
         <div className="mtop"><span className="goback" onClick={this.goback}>返回</span>留言<span className="ye">确定</span></div>
       	<div className="name">你的姓名<span>*</span></div>
       	<div className="nameinput"><input type="text" ref='text'/></div>
       	<div className="phone">联系方式<span>*</span></div>
       	<div className="phoneinput"><input type="text"/></div>
       	<div className="m">留言内容<span>*</span></div>
       	<div className="minput"><textarea></textarea></div>
       	<div className="yzm"><input type="text" placeholder="验证码"/></div>
       	<div className="submit"><input type="button" value="提交"/></div>
       </div>
    }
}

let mapDispatchToProps = dispatch=>{
//	console.log(dispatch)
    return {
        // 把change方法映射到props
        change(status){
            dispatch(tabbar(status));
        }
    }
}


message = connect('',mapDispatchToProps)(message);

export {message};