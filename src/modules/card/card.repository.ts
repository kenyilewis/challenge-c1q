import type { Model } from 'mongoose';
import type { ICard, ICardRepository } from './interface/index';

export class CardRepository implements ICardRepository {
  // private static instance: CardRepository | null = null;

  constructor(private readonly _model: Model<ICard>) {}

  async getCard(tokenId: string | undefined): Promise<ICard | null> {
    console.info('getAll Repository');

    const deadLine = new Date();
    deadLine.setMinutes(deadLine.getMinutes() - 15);
    // deadLine.setHours(deadLine.getHours() + 5); //Hora UTC-5

    return await this._model.findOne({
      $and: [{ created_at: { $gte: deadLine } }, { token_id: tokenId }]
    });
  }

  async createCard(data: Required<ICard>): Promise<ICard> {
    console.info('createCard Repository');
    return await this._model.create(data);
  }

  // TODO: Implement singleton pattern
  // static getInstance(): CardRepository {
  //   if (!this.instance) {
  //     this.instance = new CardRepository(instance);
  //   }
  //   return this.instance;
  // }
}
