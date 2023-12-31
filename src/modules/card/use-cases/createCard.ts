import type { APIGatewayEvent, Context } from 'aws-lambda';

import { CardService } from '../card.service';
import { connectMongoDB } from '../../../database /mongoDB';
import { CardRepository } from '../card.repository';
import { authorizerHandler } from '../../auth/authorizer';
import type { IResponse } from '../interface';
import CardModel from '../model/card.model';

const cardRepository = new CardRepository(CardModel);
const cardService = new CardService(cardRepository);

export const createCardHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<IResponse> => {
  console.info('Create card');
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await authorizerHandler(event);
    await connectMongoDB();

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const cardData = event?.body && JSON.parse(event.body);
    const tokenId = await cardService.createCard(cardData);

    return {
      statusCode: 201,
      body: JSON.stringify({ token: tokenId })
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
