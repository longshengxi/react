import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Route,NavLink,Redirect,Switch,withRouter} from 'react-router-dom';

import { TabBar } from 'antd-mobile';

//引入ant-design-mobile的样式
import 'antd-mobile/dist/antd-mobile.css';

import './less/page.less';
import './css/font-awesome-4.7.0/font-awesome-4.7.0/css/font-awesome.css'

import {Home} from './components/Home';
import {message} from './components/message';
import {service} from './components/service';
import {user} from './components/user';
import {reg} from './components/reg';
import {lesson} from './components/lesson'
import {list} from './components/list'
import {My} from './components/My'
import {mine} from './components/mine'
import {NotFound} from './components/Page';

import store from './store.js'




class App extends Component {
  constructor(){
    super();
    this.state = {
        tabs:[
            {
                title:'首页',
                path:'/home',
                icon:'fa fa-home'
            },
            {
                title:'客服',
                path:'',
                icon:'fa fa-volume-control-phone'
            },
            {
                title:'留言',
                path:'/message',
                icon:'fa fa-commenting-o'
            },
            {
                title:'会员',
                path:'/mine',
                icon:'fa fa-user'
            }
        ],
        titles:['暮享国际老年大学网络课堂','暮享国际老年大学网络课堂','在线留言','会员中心','登录','注册'],
        idx:0,
        display:'none',
        bottomdisplay:'',
        login:0
    }
  }

  handlerClick(path,idx){
//	console.log(this.props.bottomdisplay)
  let index=idx//通过下标改变top的标题
  this.setState({
      idx:index
  });
    
	if(path==""){
		 this.setState({
          display:'block'
    });
	}
      //编程式导航
      //获取history的方式
      // * 通过Route渲染App
      // * 利用withRouter高阶组件实现
      this.props.history.push(path);
  }
  //客服点击消失
  Disappear=()=>{
    this.setState({
          display:'none'
    });
  }
	goback=()=>{
		this.props.history.go(-1)
	}
	componentDidMount(){
			console.log(this.props.bottomdisplay)
	}
  
  render() {

    return (
      <div className="container">
      		<div className='top'><span className='fa fa-angle-left tu' onClick={this.goback}></span> <span>{this.state.titles[this.state.idx]}</span></div>
            <div className="content">
                <Switch>
                    <Route path="/home" component={Home} />                   
                    <Route path="/message" component={message} />
                    <Route path="/user" component={user} />
                    <Route path="/reg" component={reg} />
                    <Route path="/lesson" component={lesson} />
                    <Route path="/list" component={list} />
                    <Route path="/list/:id" component={list} />
                    <Route path="/My/" component={My} />
                    <Route path="/My/:name" component={My} />
                    <Route path="/mine/" component={mine} />
                    <Route path="/404" component={NotFound} />
                    <Redirect from="/" to="/home" exact/>
                    <Redirect to="/404"/>
                </Switch>
            </div>
            <div className="bottom" style={{'display':this.props.bottomdisplay}}>
	            {this.state.tabs.map((val,idx) => (
	      	 		<div key={val.path} onClick={this.handlerClick.bind(this,val.path,idx)} ><span className={val.icon}></span>&nbsp;&nbsp;{val.title}</div>
	        	))}
            </div>
            {/*客服的显示隐藏*/}
            <div className='service' onClick={this.Disappear}  style={{'display':this.state.display}}></div>
            <img src="./img/qr.png"  alt="" className='rq' style={{'display':this.state.display}}/>
        </div>
    );
  }
}

let mapStateToProps = state=>{
    // 此处必须返回一个对象
//  console.log(state);
    return {
        //把state.commonReducer.tabbarStatus映射到props
        bottomdisplay:state.commonReducer.bottomdisplay,
        login:state.commonReducer.login,
    }
}

App = connect(mapStateToProps)(App);


//利用高阶组件传递路由参数
App=withRouter(App)

export default App;
