import { Outlet } from 'react-router-dom'

import { useCardsData } from '../components/CardsContext'

import Card from '../components/Card'

export default function CardHolder() {
  const cards = useCardsData()
  const cardElements = cards.map((card, index) => {
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
      <div className="card-container-child">
        <Outlet />
      </div>
    </>
  );
}