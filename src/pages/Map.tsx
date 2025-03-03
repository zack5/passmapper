import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from 'react-tooltip';
import { Feature } from 'geojson';

import { useCardsData } from '../components/CardsContext';
import { useNavigationData } from '../components/NavigationContext';
import { CONTINENT_TRANSFORMS, CONTINENT } from '../utils/constants';
import { getCardLocationString } from '../utils/utils';

import continentMapping from '/data/country_to_continent.json';

export default function Map() {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [continentHovered, setContinentHovered] = useState<CONTINENT>('');
  const [mapPinHovered, setMapPinHovered] = useState(false);

  const cards = useCardsData();
  const { selectedCardId, setSelectedCardId, continentSelected, setContinentSelected, cardHolderHovered } = useNavigationData()

  function handleMouseEnter(geo: Feature) {
    const currentContinent = continentMapping[geo?.id || ''];
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
      setContinentHovered('');
    }, 50);
  }

  function handleMouseClick(event: React.MouseEvent<SVGPathElement | HTMLDivElement>) {
    event.stopPropagation();
    if (continentSelected) {
      setContinentSelected('');
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

  const hasActivePin = cardHolderHovered || mapPinHovered

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          className="map-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => handleMouseClick(event)}
        >
          <ComposableMap
            viewBox="30 68 800 415"
          >
            <motion.g
              initial={false}
              animate={{
                translateX: CONTINENT_TRANSFORMS[continentSelected as CONTINENT]?.translateX || 0,
                translateY: CONTINENT_TRANSFORMS[continentSelected as CONTINENT]?.translateY || 0,
                scale: CONTINENT_TRANSFORMS[continentSelected as CONTINENT]?.scale || 1,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Geographies geography={"/map.json"}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const fillColor = (
                      (!continentSelected && continentHovered === continentMapping[geo.id])
                      || continentSelected === continentMapping[geo.id]) ? "var(--color-map-hover)" : "var(--color-map)";
                    const commonStyle = { fill: fillColor, transition: "fill 0.5s" };
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => handleMouseEnter(geo)}
                        onMouseLeave={() => handleMouseLeave()}
                        onClick={(event: React.MouseEvent<SVGPathElement>) => handleMouseClick(event)}
                        onMouseDown={(event) => event.preventDefault()}
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
                    // style={{ transformOrigin: "center" }}
                    onClick={(event) => event.stopPropagation()}
                    onMouseEnter={() => setMapPinHovered(true)}
                    onMouseLeave={() => setMapPinHovered(false)}
                    data-tooltip-id={selectedCardId === card.id ? `marker` : null}
                    data-tooltip-content={getCardLocationString(card)}
                  >
                    <Link
                      to={`${card.id}`}
                      onMouseEnter={() => setSelectedCardId(card.id)}
                    >
                      <motion.g
                        initial={false}
                        animate={{
                          scale: (hasActivePin && selectedCardId === card.id ? 1.2 : 0.7) / (Math.sqrt(CONTINENT_TRANSFORMS[continentSelected]?.scale || 1)),
                          y: (hasActivePin && selectedCardId) === card.id ? -18.5 : -16,
                          x: -12
                        }}
                        fill="var(--color-accent)"
                      >
                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                        <circle fill="#fff" className="map-pin-circle" cx="12" cy="10" r="3" />
                      </motion.g>
                    </Link>
                  </Marker>
                ))}
            </motion.g>
          </ComposableMap>
        </motion.div>
      </AnimatePresence>
      <Tooltip id={`marker`} isOpen={hasActivePin} />
    </>
  )
}