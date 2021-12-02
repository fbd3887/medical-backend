/**
 * Route: POST /device 
 */

 const AWS = require('aws-sdk');
 AWS.config.update({region: 'us-east-1'});
 const util = require('./util.js');
 const moment = require('moment');
 const jwt = require('jsonwebtoken');
 const dynamoDB = new AWS.DynamoDB.DocumentClient();
 const user_table = process.env.USER_TABLE;
 
  exports.handler  = async(event)=>{
     try{
        inUserTable = {} 
        let authData = util.varifyToken(event.headers);
        const decoded = jwt.verify(authData, process.env.JWT_SECRET); 
        let item = JSON.parse(event.body);
        item.timestamp = moment().unix();
        inUserTable = item
        inUserTable.timestamp = item.timestamp;
        console.log(inUserTable);
        await updateUserTable(inUserTable,decoded.user.user_name,decoded.user.email_id);
         return{
             statusCode: 200,
                 headers: util.getResponseHeaders(),
                 body: JSON.stringify({
                     Success: true,
                     message: "users updated",
                     data:inUserTable
                     })
         }
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
 
  
  
 const updateUserTable = async (userData,user_name,email_id)=>{
    let paramUserData = {
        TableName: user_table,
        Key: {"user_name":user_name[0],"email_id": email_id},
            UpdateExpression: 'set phone_num = :phone_num, occupation = :occupation, finance  = :finance, dob = :dob, education = :education, menstrual_cycle = :menstrual_cycle, bleed_cycle = :bleed_cycle, biological_age = :biological_age, overy_age = :overy_age, amh_level = :amh_level, cramp_cycle = :cramp_cycle, life_cycle = :life_cycle, preg_cycle = :preg_cycle',
            ExpressionAttributeValues: {
                ':phone_num': userData.phone_num,
                ':occupation': userData.occupation,
                ':finance' : userData.finance,
                ':dob' : userData.dob, 
                ':education' : userData.education,
                ':menstrual_cycle' : userData.menstrual_cycle,
                ':bleed_cycle' : userData.bleed_cycle,
                ':biological_age' : userData.biological_age,
                ':overy_age' : userData.overy_age,
                ':amh_level' : userData.amh_level,
                ':cramp_cycle' : userData.cramp_cycle,
                ':life_cycle' : userData.life_cycle,
                ':preg_cycle' : userData.preg_cycle
            }
    }

    await dynamoDB.update(paramUserData,(err,data)=>{
        if(err){
            if(err){
                console.error("Unable to update device data. Error JSON:", JSON.stringify(err, null, 2));
                return{
                    statusCode: err.statusCode ? err.statusCode : 500,
                    headers: util.getResponseHeaders(),
                    body: JSON.stringify({
                        error: err.name ? err.name : "Exception",
                        message: err.message ? err.message : "Unknown error"
                    })
                };
              }
        }else{console.log(`data updated successfully`)}
    }).promise(); 
}
 
 