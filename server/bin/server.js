const express=require('express');

const bodyParser=require('body-parser');
const db=require('../db/dbconnect.js');
const path=require('path');
var proxy =require('http-proxy-middleware');

const app=express();  //通过express调用服务器

//允许别人跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type","application/json;charset=utf-8");
    next();
});


app.use('/lesson',proxy({
	"target": "https://m.jiuxian.com",
    "changeOrigin": true,
    "pathRewrite":{
	    "^/lesson":"/"
	}
}))



//post 参数解析
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//静态文件开启
//app.use('/Climb',express.static(path.join(__dirname,'../../public')));

//router
const user=require('../router/user.js');
const lessons=require('../router/lessons.js');

app.use('/api/use',user);
app.use('/api/lesson',lessons);

app.listen(7000,()=>{
	console.log('server start in port'+7000);
})
