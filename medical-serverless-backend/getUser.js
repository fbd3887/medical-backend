const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const util = require('./util.js');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const user_table = process.env.USER_TABLE;

exports.handler = async (event) => {
    try {
        let authData = util.varifyToken(event.headers);
        const decoded = jwt.verify(authData, process.env.JWT_SECRET);
        console.log(decoded.user.user_name)
        let paramsUserInfo = {
            TableName: user_table,
            KeyConditionExpression: "user_name = :user_name AND email_id = :email_id",
            ExpressionAttributeValues: {
                ":user_name": decoded.user.user_name[0] ,
                ":email_id": decoded.user.email_id
            },
           };

        let data = await dynamodb.query(paramsUserInfo).promise();

        if(data.Count == 0){
            return{
                statusCode: 200,
                headers: util.getResponseHeaders(),
                body: JSON.stringify({Success: false,
                                      error:util.user_error.No_USER}),
            }
        }
        delete data.Items[0].password;
            return {
                statusCode: 200,
                headers: util.getResponseHeaders(),
                body: JSON.stringify({Success: true,
                                    user:data.Items})
            };
        
    } catch (err) {
        console.log("Error", err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unknown error"
            })
        };
    }
}
 
 