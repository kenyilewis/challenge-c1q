# Serverless Framework Node HTTP API with MongoDB

This project is an HTTP API developed with the Serverless Framework and Node.js that leverages a MongoDB database. Additionally, it can be run locally using the `serverless-offline` plugin.

## Prerequisites

Before getting started, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Serverless Framework](https://www.serverless.com/)
- [MongoDB](https://www.mongodb.com/)
- [serverless-offline](https://www.npmjs.com/package/serverless-offline)

## Configuration

1. Clone this repository:
   ```bash
   git clone https://github.com/kenyilewis/challenge-c1q.git
   ```
2. Install project dependencies:
   ```
   cd challenge-c1q
   npm install
   ```
Don't need configure environment variables in the serverless.yml. .env file was added.

## Deployment
1. Deploy the API to AWS with the following command:
```
serverless deploy
```
2. Once deployed, obtain the API URL from the command's output.

## Run local execution test
1. Start the tests in local server:
```
npm test
```
## Run eslint 
```
npm run eslint
```

## Local execution
To test the API locally, you can use serverless-offline:
1. Start the local server:
```
npm start
```
2. Access the API using a tool like Postman at http://localhost:3000.

## Usage
 API endpoints
 ```
GET: http://localhost:3000/cards/:id
POST http://localhost:3000/tokens
```

## Contact 
If you have any questions or suggestions, feel free to get in touch with me kenyilewis@yahoo.com