import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Select from 'react-select'

import { useCardsData } from '../components/CardsContext'
import Card from '../components/Card'

export default function CardHolder() {
  const [sortingOption, setSortingOption] = useState('location')

  const sortingData = {
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
  }

  const sortingOptions = Object.entries(sortingData).map(([key, value]) => ({
    value: key,
    label: value.label,
  }))
  const currentSortingOption = sortingOptions.find(option => option.value === sortingOption)

  const cards = useCardsData()
  const cardElements = cards
    .sort(sortingData[sortingOption].sortFunction)
    .map((card, index) => {
      return (
        <div key={`small-card-${card.id}`}>
          <Card 
          card={card}
          index={index}
        />
      </div>
    )
  })

  const gridColumnStyle = {
    gridTemplateColumns: `repeat(${cards.length - 1}, minmax(0, max-content)) max-content`
  }

  return (
    <>
      <div className="card-container" style={gridColumnStyle}>
        {cardElements}
      </div>
      <Select value={currentSortingOption} options={sortingOptions} onChange={(e) => setSortingOption(e.value)} isClearable={false} />
      <div className="card-container-child">
        <Outlet />
      </div>
    </>
  );
}