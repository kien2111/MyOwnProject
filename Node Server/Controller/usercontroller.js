var userprovider = require("../Provider/userprovider.js");
var JsonResponse = require("../FormatJson/JsonResponse.js");
var DataError = require("../Exception/DataError.js");
exports.UserControllerObject = {
  listUserObject :(datafromclient,socket)=>{
      userprovider.GetListUser(function(data,err){
            if(err){
              console.error(err);
            }else{
              socket.emit('RES_MSG',new JsonResponse.RESPONSE_MSG( socket.id,
                datafromclient.ClientSeq,              
                JSON.stringify(data),
                DataError.SUCCESS.Code
                ,DataError.SUCCESS.Message
                ,1));                
            }
        });
      },   
  

  AuthenticateUser : (datafromclient,socket)=>{
      userprovider.CheckUserExist((data,err)=>{
          if(err){
            console.error(err);
          }else{
            let res = new JsonResponse.RESPONSE_MSG(socket.id,
              datafromclient.ClientSeq,
              JSON.stringify(data),
              DataError.SUCCESS.Code
              ,DataError.SUCCESS.Message
              ,1);
            console.log(res);
            socket.emit('RES_MSG',res);          
          }
      },datafromclient.InVal[0],datafromclient.InVal[1]);  
    }, 
  


  RegisterUser : (datafromclient,socket)=>{
      userprovider.RegisterUser((data,err)=>{
          if(err){
              console.log(err);
          }else{
              console.log("Row inserted "+data);
          }
      });
    }
  
  

  
}

