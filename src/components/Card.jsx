import { Link } from "react-router-dom";

import { motion } from "framer-motion";

export default function Card({ card, index, hoverIndex, onHover, isStatic, key }) {
    const isHovered = index === hoverIndex

    function onMouseEnter() {
        if (onHover && !isStatic) 
            onHover(index)
    }

    function onMouseLeave() {
    }

    const zIndex = (index != undefined && hoverIndex != undefined) 
        ? -1 * Math.abs(index - hoverIndex) + 999
        : 999

    const width = isStatic ? '197px' : '81px'
    const height = isStatic ? '313px' : '128px'
    const borderRadius = isStatic ? '13px' : '6px'

    return (
        <motion.div key={key ? key : `card-${card.id}`} layoutId={`card-${card.id}`}>
            <Link to={`${card.id}`}>
                <motion.img
                    className="card"
                    src={`/cards/${card.id}.jpg`}
                    alt={card.name}
                    style={{
                        zIndex: zIndex,
                        width: width,
                        height: height,
                        borderRadius: borderRadius
                    }}
                    // initial={{ scale: 1 }}
                    // animate={{
                    //     scale: (isHovered && !isStatic) ? 1.1 : 1,
                    // }}
                    // transition={{ duration: 0.3, type: 'spring' }}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            </Link>
        </motion.div>
    )
}