import mongoose from 'mongoose';

import { createCard } from '../modules/card/test/createCard.integration.test';
import { getCard } from '../modules/card/test/getCard.integration.test';
import { connectMongoDB } from '../database /mongoDB';

describe('Main', () => {
  beforeAll(async () => {
    await connectMongoDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  /* Card */
  void createCard();
  void getCard();
});
