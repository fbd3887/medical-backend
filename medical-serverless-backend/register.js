/**
 * Route: POST /device 
 */

 const AWS = require('aws-sdk');
 AWS.config.update({region: 'us-east-1'});
 const util = require('./util.js');
 const moment = require('moment');
 //const bcrypt = require('bcrypt');
 
 const dynamoDB = new AWS.DynamoDB.DocumentClient();
 const user_table = process.env.USER_TABLE;
 
 
 exports.handler  = async(event)=>{
    try{
        let item = JSON.parse(event.body);
        let emailId = item.email_id; 
        const user_name = emailId.split(/[@]/);
        item.user_name = String(user_name[0]);
        console.log(user_name[0]);
        let paramsUserName = {
         TableName: user_table,
         KeyConditionExpression: "user_name = :user_name AND email_id = :email_id",
         ExpressionAttributeValues: {
             ":user_name": item.user_name ,
             ":email_id": item.email_id
         },
        };

        let userNameData = await dynamoDB.query(paramsUserName,(err,data)=>{
            if(err){
                console.log("Unable to query dynamodb User table");
             return{
                 statusCode: err.statusCode ? err.statusCode : 500,
                 headers: util.getResponseHeaders(),
                 body: JSON.stringify({
                     error: err.name ? err.name : "Exception",
                     message: err.message ? err.message : "Unknown error"
                 })
             };
            }
        }).promise();
 
        if(userNameData.Count > 0){
         return{
           statusCode: 400,
           headers: util.getResponseHeaders(),
           body: JSON.stringify({Success: false,
                                 error:util.user_error.EMAIL_ADDR}),
         }
        }

 
        item.timestamp = moment().unix();
        item.expires = moment().add(180, 'days').unix();
 
        
        let data = await dynamoDB.put({
            TableName: user_table,
            Item: item
        },(err,data)=>{
            if(err){
                console.log("Unable to query dynamodb User table");
             return{
                 statusCode: err.statusCode ? err.statusCode : 500,
                 headers: util.getResponseHeaders(),
                 body: JSON.stringify({
                     error: err.name ? err.name : "Exception",
                     message: err.message ? err.message : "Unknown error"
                 })
             };
            }
        }).promise();
        
        //item.menstrual_cycle = util.getMenstrualCycle().get(item.menstrual_cycle);
        //item.bleed_cycle = util.bleedCycle().get(item.bleed_cycle);
        //item.cramp_cycle  = util.crampsCycle().get(item.cramp_cycle);
        //item.life_cycle = util.currentLife().get(item.life_cycles);
        //item.preg_cycle = util.pragnencyCycle().get(item.preg_cycle);
        delete item.password;
        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                 Success: true,
                 user:item,
            })
        };
 
    }catch(err){
        console.log("Error",err);
        return{
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unknown error"
            })
        }
    }
 }