import { Link, useParams } from "react-router-dom";

import { useNavigationData } from "./NavigationContext";

import { motion, AnimatePresence } from "framer-motion";

import { ImCancelCircle } from "react-icons/im";
import { CancelIcon } from "./CancelIcon"
export default function Card({ card, index, selectedCardIndex }) {
    const { id } = useParams();

    const { selectedCardId, setSelectedCardId } = useNavigationData()
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

    const zIndex = (index != undefined && selectedCardIndex != undefined)
        ? -1 * Math.abs(index - selectedCardIndex) + 999
        : 999

    return (
        <Link to={`${card.id}`}>
            <motion.img
                layoutId={`card-${card.id}`}
                className="card card-shadow"
                src={`/cards/${card.id}.` + (card.id === "metrocard" ? "png" : "jpg")}
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