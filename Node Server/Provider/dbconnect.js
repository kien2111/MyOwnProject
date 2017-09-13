
var oracledb = require('oracledb');
var dbconfig = require("../Configuration/dbconfig.js");
exports.executeQuery= function(sql,callback,param,operation){
  oracledb.getConnection({
    user :dbconfig.user||"system",
    password :dbconfig.password||123 ,
    connectionString: dbconfig.connectionString||"localhost/tlcn"
  },function(err,connection){
    if(err){
      callback(null,err.message);
      return;
    }
    /* connection.execute(sql,{},
      { outFormat: oracledb.OBJECT, extendedMetaData: true }
,function(err,result){
      if(err){
        callback(null,err.message);
        return;
      }
      //console.log(result.rows);
      doRelease(connection);
      callback(result.rows);
    }); */
    switch(operation){
      case "Q": doSelect(connection,sql,callback);break;
      case "I": doInsert(connection,sql,param,callback);break;
      case "U": doUpdate(connection,sql,callback);break;
      case "D": doDelete(connection,sql,callback);break;
      case "C": commitChange(connection);break;
    }
  });
}

function doRelease(connection){
  connection.close(
    function(err){
        if(err){
          console.error(err.message);
          return;
        }
  });
}
//done
function doSelect(connection,sql,callback){
  connection.execute(sql,{},{outFormat:oracledb.OBJECT,extendedMetaData:true},function(err,result){
    if(err){
      callback(null,err.message);
      return;
    }
    doRelease(connection);
    callback(result.rows);
  });
}
//done
function doInsert(connection,sql,param,callback){
  console.log(sql);
  connection.execute(sql,param,function(err,result){
    if(err){
      callback(null,err.message);
      return;
    }
    doRelease(connection);   
    callback(result.rowsAffected);
  });
  
}

function commitChange(connection){
  connection.commit((err)=>{
    if(err){
      console.log(err.message);
    }else{
      console.log("Commit success!! database has been changed")
    }
  });
}



