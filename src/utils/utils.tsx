import { CardData } from "./types"

export function getCardLocationString(card: CardData) {
    return card.Region === card.Country ? card.Region : `${card.Region}, ${card.Country}`
}

