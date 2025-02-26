import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useCardsData } from '../components/CardsContext';
import { useNavigationData } from '../components/NavigationContext';
export default function Map() {
  const cards = useCardsData();
  const { selectedCardId, setSelectedCardId } = useNavigationData()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="map-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        <ComposableMap
          viewBox="0 68 800 415"
        >
          <Geographies geography={"/map.json"}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>

          {cards.map((card) => (
            <Marker key={card.Card} coordinates={card.Coordinates}>
              <Link to={`${card.id}`} onMouseEnter={() => setSelectedCardId(card.id)}>
                <circle r={3} fill="#003E77" />
                {/* <text x="0" y="0" dy={10} textAnchor="middle" fill="#003E77">{card.Card}</text> */}
              </Link>
            </Marker>
          ))}
        </ComposableMap>
      </motion.div>
    </AnimatePresence>
  )
}