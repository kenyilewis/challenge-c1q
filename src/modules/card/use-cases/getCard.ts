import { APIGatewayEvent, Context } from "aws-lambda";

import { CardService } from "../card.service";
import { connectMongoDB } from "../../../../database /mongoDB";
import { CardRepository } from "../card.repository";
import CardModel from "../model/card.model";
import { authorizerHandler } from "../../auth/authorizer";

const cardRepository = new CardRepository(CardModel);
const cardService = new CardService(cardRepository);

export const getCardHandler = async (event: APIGatewayEvent, context: Context) => {
  try {
    await authorizerHandler(event)
    await connectMongoDB();

    const response = await cardService.getCard(event.pathParameters?.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: response }),
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
