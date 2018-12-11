const mongoose=require('mongoose');
let Schema=mongoose.Schema;

let userSchema=new Schema({
	pass:{type:String,required:true},
	phone:{type:String,required:true},
	name:{type:String,required:true}
})

let usermodel=mongoose.model('lesson',userSchema);
module.exports=usermodel;