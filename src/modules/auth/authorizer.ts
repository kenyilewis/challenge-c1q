import { APIGatewayEvent, Context } from "aws-lambda";
import { handlerError } from "../utils";
import 'dotenv/config'

const clientPk = process.env.CLIENT_PK

export const authorizerHandler = async (event: APIGatewayEvent): Promise<Object> => {

  const { authorization } = event.headers
  if (!authorization) {
    handlerError({
      status: 400,
      error: 'bad_request',
      message: 'Missing authorization header',
    });
  }

  const bearerToken = authorization?.split(" ")[1];
  if (bearerToken !== clientPk) {
    handlerError({
      status: 403,
      error: 'forbidden',
      message: 'Invalid authorization token - Forbidden',
    });
  }

  // TODO: Create policyDocument dinamically based on the resource, and implement custom authorizer
  return {
    principalId: 'clientPk',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  }



}
