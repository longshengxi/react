const express=require('express');
const Router=express.Router();
const userModel=require('../db/model/userModel.js');
const util=require('../utils/utli.js');


//注册
let obj={}
Router.post('/reg',(req,res)=>{
	let name=req.body.params.NameinpValu;
	let pass=req.body.params.PassinpValu;
	let phone=req.body.params.Phone;

	userModel.find()
	.then((data)=>{
		data = JSON.parse(JSON.stringify(data));
		let state=1;
		for(let i=0;i<data.length;i++){
			if(data[i].name==name){	
				state=-1;
			}else if(data[i].phone==phone){
				state=0;
			}
		}
		if(state==-1){
			res.send(util.sendData(-1, '注册失败,用户名已经存在', null))
		}else if(state==0){
			res.send(util.sendData(-1, '注册失败,电话号码已注册', null))
		}else{
			userModel.insertMany({
					pass,
					phone,
					name
			})
			.then((data) => {
			res.send(util.sendData(0, '注册成功', null))
			})
			.catch((err) => {
				console.log(err)
				res.send(util.sendData(-1, '注册失败', null))
			})
		}
	})
})

//登录
Router.post('/login',(req,res)=>{
	let name=req.body.params.NameinpValu;
	let pass=req.body.params.PassinpValu;
	userModel.find()
	.then((data)=>{
		data = JSON.parse(JSON.stringify(data));
		let state=-1;
		for(let i=0;i<data.length;i++){
			if(data[i].name==name){	
				if(data[i].pass==pass){
					state=0;
				}
			}
		}
		if(state==0){
			res.send(util.sendData(0, '登录成功', null))
		}else{
			res.send(util.sendData(-1, '登录失败', null))
		}
	})
})





module.exports=Router;