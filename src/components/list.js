import React,{Component} from 'react';
import axios from 'axios';
import {Switch,Route} from 'react-router-dom';
import '../less/list.less';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

const tabs = [
  { title: <Badge >课程</Badge> },
  { title: <Badge>目录</Badge> },
  { title: <Badge>评论</Badge> },
];

class list extends Component{
	 constructor(){
	  	super();
	  	this.state = {
	  		img:'',
	  		title:''

	  	}
	 }
	 	componentWillMount(){
	 	let id=this.props.location.pathname.split(":")[1]
		axios.post('http://127.0.0.1:7000/api/lesson/lessons',{
		params:{
			}
		}).then(res=>{
			for(let i=0;i<res.data.length;i++){
				if(res.data[i]._id==id){
					let listimg=res.data[i].img
					let title=res.data[i].title
					this.setState({
            	img:listimg,
            	title:title
        	})
				}
			}	
		});
   }
	 	
    render(){   
        return <div className="list">
        <div className="listtop"><span className="fa fa-angle-leftd"></span>{this.state.title}</div>
 		<div className="img">
			<img src={'./img/'+this.state.img} art="" />
		</div>
		<Tabs tabs={tabs}
	      initialPage={1}
	      onChange={(tab, index) => { }}
	      onTabClick={(tab, index) => { }}
	      tabBarActiveTextColor={'#fe9900'}
			tabBarUnderlineStyle={React.CSSProperties}	      
	    >
	      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', backgroundColor: '#fff' }}>
	        课程
	      </div>
	      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', backgroundColor: '#fff' }}>
	       	 目录
	      </div>
	      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', backgroundColor: '#fff' }}>
	        评论
	      </div>
	    </Tabs>
		<div className="see">
			<div className="">收藏</div>
			<div className="">分享</div>
			<div>立即观看</div>
		</div>


       </div>
    }
}

export {list};