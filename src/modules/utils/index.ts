import { randomBytes } from 'node:crypto';
import validator from 'validator';
import 'dotenv/config'

import { ICard } from '../card/interface';


interface Error {
  status: number;
  error: string;
  message: string;
}

export const handlerError = (error: Error): Error => {
  const errorResponse = new Error();
  errorResponse["status"] = error.status || 500;
  errorResponse["error"] = error.error || 'internal_server_error';
  errorResponse["message"] = error.message;

  throw errorResponse;
};


const createToken = (): string => {
  const characteres = process.env.CHARACTER_SET || "";
  const length = characteres.length;
  const bytes = randomBytes(length);
  let token = '';

  for (let i = 0; i < 16; i++) {
    const byte = bytes.readUInt8(i);
    token += characteres.charAt(byte % length);
  }

  return token;
}

const luhnAlgorithm = (cardNumber: number): boolean => {
  const digits = cardNumber.toString().split('').map(Number).reverse();

  const isValid = digits.reduce((accumulator: number, digit: number, index: number) => {
    if (index % 2 === 1) {
      digit *= 2;
      digit = digit > 9 ? digit - 9 : digit;
    }
    return accumulator + digit;
  }, 0);

  return isValid % 10 === 0;
}

export const validateAndParseCard = async (data: ICard): Promise<ICard> => {

  // TODO mejorar validaciones
  const { card_number, cvv, expiration_month, expiration_year, email } = data;
  //parse data
  data.card_number = Number(card_number);
  data.cvv = Number(cvv);

  data.token_id = createToken();

  if (!luhnAlgorithm(card_number) || !validator.isLength(card_number.toString(), { min: 13, max: 16 })) {
    handlerError({
      status: 400,
      error: 'bad_request',
      message: 'El número de tarjeta no es válido'
    });
  }

  if (!validator.isLength(cvv.toString(), { min: 3, max: 4 }) || !validator.isNumeric(cvv.toString())) {
    handlerError({
      status: 400,
      error: 'bad_request',
      message: 'El cvv no es válido'
    });
  }

  if ((!validator.isAfter(expiration_month, '0') && !validator.isBefore(expiration_month, '13')) || !validator.isLength(expiration_month, { min: 1, max: 2 }) || !validator.isNumeric(expiration_month)) {
    handlerError({
      status: 400,
      error: 'bad_request',
      message: 'El mes de expiración no es válido'
    });
  }

  const yearNow = (new Date().getFullYear() - 1).toString();
  const yearBefore = (new Date().getFullYear() + 6).toString();
  if ((!validator.isAfter(expiration_year, yearNow) || !validator.isBefore(expiration_year, yearBefore)) || !validator.isLength(expiration_year, { min: 4, max: 4 }) || !validator.isNumeric(expiration_year)) {
    handlerError({
      status: 400,
      error: 'bad_request',
      message: 'El año de expiración no es válido'
    });
  }

  const now = new Date() // TODO Add UTC-5 to Peru
  now.setFullYear(now.getFullYear());
  const dateExpiration = new Date(`${expiration_year}-${expiration_month}-01`);
  if (dateExpiration < now) {
    handlerError({
      status: 400,
      error: 'bad_request',
      message: 'La tarjeta está expirada'
    });
  }

  const domain = email.split('@')[1];
  const domains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
  if (!domains.includes(domain) || !validator.isEmail(email)) {
    handlerError({
      status: 400,
      error: 'bad_request',
      message: `El email no es válido, solo se aceptan los dominios ${domains.join(', ')}`
    });
  }

  return data;
}

export const validateToken = (token: string | undefined): void => {
  if (!token) {
    handlerError({
      status: 400,
      error: 'token_not_found',
      message: 'Token not found',
    })
  }
}