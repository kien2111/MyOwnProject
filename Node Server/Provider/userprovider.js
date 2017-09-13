var express = require('express');
var app = express();
var dbconnect = require("./dbconnect.js");

module.exports = {
  // Get All User from db
  GetListUser : (ControllerCallBack)=>{
    dbconnect.executeQuery("Select * from USER_",function(data,err){
      ControllerCallBack(data,err);
      },null,"Q");
  },

  //Get Specific User from db
  CheckUserExist : (ControllerCallBack,Email,Password)=>{
      dbconnect.executeQuery("select count(*) from USER_ where EMAIL='"+Email+"' and PASSWORD ='"+Password+"'",(data,err)=>{
        ControllerCallBack(data,err);
      },null,"Q");
      
  },

  //Register User
  //status : not complete need improve
  RegisterUser : (ControllerCallBack)=>{
      dbconnect.executeQuery("begin INSERT_INFO_USER(:name,:address,:phonenumber,:birthday,:imagepath) end;",(data,err)=>{
          ControllerCallBack(data,err);
      },['4','zxc',235234,null,null],"I");
      dbconnect.executeQuery("begin INSERT_USER(:email,:password,:user_detail,:user_type,:active,:hashvalue) end;",(data,err)=>{
        ControllerCallBack(data,err);
    },['vzxc','zxc','xcv','zxcv',02475,null],"I");//not complete
        dbconnect.executeQuery(null,null,null,"C");
  }
  


};
