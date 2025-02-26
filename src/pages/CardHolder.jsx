import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useCardsData } from '../components/CardsContext'

import Card from '../components/Card'

export default function CardHolder() {
  const { id } = useParams();
  const hasId = id != undefined;

  const [hoverIndex, setHoverIndex] = useState(0)

  const cards = useCardsData()
  const cardElements = cards.map((card, index) => {
    return (
      <Card 
        card={card}
        index={index}
        hoverIndex={hoverIndex} 
        onHover={setHoverIndex} />
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