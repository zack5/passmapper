export const getCardLocationString = (card) => {
    return card.Region === card.Country ? card.Region : `${card.Region}, ${card.Country}`
}