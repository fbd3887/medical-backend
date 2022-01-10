//const Handlebars = require('handlebars')
const util = require('./util.js');
const AWS = require('aws-sdk');
//const fs = require('fs');
//const fsPromises = fs.promises;
const dynamodb = new AWS.DynamoDB.DocumentClient();
const user_table = process.env.USER_TABLE;
const jwt = require('jsonwebtoken');

module.exports.handler = async(event) => {
    try{
        let email_id = (decodeURIComponent(event.pathParameters.email_id)).toLowerCase();
        console.log(event.body)
        const {new_password} = JSON.parse(event.body);
        console.log(new_password)
        //let authData = util.varifyToken(event.headers);
        //const decoded = jwt.verify(authData, process.env.JWT_SECRET);
        //console.log(decoded)
        //console.log(decoded.user.email_id)
        console.log(email_id)
        /*if(decoded.user.email_id !== email_id){
            console.log("failes at token")
            return{
                statusCode: 400,
                headers: util.getResponseHeaders(),
                body: JSON.stringify({Success: false,
                                    error:util.user_error.EMAIL_ADDR}),
        }
    }*/
        let user_name = email_id.split(/[@]/);
        
        let params = {
            TableName: user_table,
            KeyConditionExpression: "user_name = :user_name AND email_id = :email_id",
            ExpressionAttributeValues: {
                ":user_name": user_name[0],
                ":email_id" : email_id
            },
          };

          let data = await dynamodb.query(params).promise();
    
        if(data.Count === 0){
        console.log("db error");
        return{
            statusCode: 400,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({Success: false,
                                error:util.user_error.EMAIL_ADDR}),
        }  
    }
    /*if(data.Items[0].password !== current_password){
        return{
            statusCode: 400,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({Success: false,
                                error:util.user_error.BAD_PASS}),
        }
    }*/

        
    await updatePassword(email_id,user_name,new_password);
         return{
             statusCode: 200,
                 headers: util.getResponseHeaders(),
                 body: JSON.stringify({
                     Success: true,
                     message: "password updated",
                     })
         } 
    }catch(err){
        console.log(`Error logging in: ${err.message}`);
    return{ // Error response
        statusCode: err.statusCode ? err.statusCode : 500,
        headers: util.getResponseHeaders(),
        body: JSON.stringify({
            error: err.name ? err.name : "Exception",
            message: err.message ? err.message : "Unknown error"
        })
    };
    }
  };

  const updatePassword = async (email_id,user_name,new_password)=>{
    let paramPasswordData = {
        TableName: user_table,
        Key: {"user_name":user_name[0],"email_id": email_id},
            UpdateExpression: 'set password = :password',
            ExpressionAttributeValues: {
                ':password': new_password
            }
    }

    await dynamodb.update(paramPasswordData,(err,data)=>{
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
