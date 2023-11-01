import { ICard, ICardRepository, ICardService, ICardResponse } from "./interface";
import { handlerError, validateAndParseCard } from "../utils";
export class CardService implements ICardService {
  constructor(
    private cardRepository: ICardRepository,
  ) { }

  async getCard(token: string | undefined): Promise<ICardResponse | null> {
    console.info("Get card service");
    
    const card = await this.cardRepository.getCard(token);
    if (!card) {
      handlerError({
        status: 404,
        error: 'card_not_found_or_token_expired ',
        message: 'Card not found or token expired',
      })
    }
    const response : ICardResponse = {
      card_number: card?.card_number,
      expiration_month: card?.expiration_month,
      expiration_year: card?.expiration_year,
      email: card?.email,
      token_id: card?.token_id,
    };
    
    return response;
  }

  async createCard(data: ICard): Promise<string | undefined> {
    console.info("Create card service");
    const newCard = await validateAndParseCard(data);
    const cardCreated = await this.cardRepository.createCard(newCard);

    return cardCreated.token_id;
  }
}
