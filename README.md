# SMS Management API
SMS Management Application API built using AdonisJs Framework. 

## Setup
 - Install the AdonisJs cli - `npm install -g @adonisjs/cli`
 - Clone repository `git Clone https://github.com/Dammyy/sms-management-api.git`
 - Install dependencies by running `npm install`
 - Create .env file. Use .env.example as a guide to setup your environment variables. You can setup mysql or postgres or sqlite for database.
 - Generate an application key by running `adonis key:generate`
 - Run migrations using `adonis migration:run`
 - Start the application by running `adonis serve --dev`
 - Run the tests using `adonis test`

### API DOCUMENTATION
You can test out the endpoints using postman.

 - Create an account `POST /register`: Hit this ednpoint to create an account. You would need to provide `name`, `phone`, `email`, `password` in the body of your request in order to create an account. A JWT token would be generated which you can copy and add as an authorization header in postman.
 - login `POST /login`: You can login using this endpoint. you would need to provide `email`, and `password` in the body of your request. A JWT token would be generated which you can copy and add as an authorization header in postman.
 - Send message `POST /messages`: To send a message using this endpoint you need to provide the  `receiverId` and the `message` in the body. You must be authenticated to be able to send a message.
 - Get messages `GET /messages`: You can retrive all messages sent to you using this endpoint
 - Get sent messages `GET /sent`: Retrieve all messages you have sent out.
 - Mark message as read `POST /read-message`: provide the `messageId` in the body of your request to make a ,message as `read`. 
 - Delete user account `DELETE /user`: provide the `userId` in the body of the request. This endpoint deletes a user's account and all of their messages.

To authenticate a request, add an authorization header `Authorization: Bearer <AUTH_TOKEN_HERE>`