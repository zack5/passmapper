import { Link, useLocation, useParams } from "react-router-dom";

import { useNavigationData } from "./NavigationContext";

import { motion } from "framer-motion";

import { CardData } from "../utils/types";

export default function Card({ card, index, selectedCardIndex }: {
    card: CardData,
    index: number,
    selectedCardIndex: number
}) {
    const { id } = useParams();
    const location = useLocation();

    const { selectedCardId, setSelectedCardId, isDraggingCardHolder, inspectingCardId, setInspectingCardId, isMobile } = useNavigationData()
    const isSelected = card.id == selectedCardId

    const isInDetailView = id === card.id
    if (isInDetailView) {
        return (
            <div className="card"></div>
        )
    }

    function onMouseEnter() {
        setSelectedCardId(card.id)
    }

    function onMouseLeave() {
    }
    
    const handleClick = (e: React.MouseEvent) => {
        if (isDraggingCardHolder) {
            e.preventDefault();
            return;
        }

        if (isMobile && location.pathname === "/") {
            if (inspectingCardId !== card.id) {
                e.preventDefault();
                setInspectingCardId(card.id);
                return;
            }
        }
    };


    const zIndex = (index != undefined && selectedCardIndex != undefined)
        ? -1 * Math.abs(index - selectedCardIndex) + 999
        : 999

    return (
        <Link to={`${card.id}`}
            onDragStart={(e) => e.preventDefault()}
            onClick={handleClick}
        >
            <motion.img
                layoutId={`card-${card.id}`}
                className="card card-shadow"
                src={`/cards/${card.id}.` + (card.id === "metrocard" ? "png" : "jpg")}
                alt={card.Card}
                style={{
                    zIndex: zIndex,
                }}
                initial={{ 
                    scale: 1,
                    y: 0
                }}
                animate={{
                    scale: (isSelected) ? 1.2 : 1,
                    y: (isSelected) ? 6 : 0,
                }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        </Link>
    )
}