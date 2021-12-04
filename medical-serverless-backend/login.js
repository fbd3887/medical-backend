
const jwt = require('jsonwebtoken');
const util = require('./util.js');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const user_table = process.env.USER_TABLE;


module.exports.handler = async(event) => {
  const {email_id,password} = JSON.parse(event.body);
  let emailId = email_id.toLowerCase();
  let user_name = emailId.split(/[@]/);
  console.log(user_name);
  try {
    let params = {
      TableName: user_table,
      KeyConditionExpression: "user_name = :user_name AND email_id = :email_id",
      ExpressionAttributeValues: {
          ":user_name": user_name[0],
          ":email_id" : emailId
      },
    };

    let data = await dynamodb.query(params).promise();
    
    if(data.Count === 0){
      return{
        statusCode: 400,
        headers: util.getResponseHeaders(),
        body: JSON.stringify({Success: false,
                              error:util.user_error.No_USER}),
      }
    }
    
    if(password != data.Items[0].password){
      return{
          statusCode: 400,
          headers: util.getResponseHeaders(),
          body: JSON.stringify({Success: false,
                                error:util.user_error.BAD_PASS}),
        }
    }
    // Issue JWT
    const user = {
      user_name: user_name,
      email_id: emailId
    };
  
    const token = jwt.sign({user:user}, process.env.JWT_SECRET,{});
      return{ // Success response
        statusCode: 200,
        headers: util.getResponseHeaders(),
        body: JSON.stringify({Success:true,
          token
        })
      } 
  } catch (e) {
    console.log(`Error logging in: ${e.message}`);
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