import { Document } from 'mongoose';
export interface IResponse {
  statusCode: number;
  body: string;
}

export interface ICard extends Document {
  card_number: number;
  cvv: number;
  expiration_month: string;
  expiration_year: string;
  email: string;
  token_id?: string;
  created_at?: Date;
}

export interface ICardRepository {
  getCard(token_id: string | undefined);
  createCard(data: ICard): Promise<ICard>;
}

export interface ICardService {
  getCard(token: string | undefined);
  createCard(data: ICard): Promise<string | undefined>;
}
