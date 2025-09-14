import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useCardsData } from '../components/CardsContext';

import CardExpanded from '../components/CardExpanded';
import Stars from '../components/Stars';
import { CARD_EXPANDED_WIDTH, CARD_EXPANDED_HEIGHT } from "../utils/constants";
import { getCardLocationString } from '../utils/utils';
import { CardData } from '../utils/types';

import { FiMapPin } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { useNavigationData } from '../components/NavigationContext';

function getRating(emojiString: string) {
  return emojiString.split('⭐️').length - 1
}

export default function CardDetail() {
  const { setInInspectState, isMobile } = useNavigationData();
  const { id } = useParams();
  const cards = useCardsData();
  const card = cards.find((card: CardData) => card.id === id)

  useEffect(() => {
    setInInspectState(false);
  }, [setInInspectState]);

  if (!card) {
    return <div>Error: unable to find card with id {id}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const staggeredChildVariant = {
    hidden: { y: 5, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: 'easeIn'
      }
    }
  }

  const backButtonX = CARD_EXPANDED_HEIGHT * 2 + (card['Horizontal'] ? 0 : CARD_EXPANDED_WIDTH - CARD_EXPANDED_HEIGHT)

  return (
    <div className="card-detail-page">
      
      <div className="card-detail-content">
        <div className="card-detail-container">
          {isMobile && <>
            <Link to="/" className='card-detail-back'>‹ Map</Link>
            <h1 style={{ marginInline: 'auto', marginTop: '0.15rem', marginBottom: '-2rem' }}>{card.Card}</h1>
          </>}
          {/* Card Image */}
          <AnimatePresence mode="wait">
            <div className="card-detail">
              <CardExpanded card={card} />
            </div>

          </AnimatePresence>

          {/* Card Info Text */}
          <AnimatePresence mode="wait">
            <motion.div
              className="card-detail-info"
              key={`card-detail-info-${card.id}`}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >

              {/* Acquisition */}
              <motion.div variants={staggeredChildVariant} className="card-detail-info-section">
                {!isMobile && <> 
                  <h1>{card.Card}</h1>
                  <Link to="/" className='card-detail-back'>‹ Map</Link>
                </>}
                <div className="card-detail-info-row">
                  <FiMapPin size={20} />
                  <h2>{getCardLocationString(card)}</h2>
                </div>
                <div className="card-detail-info-row">
                  <FiCalendar size={20} />
                  <h2>{card['Date Obtained']}</h2>
                </div>
                <p>{card['Acquisition Story']}</p>
              </motion.div>

              {/* Design */}
              <motion.div variants={staggeredChildVariant} className="card-detail-info-section">
                <div className="card-detail-info-row">
                  <h2>Card Design:</h2>
                  <Stars rating={getRating(card['Card Design'])} />
                </div>
                <p>{card['Design Notes']}</p>
              </motion.div>

              {/* Transit System */}
              <motion.div variants={staggeredChildVariant} className="card-detail-info-section">
                <div className="card-detail-info-row">
                  <h2>Transit System:</h2>
                  <Stars rating={getRating(card['Transit System'])} />
                </div>
                <p>{card['Transit System Notes']}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>

  );
}