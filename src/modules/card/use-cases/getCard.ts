import { APIGatewayEvent, Context } from "aws-lambda";

import { CardService } from "../card.service";
import { connectMongoDB } from "../../../../database /mongoDB";
import { CardRepository } from "../card.repository";
import { authorizerHandler } from "../../auth/authorizer";
import CardModel from "../model/card.model";
import { IResponse } from "../interface";

const cardRepository = new CardRepository(CardModel);
const cardService = new CardService(cardRepository);

export const getCardHandler = async (event: APIGatewayEvent, context: Context): Promise<IResponse> => {
  console.info('Get card');
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await authorizerHandler(event)
    await connectMongoDB();
    const token = event.pathParameters?.token;
    const card = await cardService.getCard(token);

    return {
      statusCode: 200,
      body: JSON.stringify(card),
    };
  } catch (error) {
    console.error('Error getCardHandler: ', JSON.stringify(error));

    const { status } = error;
    if (status === undefined) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Internal Server Error',
          error: error.message
        })
      };
    }

    return {
      statusCode: status,
      body: JSON.stringify(error)
    };
  }
};
