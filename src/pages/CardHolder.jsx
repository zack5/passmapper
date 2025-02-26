import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Select from 'react-select'

import { useCardsData } from '../components/CardsContext'
import Card from '../components/Card'
import { useNavigationData } from '../components/NavigationContext'
import SortSelect from '../components/SortSelect'

import { SORTING_DATA } from '../utils/constants'

export default function CardHolder() {
  const { sortingOption } = useNavigationData();
  
  const cards = useCardsData()
  const cardElements = cards
    .sort(SORTING_DATA[sortingOption].sortFunction)
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
      <SortSelect />
      <div className="card-container-child">
        <Outlet />
      </div>
    </>
  );
}