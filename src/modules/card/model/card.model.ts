import { Schema, model } from 'mongoose';
import { ICard } from '../interface';

const cardSchema = new Schema<ICard>({
    name: { type: String, required: true },
    number: { type: String, required: true },
    cvc: { type: String, required: true },
    expirationDate: { type: String, required: true },
    token: { type: String, required: false }
  });
  
  export default model<ICard>('Card', cardSchema);