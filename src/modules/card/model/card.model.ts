import { Schema, model } from 'mongoose';
import { ICard } from '../interface';

const cardSchema = new Schema<ICard>({
  card_number: {
    type: Number,
    required: true,
    minlength: 13,
    maxlength: 16,
  },
  cvv: {
    type: Number,
    required: true,
    minlength: 3,
    maxlength: 4
  },
  expiration_month: {
    type: String,
    required: true,
    maxlength: 2,
  },
  expiration_year: {
    type: String,
    required: true,
    maxlength: 4,
  },
  token_id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  }
});

export default model<ICard>('Card', cardSchema);