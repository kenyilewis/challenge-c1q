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

export interface ICardService {
  getCard(token: string | undefined): Promise<ICardResponse | null>;
  createCard(data: ICard): Promise<string | undefined>;
}

export interface ICardRepository {
  getCard(token: string | undefined): Promise<ICardResponse | null>
  createCard(data: ICard): Promise<ICard>;
}

export type ICardResponse = Partial<Omit<ICard, 'created_at' | 'cvv' | '_id'>>;