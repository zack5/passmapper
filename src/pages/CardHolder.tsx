import { useRef } from 'react'
import { Outlet } from 'react-router-dom'

import { useCardsData } from '../components/CardsContext'
import Card from '../components/Card'
import { useNavigationData } from '../components/NavigationContext'
import SortSelect from '../components/SortSelect'

import { SORTING_DATA } from '../utils/constants'

export default function CardHolder() {
  const { sortingOption, selectedCardId, setCardHolderHovered } = useNavigationData();
  
  const cards = useRef(useCardsData())
  const previousSortingOption = useRef('')

  if (sortingOption !== previousSortingOption.current) {
    cards.current = [...cards.current].sort(SORTING_DATA[sortingOption].sortFunction)
    if (previousSortingOption) {
      previousSortingOption.current = sortingOption
    }
  }

  const selectedCardIndex = cards.current.findIndex(card => card.id === selectedCardId)

  const cardElements = cards.current.map((card, index) => {
      return (
        <div key={`small-card-${card.id}`}>
          <Card 
          card={card}
          index={index}
          selectedCardIndex={selectedCardIndex}
        />
      </div>
    )
  })

  const gridColumnStyle = {
    gridTemplateColumns: `repeat(${cards.current.length - 1}, minmax(0, max-content)) max-content`
  }

  return (
    <>
      <div
        className="card-container"
        style={gridColumnStyle}
        onMouseEnter={() => setCardHolderHovered(true)}
        onMouseLeave={() => setCardHolderHovered(false)}
      >
        {cardElements}
      </div>
      <SortSelect />
      <div className="card-container-child">
        <Outlet />
      </div>
    </>
  );
}