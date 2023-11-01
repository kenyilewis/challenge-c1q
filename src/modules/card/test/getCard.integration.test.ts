import { APIGatewayEvent, Context } from "aws-lambda";
import { getCardHandler } from '../use-cases/getCard';
import { createCardHandler } from "../use-cases/createCard";
import 'dotenv/config'


export const getCard = async () => {
  describe('Get Card', () => {
    it('it should fail with 403 if token is invalid', async () => {
      const event: APIGatewayEvent = {
        headers: {
          authorization: `Bearer 1234567890`,
        },
      } as any;

      const context = {
        callbackWaitsForEmptyEventLoop: false,
      } as Context;

      const card = await getCardHandler(event, context);
      expect(card.statusCode).toEqual(403);
    });

    it('it should fail with 400 if token id is wrong', async () => {
      const event: APIGatewayEvent = {
        headers: {
          authorization: `Bearer ${process.env.CLIENT_PK}`,
        },
        pathParameters: {
          token: "1234567890"
        }
      } as any;

      const context = {
        callbackWaitsForEmptyEventLoop: false,
      } as Context;

      const card = await getCardHandler(event, context);
      console.log("card", card);
      expect(card.statusCode).toEqual(404);
    });

    it('it should pass with 200 and get a card', async () => {
      const eventCreate: APIGatewayEvent = {
        headers: {
          authorization: `Bearer ${process.env.CLIENT_PK}`,
        },
        body: JSON.stringify({
          card_number: "5478837211184178",
          cvv: "123",
          expiration_month: "01",
          expiration_year: "2025",
          email: "kenghis@gmail.com",
        }),
      } as any;

      const context = {
        callbackWaitsForEmptyEventLoop: false,
      } as Context;

      const cardCreated = await createCardHandler(eventCreate, context);
      const { token } = JSON.parse(cardCreated.body);

      const event: APIGatewayEvent = {
        headers: {
          authorization: `Bearer ${process.env.CLIENT_PK}`,
        },
        pathParameters: {
          token
        }
      } as any;

      const card = await getCardHandler(event, context);
      const data = JSON.parse(card.body);

      expect(card.statusCode).toEqual(200);
      expect(data).toHaveProperty('card_number');
      expect(data).toHaveProperty('expiration_month');
      expect(data).toHaveProperty('expiration_year');
      expect(data).toHaveProperty('email');
    });
  })
}