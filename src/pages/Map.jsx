import { useEffect, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useCardsData } from '../components/CardsContext';
import { useNavigationData } from '../components/NavigationContext';

import mapPinIcon from '/assets/map-pin-icon.png';
import continentMapping from '/data/country_to_continent.json';


// const MotionComposableMap = motion.create(ComposableMap);
// const AnimatedComposableMap = ({ children, continent }) => {
//   return (
//     <MotionComposableMap
//       animate={{ viewBox: continent === "Europe" ? "0 68 800 415" : "0 0 800 400" }}
//     >
//       {children}
//     </MotionComposableMap>
//   )
// }

export default function Map() {
  const timeoutId = useRef(null);
  const [continent, setContinent] = useState(null);
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  
  const cards = useCardsData();
  const { selectedCardId, setSelectedCardId } = useNavigationData()

  function handleMouseEnter(geo) {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    const currentContinent = continentMapping[geo.id];
    if (currentContinent && currentContinent !== continent) {
      setContinent(currentContinent);
    }
  }

  function handleMouseLeave() {
    timeoutId.current = setTimeout(() => {
      setContinent(null);
    }, 50);
  }

  function handleMouseClick(geo) {
    setIsZoomedIn(prev => !prev);
  }

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="map-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        {/* <motion.svg animate={{ viewBox: continent === "Europe" ? "0 68 800 415" : "0 0 800 400" }}> */}
        <ComposableMap
          continent={continent}
          viewBox="0 68 800 415"
        >
          {/* <ZoomableGroup center={center} zoom={zoom}> */}
            <Geographies geography={"/map.json"}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const fillColor = continent === continentMapping[geo.id] ? "#aad6ff" : "#b1b1b1";
                  const commonStyle = { fill: fillColor, transition: "fill 0.5s" };
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => handleMouseEnter(geo)}
                      onMouseLeave={() => handleMouseLeave()}
                      onMouseClick={() => handleMouseClick(geo)}
                      style={{
                        default: commonStyle,
                        hover: commonStyle,
                        pressed: commonStyle,
                      }}
                    />
                  )
                })
              }
            </Geographies>

            {cards
              .sort((a, b) => b.Coordinates[1] - a.Coordinates[1])
              .map((card) => (
                <Marker
                  key={card.Card}
                  coordinates={card.Coordinates}
                  style={{ transformOrigin: "center" }}
              >
                <Link to={`${card.id}`} onMouseEnter={() => setSelectedCardId(card.id)}>
                  <motion.g
                    animate={{
                      scale: selectedCardId === card.id ? 1.5 : 1,
                      y: selectedCardId === card.id ? -8 : -5,
                    }}
                  >
                    <image href={mapPinIcon} width="16" height="16" x="-8" y="-8" />
                  </motion.g>
                  {/* <text x="0" y="0" dy={10} textAnchor="middle" fill="#003E77">{card.Card}</text> */}
                </Link>
              </Marker>
            ))}
          {/* </ZoomableGroup> */}
        </ComposableMap>
        {/* </motion.svg> */}
      </motion.div>
    </AnimatePresence>
  )
}