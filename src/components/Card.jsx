import { motion } from "framer-motion";

export default function Card({ card, index, hoverIndex, onHover }) {
    const isHovered = index === hoverIndex

    function onMouseEnter() {
        onHover(index)
    }

    function onMouseLeave() {
    }

    return (
        <motion.img 
            className="card" 
            src={`/cards/${card.Asset}`} 
            alt={card.name} 
            style={{
                zIndex: -1 * Math.abs(index - hoverIndex) + 999
            }}
            initial={{ scale: 1 }}
            animate={{ 
                scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3, type: 'spring' }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    )
}