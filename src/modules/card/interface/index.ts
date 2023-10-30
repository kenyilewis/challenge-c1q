import { Model, Document } from 'mongoose';

export interface IResponse {
  statusCode: number;
  body: string;
}

export interface ICard extends Document {
  name: string;
  number: string;
  cvc: string;
  expirationDate: string;
  token?: string;
}

export interface Itoken extends Document {
  token: string;
}

export interface ICardRepository {
  getAll(): Promise<ICard[] | []>;
  createCard(data: ICard): Promise<ICard>;
}

export interface ICardService {
  getCard(token: string | undefined): Promise<ICard[] | IResponse>;
  createCard(pk: string | undefined, data: ICard): Promise<string | IResponse>;
}
