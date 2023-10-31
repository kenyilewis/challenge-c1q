import { ICard, ICardRepository, ICardService, IResponse } from "./interface";
import { validateAndParseCard } from "../utils";
export class CardService implements ICardService {
  constructor(
    private cardRepository: ICardRepository,
  ) { }

  async getCard(token_id: string | undefined): Promise<IResponse> {
    console.log("Get card service");
    const cards = await this.cardRepository.getCard(token_id);
    return cards;
  }

  async createCard(data: ICard): Promise<string | undefined > {

    const newCard = await validateAndParseCard(data);
    const cardCreated = await this.cardRepository.createCard(newCard);
    console.log('cardCreated', cardCreated);
    return cardCreated.token_id;
  }
}
