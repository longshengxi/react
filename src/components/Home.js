import React,{Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { WingBlank ,List,Carousel} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
var data ;


export class Home extends Component{
	  constructor(){
	  	super();
	  	this.state = {
	  		Tabs:[
            {
                title:'首页',
                path:'/home',
            },
            {
                title:'在线课堂',
                 path:'/lesson',
            },
            {
                title:'关于我们',
                path:'/home',
            }
            ],

	  		data: ['1', '2', '3'],
    		imgHeight: 222,
	  		sub:[
		  				{
	                title:'网络课堂',
	                img:"./img/1.png",
	                path:'/home',
	            },
	            {
	                title:'免费听歌',
	                img:"./img/2.png",
	                path:'/home',
	            },
	            {
	                title:'免费听书',
	                img:"./img/3.png",
	                path:'/goods',
	            },
	            {
	                title:'免费听戏',
	                img:"./img/4.png",
	                path:'/home',
	            },
	            {
	                title:'注册有礼',
	                img:"./img/5.png",
	                path:'/home',
	            },
	            {
	                title:'幸运转盘',
	                img:"./img/6.png",
	                path:'/home',
	            },
	            {
	                title:'助力领奖',
	                img:"./img/7.png",
	                path:'/home',
	            },
	            {
	                title:'360全景',
	                img:"./img/8.png",
	                path:'/home',
	            },
	            {
	                title:'学院论坛',
	                img:"./img/9.png",
	                path:'/home',
	            },
	            {
	                title:'签到积分',
	                img:"./img/10.png",
	                path:'/home',
	            },
            ],
            
            
            
            Learn:[{
	                title:'从零开始学唱歌',
	                In:"0元轻松学唱歌",
	                img:"./img/main1.png",
	                path:'/home',
	            },
	            
	            {
	                title:'学好舞蹈',
	                 In:"0元基础学舞蹈",
	                img:"./img/main2.png",
	                path:'/home',
	            },
	            {
	                title:'手把手教你手机',
	                 In:"0元玩转智能手机",
	                img:"./img/main3.png",
	                path:'/goods',
	            },
	            {
	                title:'中医养生',
	                 In:"一人学会全家收益",
	                img:"./img/main4.png",
	                path:'/home',
	            },
	            {
	                title:'国粹书法',
	                 In:"修身养性意境",
	                img:"./img/main5.png",
	                path:'/home',
	            },],
            
            
             jing:[]
	  	}
	  }
	  componentDidMount(){
	 	let id=this.props.location.pathname.split(":")[1]
			axios.post('http://127.0.0.1:7000/api/lesson/lessons',{
			params:{
				}
			}).then(res=>{
	//			console.log(res.data)
				let arr=[]=res.data
				this.setState({
	          jing:arr
	       })
			});
	}
	  golist=(id)=>{
	  	console.log(id)
	  	this.props.history.push(`list/:${id}`);
	  }


	 golesson=(path)=>{
    		this.props.history.push(path);
    }
	render(){
        return <div>
        <div  className="Tabs">
        {this.state.Tabs.map((val,idx) => (
        		<div key={idx} onClick={this.golesson.bind(this,val.path)}>{val.title}</div>
        ))}
        </div>
        {/*轮播图*/}
         <WingBlank>
        <Carousel
          autoplay={true}
          infinite
          beforeChange={(from, to) =>  {}}
          afterChange={index => {}}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              href="#"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src="./img/banner.png"
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
      
      	{/*轮播图下面*/}
      	
      	 <div className="sub-title">
      	 	{this.state.sub.map((val,idx) => (
        		<div key={idx}>
      	 			<img src={val.img}  alt=""/><br/>
      	 			<span>{val.title}</span>
      	 		</div>
        	))}	
      	 </div>
		 		
		 	
		 		
		 		{/*轮播图下列表的下面*/}
		 		<div className="main">
		 				 {this.state.Learn.map((val,idx) => (
        				<div key={idx}>
        					<span className="mainTitle">{val.title}</span>
        					<span>{val.In}</span>
        						<img src={val.img} alt=""/>
        				</div>
        		))}
		 		</div>
		 	
		 	{/*轮播图下列表的下面*/}
		 	<div className="choiceness"  >
		 		<span className="cTitle">精品选课</span><br/>
		 		{this.state.jing.map((val,idx) => (
        		<div key={idx} onClick={this.golist.bind(this,val._id)}><img src={'./img/'+val.img}  alt=""/><span>{val.title}</span><br/><del>{val.price}</del></div>
        	))}	
		 	</div>
		 	
		 	{/*轮播图下列表的下面*/}
		 	<div className="hbottom">
		 		<img src="./img/bottom.png" alt=""/>
		 	</div>
      </div>
    }
}
//export default home;


