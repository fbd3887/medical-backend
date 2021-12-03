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
#### Login API

##### Method: POST
https://prq6xjzpd5.execute-api.us-east-1.amazonaws.com/prod/login
##### Request Body: 
    {
    "email_id": "admin2@gmail.com",
    "password": "password"
    }

##### Response Body: 
    {
    "Success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfbmFtZSI6IkFkbWluMDA3In0sImlhdCI6MTYzNTEwNDI5OX0.enNTRA_0tVw-RW8qWZysXb5UMOsU7wfp0EdCUXRJWbw"
    }

#### Register API
##### Method: POST
https://prq6xjzpd5.execute-api.us-east-1.amazonaws.com/prod/register
##### Request Body:  
    {
    "email_id": "hopeful5@gmail.com",
    "id_number": 234,
    "name": "vaibhav",
    "password": "password",
    "phone_num": "1234567",
    "occupation" : "govenment Service",
    "finance" : "21342",
    "dob" : "1992-09-18",
    "education" : "Degree",
    "menstrual_cycle" : 1,
    "bleed_cycle" : 2,
    "biological_age" : "23",    
    "overy_age" : "35",
    "amh_level" : "3.10",
    "cramp_cycle":2,
    "life_cycle":1,
    "preg_cycle":1
    }



##### Response Body: 
    {
    "Success": true,
    "user": {
        "email_id": "hopeful7@gmail.com",
        "id_number": 234,
        "name": "vaibhav",
        "phone_num": "1234567",
        "occupation": "govenment Service",
        "finance": "21342",
        "dob": "1992-09-18",
        "education": "Degree",
        "menstrual_cycle": 1,
        "bleed_cycle": 2,
        "biological_age": "23",
        "overy_age": "35",
        "amh_level": "3.10",
        "cramp_cycle": 2,
        "life_cycle": 1,
        "preg_cycle": 1,
        "user_name": "hopeful7",
        "timestamp": 1638430511,
        "expires": 1653982511
    }
}

####FetchUser API
##### Method GET    
 https://prq6xjzpd5.execute-api.us-east-1.amazonaws.com/prod/user

##### Required Header
Authorization : '{Token got from login}'

##### Response Body:
    {
    "Success": true,
    "user": [
        {
            "occupation": "govenment Service",
            "life_cycle": 1,
            "expires": 1652856332,
            "menstrual_cycle": 1,
            "bleed_cycle": 2,
            "timestamp": 1637304332,
            "preg_cycle": 1,
            "phone_num": "1234567",
            "biological_age": "23",
            "education": "Degree",
            "id_number": 234,
            "overy_age": "35",
            "dob": "1992-09-18",
            "cramp_cycle": 2,
            "finance": "21342",
            "user_name": "hopeful3",
            "amh_level": "3.10",
            "email_id": "hopeful3@gmail.com"
        }
        ]
    }


####UpdateUser API
##### Method POST    
https://prq6xjzpd5.execute-api.us-east-1.amazonaws.com/prod/updateUser

##### Required Header
Authorization : '{Token got from login}'

##### Request Body
    
    {
    "phone_num": "1234567",
    "occupation" : "govenment Service",
    "finance" : "21342",
    "dob" : "1992-09-18",
    "education" : "Degree",
    "menstrual_cycle" : 1,
    "bleed_cycle" : 2,
    "biological_age" : "23",    
    "overy_age" : "35",
    "amh_level" : "3.10",
    "cramp_cycle":2,
    "life_cycle":1,
    "preg_cycle":1
    }

#### Response Body
    {
    "Success": true,
    "message": "users updated",
    "data": {
        "phone_num": "1234567",
        "occupation": "govenment Service",
        "finance": "21342",
        "dob": "1992-09-18",
        "education": "Degree",
        "menstrual_cycle": 1,
        "bleed_cycle": 2,
        "biological_age": "23",
        "overy_age": "35",
        "amh_level": "3.10",
        "cramp_cycle": 2,
        "life_cycle": 1,
        "preg_cycle": 1,
        "timestamp": 1638430283
    }
    }

