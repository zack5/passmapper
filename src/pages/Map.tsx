import { useEffect, useRef, useState } from 'react';
import { animate, AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from 'react-tooltip';

import MapMarker from '../components/MapMarker';

import { useCardsData } from '../components/CardsContext';
import { useNavigationData } from '../components/NavigationContext';
import { getCardLocationString } from '../utils/utils';

const ZOOM_MAX = 50;
const ZOOM_MIN = 0.75;

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

  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [0, 20],
    zoom: 1,
  });

  const cards = useCardsData();
  const { selectedCardId, cardHolderHovered, inspectingCardId, setInspectingCardId, isMobile, isDraggingCardHolder } = useNavigationData();

  useEffect(() => {
    if (selectedCardId && isMobile) {
      setInspectingCardId(selectedCardId);
    }
  }, []);

  const hasActivePin = !isDraggingCardHolder && (isMobile ? !!inspectingCardId : cardHolderHovered || mapPinHovered);

  const handleZoomTo = (targetZoom: number) => {
    animate(position.zoom, targetZoom, {
      duration: 0.1,
      ease: "easeInOut",
      onUpdate: (latest) => {
        setPosition((p) => ({ ...p, zoom: latest }));
      }
    });
  };

  const handleZoomIn = () =>
    handleZoomTo(Math.min(position.zoom * 1.5, ZOOM_MAX));

  const handleZoomOut = () =>
    handleZoomTo(Math.max(position.zoom / 1.5, ZOOM_MIN));

  const CustomTooltip = () => {
    if (isMobile) {
      console.log({ inspectingCardId, selectedCardId });
      const card = cards.find((card) => card.id === selectedCardId);
      return (
        <Tooltip
          clickable
          id={`marker`}
          isOpen={hasActivePin}
        >
          {card ? (
            <Link to={`${selectedCardId}`} style={{ color: "white" }}>{getCardLocationString(card) + ` ›`}</Link>
          ) : null}
        </Tooltip>
      );
    } else {
      return (
        <Tooltip id={`marker`} isOpen={hasActivePin} />
      );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <>
        <div style={{ height: "50vh" }}>{/* Empty div for layout purposes */}</div>
        <motion.div
          ref={containerRef}
          className="map-container"
          style={{ width: "100vw", height: "100vh" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Map */}
          {width > 0 && height > 0 && (
            <ComposableMap
              width={width}
              height={height}
              projectionConfig={{
                scale: Math.min(width, height) / 3.5,
                center: [0, 20],
              }}
            >
              <ZoomableGroup
                center={position.coordinates}
                zoom={position.zoom}
                minZoom={ZOOM_MIN}
                maxZoom={ZOOM_MAX}
                onMoveStart={() => setInspectingCardId('')}
                onMoveEnd={setPosition}
              >
                <Geographies geography={"/map.json"}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const commonStyle = { fill: "var(--color-map)", transition: "fill 0.5s" };
                      return (
                        <Geography
                          className='geography'
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={(event) => event.preventDefault()}
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
                    <MapMarker
                      key={card.Card + 'marker'}
                      card={card}
                      mapPinHovered={mapPinHovered}
                      setMapPinHovered={setMapPinHovered}
                      hasActivePin={hasActivePin}
                      zoom={position.zoom}
                    />
                  ))}
              </ZoomableGroup>
            </ComposableMap>
          )}

          {/* Zoom controls */}
          <div className="zoom-controls map-control">
            <button onClick={handleZoomIn} aria-label="Zoom in" className="zoom-button">
              +
            </button>
            <button onClick={handleZoomOut} aria-label="Zoom out" className="zoom-button">
              −
            </button>
          </div>

          { /* Tooltip */}
          <CustomTooltip />
        </motion.div>
      </>
    </AnimatePresence>
  );
}
