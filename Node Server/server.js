var usercontroller = require('./Controller/usercontroller.js');
var DataError = require('./Exception/DataError.js');
var express =  require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var mailcontroller = require("./Controller/mailcontroller.js");

var data = "do shash'owania";
var crypto = require('crypto');
console.log(crypto.createHash('md5').update(data).digest("hex"));
server.listen(8081||process.env.PORT);

app.use(express.static(path.join(__dirname, 'ClientTest')));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection',(socket)=>{
  //List User 
  console.log(socket.id+" connected");
  socket.on(usercontroller.UserControllerObject.listUserObject.ListenClient,function(datafromclient){
    //usercontroller.UserControllerObject.listUserObject.Handler(datafromclient,socket);
    datafromclient = JSON.parse(datafromclient);
    if(datafromclient.WorkerName === "usercontroller"){
        switch(datafromclient.ServiceName){
          case "Authenticate": usercontroller.UserControllerObject.AuthenticateUser(datafromclient,socket); break;
          case "ListUser":usercontroller.UserControllerObject.listUserObject(datafromclient,socket); break;
          case "RegisterUser": usercontroller.UserControllerObject.RegisterUser(datafromclient,socket); break;
          default: break;
        }
    }
  });

  socket.on("disconnect",handleDisconnect);
});


var handleDisconnect = function(socket){
  console.log(socket.id +" disconnected");
}

