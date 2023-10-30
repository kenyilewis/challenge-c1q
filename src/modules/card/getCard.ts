import { APIGatewayEvent } from "aws-lambda";

import { CardService } from "./card.service";
import { connectMongoDB } from "../../../database /mongoDB";
import { CardRepository } from "./card.repository";
import CardModel from "./model/card.model";

const cardRepository = new CardRepository(CardModel);
const cardService = new CardService(cardRepository);

export const getCardHandler = async (event: APIGatewayEvent) => {
  try {
    await connectMongoDB();
    const { authorization } = event.headers;

    // const cardData = event?.body 
    console.log('hhhh', event);
    const res = await cardService.getCard(authorization);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: res }),
    };
  } catch (error) {
    console.log(error);
  }
};
