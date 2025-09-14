import { Marker } from "react-simple-maps";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useNavigationData } from './NavigationContext';
import { getCardLocationString } from '../utils/utils';
import { CardData } from '../utils/types';

interface MapMarkerProps {
    card: CardData;
    mapPinHovered: boolean;
    setMapPinHovered: React.Dispatch<React.SetStateAction<boolean>>;
    hasActivePin: boolean;
    zoom: number; // Add zoom to props
}

export default function MapMarker({
    card,
    mapPinHovered,
    setMapPinHovered,
    hasActivePin,
    zoom, // Destructure zoom
}: MapMarkerProps) {
    const { selectedCardId, setSelectedCardId, inInspectState, setInInspectState, isMobile } = useNavigationData();

    return (
        <Marker
            key={card.Card}
            coordinates={card.Coordinates}
            onClick={(event) => { event.stopPropagation(); }}
            onMouseEnter={() => setMapPinHovered(true)}
            onMouseLeave={() => setMapPinHovered(false)}
            data-tooltip-id={selectedCardId === card.id ? `marker` : null}
            data-tooltip-content={isMobile ? undefined : getCardLocationString(card)}
        >
            <Link
                to={`${card.id}`}
                onClick={(event) => {
                    if (isMobile) {
                        setInInspectState(true);
                        setSelectedCardId(card.id);
                        event.preventDefault();
                    }
                }}
                onMouseEnter={() => setSelectedCardId(card.id)}
            >
                <motion.g
                    fill="var(--color-accent)"
                    animate={{
                        scale: (hasActivePin && selectedCardId === card.id ? 1.5 : 1.2) / zoom,
                    }}
                    transformTemplate={(latest, generated) => {
                        // Move anchor point to bottom (path is 20px tall)
                        return `
                        translate(0px, 10px)
                        ${generated}
                        translate(0px, -10px)
                        `;
                    }}
                >
                    <path d="M0 0 C5.3 -4.7 8 -8.7 8 -11.7 a8 8 0 1 0 -16 0 c0 3 2.7 6.9 8 11.7 z" />
                    <circle fill="#fff" className="map-pin-circle" cx="0" cy="-12" r="3" />
                </motion.g>
            </Link>
        </Marker>
    );
}