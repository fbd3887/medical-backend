# AWS Serverless Project

## We are using following Services
* AWS Apigateway
* AWS Dynamo DB
* AWS Lambda Function

### Dependencies
* npm install jsonwebtoken
* npm i serverless-offline
* npm install -g serverless

### Project Setup
* clone the project
* Install Serverless: npm install -g serverless
* Test the API offline using 'serverless offline' 
* Deploy to Serverless: serverless deploy -s prod


### APIS
#### Login Api

##### Method: POST
https://2swtcczgla.execute-api.us-east-1.amazonaws.com/prod/login
##### Request Body: 
    {
    "user_name": "Admin007",
    "password": "password"
    }

##### Response Body: 
    {
    "Success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfbmFtZSI6IkFkbWluMDA3In0sImlhdCI6MTYzNTEwNDI5OX0.enNTRA_0tVw-RW8qWZysXb5UMOsU7wfp0EdCUXRJWbw"
    }

##### Method: POST
https://2swtcczgla.execute-api.us-east-1.amazonaws.com/prod/register
##### Request Body:  
    {
    "email_id": "admin2@gmail.com",
    "password": "password",
    "phone_num": "1234567",
    "occupation" : "govenment Service",
    "finance" : "21342",
    "education" : "Degree"
    }
##### Response Body: 
    {
    "Success": true,
    "user": {
        "email_id": "admin2@gmail.com",
        "password": "password",
        "phone_num": "1234567",
        "occupation": "govenment Service",
        "finance": "21342",
        "education": "Degree",
        "user_name": "admin2",
        "timestamp": 1635195747,
        "expires": 1650747747
    }
    }







