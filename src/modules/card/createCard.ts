import { APIGatewayEvent } from "aws-lambda";

import { CardService } from "./card.service";
import { connectMongoDB } from "../../../database /mongoDB";
import { CardRepository } from "./card.repository";
import CardModel from "./model/card.model";
import { ICard, IResponse } from "./interface";

const cardRepository = new CardRepository(CardModel);
const cardService = new CardService(cardRepository);
export const createCardHandler = async (event: APIGatewayEvent) => {
  try {
    await connectMongoDB();
    const { authorization } = event.headers;
    const cardData = event?.body && JSON.parse(event.body)
    console.log("???authorization?", authorization);
    console.log("???cardData?", cardData);
    const response = await cardService.createCard(authorization, cardData);
    return {
      statusCode: 200,
      body: JSON.stringify({ response }),
    };
  } catch (error) {
    console.log('>>>>>E', error);
    const message = error.message || 'Something went wrong';
    return {
      statusCode: 400,
      body: JSON.stringify({ error: message }),
    };
  }
};
