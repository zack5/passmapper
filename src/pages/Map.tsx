import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from 'react-tooltip';

import { useCardsData } from '../components/CardsContext';
import { useNavigationData } from '../components/NavigationContext';
import { getCardLocationString } from '../utils/utils';

function useContainerSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

export default function Map() {
  const [mapPinHovered, setMapPinHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useContainerSize(containerRef);

  const cards = useCardsData();
  const { selectedCardId, setSelectedCardId, cardHolderHovered } = useNavigationData();

  const hasActivePin = cardHolderHovered || mapPinHovered;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          ref={containerRef}
          className="map-container"
          style={{ width: "100vw", height: "100vh" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {width > 0 && height > 0 && (
            <ComposableMap
              width={width}
              height={height}
              projectionConfig={{
                scale: Math.min(width, height) / 3.5,
                center: [0, 20],
              }}
            >
              <ZoomableGroup>
                <Geographies geography={"/map.json"}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const commonStyle = { fill: "var(--color-map)", transition: "fill 0.5s" };
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseDown={(event) => event.preventDefault()}
                          style={{
                            default: commonStyle,
                            hover: commonStyle,
                            pressed: commonStyle,
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {cards
                  .sort((a, b) => b.Coordinates[1] - a.Coordinates[1])
                  .map((card) => (
                    <Marker
                      key={card.Card}
                      coordinates={card.Coordinates}
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
                            scale: hasActivePin && selectedCardId === card.id ? 1.2 : 0.7,
                            y: hasActivePin && selectedCardId === card.id ? -18.5 : -16,
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
              </ZoomableGroup>
            </ComposableMap>
          )}
          <Tooltip id={`marker`} isOpen={hasActivePin} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
