import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { useCardsData } from '../components/CardsContext';

import Card from '../components/Card';
import Stars from '../components/Stars';

import placeIcon from '/assets/place-icon.png'
import calendarIcon from '/assets/calendar-icon.png'

function getRating(emojiString) {
  return emojiString.split('⭐️').length - 1
}

export default function CardDetail() {
  const { id } = useParams();
  const cards = useCardsData();
  const card = cards.find(card => card.id === id);
  return (
    <div className="card-detail-container">
      <AnimatePresence mode="wait">
        <Card key={`detail-card-${card.id}`} card={card} isStatic={true} />
      </AnimatePresence>

      <div className="card-detail-info">

        {/* Acquisition */}
        <div className="card-detail-info-section">
          <h1>{card.Card}</h1>
          <div className="card-detail-info-row">
            <img src={placeIcon} alt="Place Icon" />
            <h2>{card.Region}</h2>
          </div>
          <div className="card-detail-info-row">
            <img src={calendarIcon} alt="Calendar Icon" />
            <h2>{card['Date Obtained']}</h2>
          </div>
          <p>{card['Acquisition Story']}</p>
        </div>

        {/* Design */}
        <div className="card-detail-info-section">
          <div className="card-detail-info-row">
            <h2>Card Design:</h2>
            <Stars rating={getRating(card['Card Design'])} />
          </div>
          <p>{card['Design Notes']}</p>
        </div>

        {/* Transit System */}
        <div className="card-detail-info-section">
          <div className="card-detail-info-row">
            <h2>Transit System:</h2>
            <Stars rating={getRating(card['Transit System'])} />
          </div>
          <p>{card['Transit System Notes']}</p>
        </div>
      </div>
    </div>
  );
}