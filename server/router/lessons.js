const express=require('express');
const Router=express.Router();
const lessonsModel=require('../db/model/lessonsModel.js');
const util=require('../utils/utli.js');


//课程
Router.post('/lessons',(req,res)=>{
	let page=req.body.params.page;
	let num=req.body.params.num;
	lessonsModel.find()
	.then((data)=>{
		data=data.slice(page,num)
		res.send(data)
	})
})


//模糊查询
Router.post('/query', (req, res) => {
	let title = req.body.params.value;
	var query = {}; //定义一个对象，拿来放val
	query['title'] = new RegExp(title); //模糊查询参数
	lessonsModel.find({
			'title': query['title']
		})
		.then((data) => {
//			console.log(data)
			res.send(util.sendData(0, '请求ok', data))
			
		})
		.catch((err) => {
			res.send(util.sendData(-1, '请求错误', null))
		})
})



module.exports=Router;