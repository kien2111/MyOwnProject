var nodemailer = require("nodemailer");

var mailconfig  = require("../Configuration/mailconfig.js")




exports.SendMail = function(){
    var transporter  = nodemailer.createTransport(mailconfig);
    var mailOption = {
        from : mailconfig.auth.user,
        to : "lkient2111@gmail.com",
        subject:"test mail",
        html: "<html>Confirm account<html>"
    }
    transporter.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log(err);
        }else{
            console.log("email sent "+info)
        }
    });
    transporter.close();


}


