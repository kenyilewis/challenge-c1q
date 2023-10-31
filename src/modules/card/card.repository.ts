import { Model } from 'mongoose';
import { ICard, ICardRepository } from './interface/index';

export class CardRepository implements ICardRepository {
  private static instance: CardRepository | null = null;

  constructor(
    private readonly _model: Model<ICard>,
  ) { }

  getCard(token_id: string | undefined): Promise<ICard | null> {
    console.info('getAll Repository');

    const deadLine = new Date();
    deadLine.setMinutes(deadLine.getMinutes() - 15);
    // deadLine.setHours(deadLine.getHours() + 5); //Hora UTC-5

    return this._model.findOne({
      $and: [
        { created_at: { $gte : deadLine } },
        { token_id }
      ]
    },);

  }

  createCard(data: Required<ICard>): Promise<ICard> {
    console.info('createCard Repository');
    return this._model.create(data);
  }

  // TODO: Implement singleton pattern
  // static getInstance(): CardRepository {
  //   if (!this.instance) {
  //     this.instance = new CardRepository(instance);
  //   }
  //   return this.instance;
  // }
}
