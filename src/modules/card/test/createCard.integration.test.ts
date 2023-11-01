import { APIGatewayEvent, Context } from "aws-lambda";
import { createCardHandler } from '../use-cases/createCard';
import 'dotenv/config'

// jest.mock('../use-cases/createCard');

export const createCard = async () => {
  describe('Create Card', () => {
    it('it should fail with 403 if token is invalid', async () => {
      const event: APIGatewayEvent = {
        headers: {
          authorization: `Bearer 1234567890`,
        },
        body: JSON.stringify({
          card_number: "5478837211184178",
          cvv: "123",
          expiration_month: "01",
          expiration_year: "2024",
          email: "kenghis@gmail.com",
        }),
      } as any;

      const context = {
        callbackWaitsForEmptyEventLoop: false,
      } as Context;

      const card = await createCardHandler(event, context);
      expect(card.statusCode).toEqual(403);
    });

    it('it should fail with 400 if card number is wrong', async () => {
      const event: APIGatewayEvent = {
        headers: {
          authorization: `Bearer ${process.env.CLIENT_PK}`,
        },
        body: JSON.stringify({
          card_number: "5478837211180001",
          cvv: "123",
          expiration_month: "01",
          expiration_year: "2024",
          email: "kenghis@gmail.com",
        }),
      } as any;

      const context = {
        callbackWaitsForEmptyEventLoop: false,
      } as Context;

      const card = await createCardHandler(event, context);
      expect(card.statusCode).toEqual(400);
    });

    it('it should fail with 400 if expiration month property is wrong', async () => {
      const event: APIGatewayEvent = {
        headers: {
          authorization: `Bearer ${process.env.CLIENT_PK}`,
        },
        body: JSON.stringify({
          card_number: "5478837211184178",
          cvv: "123",
          expiration_month: "13",
          expiration_year: "2024",
          email: "kenghis@gmail.com",
        }),
      } as any;

      const context = {
        callbackWaitsForEmptyEventLoop: false,
      } as Context;

      const card = await createCardHandler(event, context);
      expect(card.statusCode).toEqual(400);
    });

    it('it should fail with 400 if expiration year property is wrong', async () => {
      const event: APIGatewayEvent = {
        headers: {
          authorization: `Bearer ${process.env.CLIENT_PK}`,
        },
        body: JSON.stringify({
          card_number: "5478837211184178",
          cvv: "123",
          expiration_month: "12",
          expiration_year: "2032",
          email: "kenghis@gmail.com",
        }),
      } as any;

      const context = {
        callbackWaitsForEmptyEventLoop: false,
      } as Context;

      const card = await createCardHandler(event, context);
      expect(card.statusCode).toEqual(400);
    });

    it('it should fail with 400 if email property is invalid', async () => {
      const event: APIGatewayEvent = {
        headers: {
          authorization: `Bearer ${process.env.CLIENT_PK}`,
        },
        body: JSON.stringify({
          card_number: "5478837211184178",
          cvv: "123",
          expiration_month: "12",
          expiration_year: "2024",
          email: "kenghis@gmail.es",
        }),
      } as any;

      const context = {
        callbackWaitsForEmptyEventLoop: false,
      } as Context;

      const card = await createCardHandler(event, context);
      expect(card.statusCode).toEqual(400);
    });

    it('it should fail with 400 if card expiration date is due', async () => {
      const event: APIGatewayEvent = {
        headers: {
          authorization: `Bearer ${process.env.CLIENT_PK}`,
        },
        body: JSON.stringify({
          card_number: "5478837211184178",
          cvv: "123",
          expiration_month: "10",
          expiration_year: "2023",
          email: "kenghis@gmail.com",
        }),
      } as any;

      const context = {
        callbackWaitsForEmptyEventLoop: false,
      } as Context;

      const card = await createCardHandler(event, context);
      console.log(">>>>", card);
      expect(card.statusCode).toEqual(400);
    });

    it('it should pass with 201', async () => {
      const event: APIGatewayEvent = {
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

      const card = await createCardHandler(event, context);
      const body = JSON.parse(card.body);
      expect(card.statusCode).toEqual(201);
      expect(body).toHaveProperty("token");
    });
  })
}