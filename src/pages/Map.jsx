import { useEffect, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useCardsData } from '../components/CardsContext';
import { useNavigationData } from '../components/NavigationContext';

import mapPinIcon from '/assets/map-pin-icon.png';
import continentMapping from '/data/country_to_continent.json';

const CONTINENT_TRANSFORMS = {
  "North America": {
    translateX: 780,
    translateY: 350,
    scale: 3,
  },
  "Europe": {
    translateX: 160,
    translateY: 900,
    scale: 6,
  },
  "Oceania": {
    translateX: -940,
    translateY: -350,
    scale: 3,
  },
}

export default function Map() {
  const timeoutId = useRef(null);
  const [continentHovered, setContinentHovered] = useState(null);
  const [continentSelected, setContinentSelected] = useState(null);


  const cards = useCardsData();
  const { selectedCardId, setSelectedCardId } = useNavigationData()

  function handleMouseEnter(geo) {
    const currentContinent = continentMapping[geo.id];
    if (!(currentContinent in CONTINENT_TRANSFORMS)) {
      return;
    }

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    if (currentContinent && currentContinent !== continentHovered) {
      setContinentHovered(currentContinent);
    }
  }

  function handleMouseLeave() {
    timeoutId.current = setTimeout(() => {
      setContinentHovered(null);
    }, 50);
  }

  function handleMouseClick() {
    console.log(continentSelected, continentHovered)
    if (continentSelected) {
      setContinentSelected(null);
    } else {
      setContinentSelected(continentHovered);
    }
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
        onClick={() => handleMouseClick()}
      >
        <ComposableMap
          continent={continentHovered}
          viewBox="30 68 800 415"
        >
          <motion.g
            animate={{
              translateX: CONTINENT_TRANSFORMS[continentSelected]?.translateX || 0,
              translateY: CONTINENT_TRANSFORMS[continentSelected]?.translateY || 0,
              scale: CONTINENT_TRANSFORMS[continentSelected]?.scale || 1,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Geographies geography={"/map.json"}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const fillColor = (
                    (!continentSelected && continentHovered === continentMapping[geo.id])
                    || continentSelected === continentMapping[geo.id]) ? "#b1b1b1" : "#ccc";
                  const commonStyle = { fill: fillColor, transition: "fill 0.5s" };
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => handleMouseEnter(geo)}
                      onMouseLeave={() => handleMouseLeave()}
                      onClick={() => handleMouseClick()}
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
                        scale: (selectedCardId === card.id ? 1.5 : 0.9) / (Math.sqrt(CONTINENT_TRANSFORMS[continentSelected]?.scale || 1)),
                        y: selectedCardId === card.id ? -6 : -3,
                      }}
                    >
                      <image href={mapPinIcon} width="16" height="16" x="-8" y="-8" />
                    </motion.g>
                  </Link>
                </Marker>
              ))}
          </motion.g>
        </ComposableMap>
      </motion.div>
    </AnimatePresence>
  )
}