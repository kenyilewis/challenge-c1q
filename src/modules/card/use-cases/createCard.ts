import { APIGatewayEvent, Context } from "aws-lambda";

import { CardService } from "../card.service";
import { connectMongoDB } from "../../../../database /mongoDB";
import { CardRepository } from "../card.repository";
import { authorizerHandler } from "../../auth/authorizer";
import { IResponse } from "../interface";
import CardModel from "../model/card.model";

const cardRepository = new CardRepository(CardModel);
const cardService = new CardService(cardRepository);

export const createCardHandler = async (event: APIGatewayEvent, context: Context): Promise<IResponse> => {
  console.info('Create card');
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await authorizerHandler(event);
    await connectMongoDB();

    const cardData = event?.body && JSON.parse(event.body)
    const token_id = await cardService.createCard(cardData);

    return {
      statusCode: 200,
      body: JSON.stringify({ token: token_id }),
    };
  } catch (error) {
    console.error('Error createCardHandler: ', JSON.stringify(error));

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
