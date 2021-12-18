const Handlebars = require('handlebars')
const util = require('./util.js');
const AWS = require('aws-sdk');
const fs = require('fs');
const fsPromises = fs.promises;
const dynamodb = new AWS.DynamoDB.DocumentClient();
const user_table = process.env.USER_TABLE;
const ses = new AWS.SES({region: 'us-east-1'}); // Simple email service

module.exports.handler = async(event) => {
    try{
        let query = event.queryStringParameters;
        let email_id = query.email;
        let user_name = email_id.split(/[@]/);
        let params = {
            TableName: user_table,
            KeyConditionExpression: "user_name = :user_name AND email_id = :email_id",
            ExpressionAttributeValues: {
                ":user_name": user_name[0],
                ":email_id" : email_id
            },
          };

          let url = 'https://prq6xjzpd5.execute-api.us-east-1.amazonaws.com/prod/' + 'reset?email=' + email_id;

          let filePath = process.cwd() + "/emailTemplates/forgotPasswordEmail.html";

          let data = await dynamodb.query(params).promise();
    
    if(data.Count === 0){
      return{
        statusCode: 400,
        headers: util.getResponseHeaders(),
        body: JSON.stringify({Success: false,
                              error:util.user_error.EMAIL_ADDR}),
      }
          
    }
    let emailData = {
        "url": url,
        "email":email_id
        };
    let emailHtmlTemplate = await fsPromises.readFile(filePath);
    let templateHtml = Handlebars.compile(emailHtmlTemplate.toString());
    let bodyHtml = templateHtml(emailData);
    const emailAttr = {
        Destination: {
            ToAddresses: [emailData.email]
        },
        Message: {
           Body: {
            Text: { Data: 'To reset your password, please click the link below.\n\n'+ emailData.url
        },
        Html: { 
            Data: bodyHtml
        }
            },
            Subject: {Data: 'Reset Password request'}
        },
        Source: process.env.EMAIL_ID
        };
        await ses.sendEmail(emailAttr,(err,data)=>{
            if(err){
                console.error("Unable to send mail. Error JSON:", JSON.stringify(err, null, 2));
              }else{
                  console.error("Successful sent mail", JSON.stringify(data, null, 2));
              }
        }).promise();
        return{ // Success response
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({Success:true,message:`Password Reset Email sent successfully to ${emailData.email}`
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
