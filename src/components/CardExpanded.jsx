import { motion } from "framer-motion";

export default function CardExpanded({ card }) {

    const zIndex = 999

    const key = `detail-card-${card.id}`

    const w = 197
    const h = 313
    const offset = (w - h) / 2

    let style = {
        zIndex: zIndex,
        width: w + "px",
        height: h + "px",
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
        width: Math.max(w, h) + "px",
    }

    return (
        <div className="card-expanded-container" style={containerStyle}>
            <motion.img layoutId={`card-${card.id}`} key={key}
                className="card-expanded card-shadow"
                src={`/cards/${card.id}.` + (card.id === "metrocard" ? "png" : "jpg")}
                alt={card.name}
                style={style}
            />
        </div>
    )
}