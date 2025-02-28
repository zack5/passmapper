import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useCardsData } from '../components/CardsContext';

import CardExpanded from '../components/CardExpanded';
import Stars from '../components/Stars';

import { FiMapPin } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";

function getRating(emojiString) {
  return emojiString.split('⭐️').length - 1
}

export default function CardDetail() {
  const { id } = useParams();
  const cards = useCardsData();
  const card = cards.find(card => card.id === id);

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
    hidden: {y: 5, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: 'easeIn'
      }
    }
  }

  return (
    <div className="card-detail-page">
      <div className="card-detail-container">
        {/* Card Image */}
        <AnimatePresence mode="wait">
          <CardExpanded card={card} />
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
              <h1>{card.Card}</h1>
              <div className="card-detail-info-row">
                <FiMapPin size={20} />
                <h2>{`${card.Region}, ${card.Country}`}</h2>
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

  );
}