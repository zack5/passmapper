import { motion } from "framer-motion";

export default function CardExpanded({ card }) {

    const zIndex = 999

    const key = `detail-card-${card.id}`

    return (
        <motion.img layoutId={`card-${card.id}`} key={key}
            className="card-expanded card-shadow"
            src={`/cards/${card.id}.jpg`}
            alt={card.name}
            style={{
                zIndex: zIndex,
            }}
        />
    )
}