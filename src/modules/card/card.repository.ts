import { Model } from 'mongoose';
import { ICard, ICardRepository } from './interface/index';

export class CardRepository implements ICardRepository {
  private static instance: CardRepository | null = null;

  constructor(
    private readonly _model: Model<ICard>,
  ) { }

  getCard(token_id: string) {
    console.info('getAll Repository');
    return this._model.find({ id: token_id });
  }

  createCard(data: Required<ICard>): Promise<ICard> {
    console.info('createCard Repository');
    return this._model.create(data);
  }

  // static getInstance(): CardRepository {
  //   if (!this.instance) {
  //     this.instance = new CardRepository(instance);
  //   }
  //   return this.instance;
  // }
}
