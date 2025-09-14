import { motion } from "framer-motion";

import { CARD_EXPANDED_WIDTH, CARD_EXPANDED_HEIGHT } from "../utils/constants";
import { CardData } from "../utils/types";

export default function CardExpanded({ card }: { card: CardData }) {
    const zIndex = 999

    const key = `detail-card-${card.id}`

    const w = CARD_EXPANDED_WIDTH
    const h = CARD_EXPANDED_HEIGHT
    const offset = (w - h) / 2

    let style = {
        zIndex: zIndex,
        width: w + "px",
        height: h + "px",
        rotate: 0,
        x: 0,
        y: 0,
    }

    if (card.Horizontal) {
        style = {
            ...style,
            rotate: 90,
            x: offset,
            y: offset,
        }
    }

    const containerStyle = {
        width: (card.Horizontal ? h : w) + "px",
        height: (card.Horizontal ? w : h) + "px",
    }

    return (
        <div className="card-expanded-container" style={containerStyle}>
            <motion.img layoutId={`card-${card.id}`} key={key}
                className="card-expanded card-shadow"
                src={`/cards/${card.id}.` + (card.id === "metrocard" ? "png" : "jpg")}
                alt={card.Card}
                style={style}
            />
        </div>
    )
}