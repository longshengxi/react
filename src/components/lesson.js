import React,{Component} from 'react';
import axios from 'axios';
import {Switch,Route} from 'react-router-dom';
import '../less/lesson.less';
import { PullToRefresh, Button } from 'antd-mobile';
const rdom = require('react-dom');  


class lesson extends Component{
	 constructor(){
	  	super();
	  	this.state = {
	  		lessonlist:[],
	  		 page:0,
	  		 num:4,
	  		 title:['课程','销量','价格'],
	  		 Sorting:0,
	  		 sValue:'',
	  		 send:1

	  	}
	  	 this.handleScroll = this.handleScroll.bind(this)
	 }
	 

  	componentWillMount(){
  		this.setState({
            send:0,
       })
  		let page=this.state.page
  		let num=this.state.num
		axios.post('http://127.0.0.1:7000/api/lesson/lessons',{
		params:{
				page,
				num
			}
		}).then(res=>{
			this.setState({
            	lessonlist:res.data,
        	})
			
		});
    }
  	
	Sorting=(idx)=>{
		this.setState({
            Sorting:idx,
       })
		if(idx==2){
			function sortprice(a,b){
				return b.price-a.price
			}
	  		let arr=[]
			arr=this.state.lessonlist.sort(sortprice);
			this.setState({
	            lessonlist:arr,
	        })
		}else if(idx==1){
			function sortprice(a,b){
				return b.Sales-a.Sales
			}
	  		let arr=[]
			arr=this.state.lessonlist.sort(sortprice);
			this.setState({
	            lessonlist:arr,
	        })
		}
	}
	SearchList=()=>{
		let lesson=this.state.lessonlist;
		let value=this.state.sValue
		if(value==""){
			alert('搜索内容不能为空')
		}else{
			axios.post('http://127.0.0.1:7000/api/lesson/query',{
			params:{
					value
				}
			})
			.then(res=>{
				
				this.setState({
            		lessonlist:res.data.data,
       			})
			});
		}
		
	}
	handelChange(e){
		this.setState({
            sValue:e.target.value,
       	})
		
  	}
	golist=(id)=>{
//		console.log(id)
		this.props.history.push(`/list/:${id}`);
	}

  	
	handleScroll = e => {
		const clientHeight = e.target.clientHeight
    	const scrollHeight = e.target.scrollHeight
    	const scrollTop = e.target.scrollTop
		const isBottom = (clientHeight + scrollTop === scrollHeight)
    	if(isBottom){
//  		console.log('到底了')
    		let num=this.state.num+1;
	    	this.setState({
	            num:num,
	       	})
	    	let page=this.state.page;
	    	let send=this.state.send;
			if(send==0){
				axios.post('http://127.0.0.1:7000/api/lesson/lessons',{
				params:{
						page,
						num
					}
				}).then(res=>{
					let data=res.data.length
					let lessonlist=this.state.lessonlist.length
//					console.log(data)
//					console.log(lessonlist)
					if(data==lessonlist){
						this.setState({
				            send:1,
				       	})
					}
					this.setState({
		            	lessonlist:res.data,
		        	})
					
				});
			}else{
				alert("没有更多了")
			}
	    	
    		
    	}

 	}
   componentDidMount() {
	   	let lesson=window.document.getElementsByClassName("lesson")[0]
	// 	console.log(sr)
	    lesson.addEventListener('scroll', this.handleScroll.bind(this)) //监听滚动
	}
   componentWillUnmount() {
    	let lesson=window.document.getElementsByClassName("lesson")[0]
      lesson.removeEventListener('scroll', this.handleScroll.bind(this));
  }




    render(){   
        return <div className="lesson" >
         	<div className="lessontop"><span className="fa fa-angle-left left"></span>
         		<span className="fa fa-neuter Magnifier"></span><input type="text" className="Search" onChange={this.handelChange.bind(this)} defaultValue={this.state.sValue}/>
         		<button className="bu" onClick={this.SearchList}>搜索</button>
         	</div>
         	<div className="nav">
         	{this.state.title.map((val,idx)=> (
         		<div key={idx} onClick={this.Sorting.bind(this,idx)} className={this.state.Sorting===idx?'h0':''}>{val}</div>
         	 ))}	
         	</div>
         	<div className="lessonmain" >
         	 {this.state.lessonlist.map((val,idx) => (
        			<div className="Local" key={idx} onClick={this.golist.bind(this,val._id)}>
         			<img src={'./img/'+val.img} />
         			<div className="imgcontent">
         				<p className="title">{val.title}</p>
         				<p className="con">{val.content}</p>
         				<span className="no">免费</span><del>{val.price}</del>
         				<div className="bo">
         				<span className="shleft" >销量:<span>{val.Sales}</span></span>
         				<span className="shright">评价:<span>{val.Evaluation}</span></span>
         				</div>
         			</div>
         		</div>	
        	 ))}
         	 
         	
         	</div>
         	
 			
       </div>
    }
}

export {lesson};