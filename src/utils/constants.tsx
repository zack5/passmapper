import { CardData } from "./types"

export const CARD_EXPANDED_WIDTH = 197
export const CARD_EXPANDED_HEIGHT = 313

export const SORTING_DATA = {
    color: {
        label: 'Color',
        sortFunction: (a: CardData, b: CardData) => a.Color - b.Color,
    },
    date: {
        label: 'Date Acquired',
        sortFunction: (a: CardData, b: CardData) => a['Date Obtained'].localeCompare(b['Date Obtained']),
    },
    location: {
        label: 'Location',
        sortFunction: (a: CardData, b: CardData) => a.Coordinates[0] - b.Coordinates[0],
    },
    name: {
        label: 'Name',
        sortFunction: (a: CardData, b: CardData) => a.Card.localeCompare(b.Card),
    },
    design: {
        label: 'Design Ranking',
        sortFunction: (a: CardData, b: CardData) => a['Card Design'].length - b['Card Design'].length,
    },
    transit: {
        label: 'Transit System Ranking',
        sortFunction: (a: CardData, b: CardData) => a['Transit System'].length - b['Transit System'].length,
    }
}
export type SORTING_OPTION = keyof typeof SORTING_DATA;

export const CONTINENT_TRANSFORMS = {
    "": {
        translateX: 0,
        translateY: 0,
        scale: 1,
    },
    "North America": {
        translateX: 780,
        translateY: 350,
        scale: 3,
    },
    "Europe": {
        translateX: 160,
        translateY: 900,
        scale: 6,
    },
    "Oceania": {
        translateX: -940,
        translateY: -350,
        scale: 3,
    },
}
export type CONTINENT = keyof typeof CONTINENT_TRANSFORMS;