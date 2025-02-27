export const COLOR_ACCENT = "#003E77"

export const SORTING_DATA = {
    color: {
        label: 'Color',
        sortFunction: (a, b) => a.Card.localeCompare(b.Card),
    },
    date: {
        label: 'Date Acquired',
        sortFunction: (a, b) => b['Date Obtained'] < a['Date Obtained'],
    },
    location: {
        label: 'Location',
        sortFunction: (a, b) => b.Coordinates[0] < a.Coordinates[0],
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