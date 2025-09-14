import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'

import { useCardsData } from '../components/CardsContext'
import Card from '../components/Card'
import { useNavigationData } from '../components/NavigationContext'
import SortSelect from '../components/SortSelect'

import { SORTING_DATA } from '../utils/constants'

const MAIN_PADDING = 10
const MIN_HOLDER_WIDTH = 1500

export default function CardHolder() {
  const [screen, setScreen] = useState({ width: window.innerWidth });

  const { sortingOption, selectedCardId, setCardHolderHovered, setIsDraggingCardHolder, triggerScrollCardIntoView, setTriggerScrollCardIntoView } = useNavigationData();
  const cards = useRef(useCardsData());
  const previousSortingOption = useRef('');
  const controls = useAnimation(); // Animation controls for motion.div

  useEffect(() => {
    const handleResize = () => setScreen({ width: window.innerWidth });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleWidth = screen.width - 2 * MAIN_PADDING;
  const constraint = Math.max(0, (MIN_HOLDER_WIDTH - visibleWidth) / 2);
  const constraints = { left: -constraint, right: constraint };
  const startPos = constraint;
  const hasStartPos = screen.width > 0;
  const canDrag = constraint > 0;

  if (sortingOption !== previousSortingOption.current) {
    cards.current = [...cards.current].sort(SORTING_DATA[sortingOption].sortFunction)
    if (previousSortingOption) {
      previousSortingOption.current = sortingOption
    }
  }

  const selectedCardIndex = cards.current.findIndex(card => card.id === selectedCardId);

  // Animate the container to bring the selected card into view
  useEffect(() => {
    if (!triggerScrollCardIntoView) {
      return;
    }
    setTriggerScrollCardIntoView(false);

    if (selectedCardIndex !== -1) {
      const cardWidth = MIN_HOLDER_WIDTH / (cards.current.length + .5);
      const offset = cards.current.length/2 - selectedCardIndex - 0.5;
      const targetX = Math.min(
        Math.max(offset * cardWidth, constraints.left),
        constraints.right
      );

      controls.start({ x: targetX, transition: { type: "spring", stiffness: 300, damping: 30 } });
    }
  }, [triggerScrollCardIntoView]);

  const cardElements = cards.current.map((card, index) => {
    return (
      <div key={`small-card-${card.id}`}>
        <Card
          card={card}
          index={index}
          selectedCardIndex={selectedCardIndex}
        />
      </div>
    )
  });

  const numCards = cards.current.length;
  const gridColumnStyle = {
    gridTemplateColumns: `repeat(${cards.current.length - 1}, minmax(0, max-content)) max-content`,
    maxWidth: `calc(var(--card-width) * ${numCards * 0.9})`, // ensure the cards overlap at least a little bit
    minWidth: MIN_HOLDER_WIDTH + `px`
  };

  return (
    <>
      <div className="card-container-child">
        <Outlet />
      </div>
      <div className="card-container-flexbox">
        <motion.div className="card-container-header">
          {hasStartPos && <motion.div
            key={screen.width} // reset position when screen size changes
            drag={canDrag ? "x" : false}
            dragConstraints={constraints}
            onDragStart={() => setIsDraggingCardHolder(true)}
            onDragEnd={() => setIsDraggingCardHolder(false)}
            initial={{ x: startPos }}
            animate={controls} // Use animation controls
            className="card-container"
            style={gridColumnStyle}
            onMouseEnter={() => setCardHolderHovered(true)}
            onMouseLeave={() => setCardHolderHovered(false)}
          >
            {cardElements}
          </motion.div>}
        </motion.div>
      </div>
      <SortSelect marginLeft={constraint} />
    </>
  );
}