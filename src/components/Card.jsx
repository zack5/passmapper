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
            <div className="card card-cancel-container">
                <Link to="/" className="card-cancel-button">
                    <motion.button className="card-cancel-button" key={`cancel-${card.id}`}
                        initial={{ opacity: 0.5 }}
                        whileHover={{ scale: 1.1, opacity: 1 }}
                        whileTap={{ scale: 0.9, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <CancelIcon className="card-cancel-icon" />
                    </motion.button>
                </Link>
            </div>
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