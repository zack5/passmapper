import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useCardsData } from '../components/CardsContext'

import Card from '../components/Card'

export default function CardHolder() {
  const [hoverIndex, setHoverIndex] = useState(0)

  const cards = useCardsData()
  const cardElements = cards.map((card, index) => {
    return <Card key={card.Asset} card={card} index={index} hoverIndex={hoverIndex} onHover={setHoverIndex} />
  })

  const gridColumnStyle = {
    gridTemplateColumns: `repeat(${cards.length - 1}, minmax(0, max-content)) max-content`
  }

  return (
    <>
      <h1>
        Card Holder
      </h1>
      <div className="card-container" style={gridColumnStyle}>
        {cardElements}
      </div>
      <Outlet />
    </>
  );
}