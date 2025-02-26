import { Link, useParams } from "react-router-dom";

import { useCardsData } from "./CardsContext";
import { useNavigationData } from "./NavigationContext";

import { motion } from "framer-motion";

export default function Card({ card, index }) {
    const { id } = useParams();

    const isInDetailView = id === card.id
    if (isInDetailView) {
        return <div className="card" />
    }
    
    const { selectedCardId, setSelectedCardId } = useNavigationData()
    const isSelected = card.id == selectedCardId

    const cards = useCardsData()
    const selectedCardIndex = cards.findIndex(card => card.id === selectedCardId)

    function onMouseEnter() {
        setSelectedCardId(card.id)
    }

    function onMouseLeave() {
    }

    const zIndex = (index != undefined && selectedCardIndex != undefined) 
        ? -1 * Math.abs(index - selectedCardIndex) + 999
        : 999

    return (
            <Link to={`${card.id}`}>
                <motion.img
                    layoutId={`card-${card.id}`}
                    className="card card-shadow"
                    src={`/cards/${card.id}.jpg`}
                    alt={card.name}
                    style={{
                        zIndex: zIndex,
                    }}
                    initial={{ scale: 1 }}
                    animate={{
                        scale: (isSelected) ? 1.1 : 1,
                    }}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            </Link>
    )
}