import { useState } from "react";

import { Link, useParams } from "react-router-dom";

import { motion } from "framer-motion";

export default function Card({ card, index, hoverIndex, onHover }) {
    const { id } = useParams();


    const [isAnimating, setIsAnimating] = useState(false);

    if (isAnimating) {
        console.log(card.id)
    }

    const isSelected = id === card.id
    if (isSelected) {
        return <div className="card" />
    }

    const isHovered = index === hoverIndex

    function onMouseEnter() {
        if (onHover) 
            onHover(index)
    }

    function onMouseLeave() {
    }

    const zIndex = (index != undefined && hoverIndex != undefined) 
        ? -1 * Math.abs(index - hoverIndex) + 999
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
                        scale: (isHovered) ? 1.1 : 1,
                    }}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            </Link>
    )
}