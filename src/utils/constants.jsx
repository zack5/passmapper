export const CARD_EXPANDED_WIDTH = 197
export const CARD_EXPANDED_HEIGHT = 313

export const COLOR_ACCENT = "#003E77"

export const SORTING_DATA = {
    color: {
        label: 'Color',
        sortFunction: (a, b) => a.Color - b.Color,
    },
    date: {
        label: 'Date Acquired',
        sortFunction: (a, b) => a['Date Obtained'].localeCompare(b['Date Obtained']),
    },
    location: {
        label: 'Location',
        sortFunction: (a, b) => a.Coordinates[0] - b.Coordinates[0],
    },
    name: {
        label: 'Name',
        sortFunction: (a, b) => a.Card.localeCompare(b.Card),
    },
    design: {
        label: 'Design Ranking',
        sortFunction: (a, b) => a['Card Design'].length - b['Card Design'].length,
    },
    transit: {
        label: 'Transit System Ranking',
        sortFunction: (a, b) => a['Transit System'].length - b['Transit System'].length,
    }
}