import { ICard, ICardRepository, ICardService, IResponse, Itoken } from "./interface";

const pk = process.env.CLIENT_PK

export class CardService implements ICardService {
  constructor(
    private cardRepository: ICardRepository,
  ) { }

  // Lógica de negocio relacionada con card

  async getCard(token: string | undefined): Promise<ICard[] | IResponse> {
    // Validamos que el header Authorization exista
    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing authorization header' }),
      };
    }
    const cards = await this.cardRepository.getAll();
    return cards;
  }

  async createCard(pk: string | undefined, data: ICard): Promise<string | IResponse> {
    if (!pk) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing authorization header' }),
      };
    }
    data.token = pk;
    const card = await this.cardRepository.createCard(data);
    console.log('card', card);
    return 'Card created';
  }
}
