import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useCardsData } from "./CardsContext";
import { useNavigationData } from "./NavigationContext";

import { getCardLocationString } from '../utils/utils';

type TooltipProps = {
    boundaryRef?: React.RefObject<HTMLElement>;
    offset?: number;
    isOpen?: boolean;
};

type Position = {
    top: number;
    left: number;
    visibility: "visible" | "hidden";
    placement: "top" | "bottom" | "left" | "right";
};

export default function Tooltip({ boundaryRef, offset = 15, isOpen = true }: TooltipProps) {

    const tooltipRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<Position>({
        top: 0,
        left: 0,
        visibility: "visible",
        placement: "top",
    });

    const cards = useCardsData();
    const { selectedCardId, inspectingCardId, isMobile } = useNavigationData();

    const targetId = isMobile ? inspectingCardId : selectedCardId;
    const card = cards.find((card) => card.id === targetId);
    const [tooltipText, setTooltipText] = useState("");
    const TooltipChild = () => {
        if (!tooltipText) return null;

        if (isMobile) {
            return (
                <Link
                    to={`${targetId}`}
                    style={{ color: "white" }}>
                    {tooltipText + ` ›`}
                </Link>
            );
        } else {
            return (<>{tooltipText}</>);
        }
    }

    useLayoutEffect(() => {
        const target = document.querySelector<HTMLElement>(
            `[data-tooltip-id="marker"]`
        );

        setTooltipText(card ? getCardLocationString(card) : "");

        if (!target) {
            setPosition((prev) => ({ ...prev, visibility: "hidden" }));
            return;
        }

        const updatePosition = () => {
            const rect = target.getBoundingClientRect();
            const tooltipEl = tooltipRef.current;
            if (!tooltipEl) return;

            const boundary =
                boundaryRef?.current?.getBoundingClientRect() ??
                ({
                    top: 0,
                    left: 0,
                    right: window.innerWidth,
                    bottom: window.innerHeight,
                    width: window.innerWidth,
                    height: window.innerHeight,
                } as DOMRect);

            const tooltipRect = tooltipEl.getBoundingClientRect();

            let placement: Position["placement"] = "top";

            // Candidate positions
            const topPos = rect.top - tooltipRect.height - offset;
            const bottomPos = rect.bottom + offset;
            const leftPos = rect.left - tooltipRect.width - offset;
            const rightPos = rect.right + offset;

            // Defaults (try top first)
            let top = topPos;
            let left = rect.left + rect.width / 2 - tooltipRect.width / 2;

            // Check vertical space for top
            if (top < boundary.top) {
                // Not enough room above → try bottom
                if (bottomPos + tooltipRect.height <= boundary.bottom) {
                    placement = "bottom";
                    top = bottomPos;
                }
            }

            // If still clipping vertically, try left/right
            if (placement === "top" || placement === "bottom") {
                if (left < boundary.left) {
                    placement = "right";
                    left = rightPos;
                    top = rect.top + rect.height / 2 - tooltipRect.height / 2;
                } else if (left + tooltipRect.width > boundary.right) {
                    placement = "left";
                    left = leftPos;
                    top = rect.top + rect.height / 2 - tooltipRect.height / 2;
                }
            }

            // Clamp to boundary just in case
            top = Math.max(boundary.top, Math.min(top, boundary.bottom - tooltipRect.height));
            left = Math.max(boundary.left, Math.min(left, boundary.right - tooltipRect.width));

            setPosition({
                top: top + window.scrollY,
                left: left + window.scrollX,
                visibility: "visible",
                placement,
            });


        };

        requestAnimationFrame(updatePosition);

        // Reposition on resize/scroll
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);

        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [boundaryRef, offset, card]);

    if (!isOpen || !card) return null;

    const tooltipColor = "#000000c0";
    const arrowSize = 6;

    const arrowStyles: Record<
        "top" | "bottom" | "left" | "right",
        React.CSSProperties
    > = {
        top: {
            borderLeft: `${arrowSize}px solid transparent`,
            borderRight: `${arrowSize}px solid transparent`,
            borderTop: `${arrowSize}px solid ${tooltipColor}`,
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
        },
        bottom: {
            borderLeft: `${arrowSize}px solid transparent`,
            borderRight: `${arrowSize}px solid transparent`,
            borderBottom: `${arrowSize}px solid ${tooltipColor}`,
            top: -arrowSize,
            left: "50%",
            transform: "translateX(-50%)",
        },
        left: {
            borderTop: `${arrowSize}px solid transparent`,
            borderBottom: `${arrowSize}px solid transparent`,
            borderLeft: `${arrowSize}px solid ${tooltipColor}`,
            top: "50%",
            left: "100%",
            transform: "translateY(-50%)",
        },
        right: {
            borderTop: `${arrowSize}px solid transparent`,
            borderBottom: `${arrowSize}px solid transparent`,
            borderRight: `${arrowSize}px solid ${tooltipColor}`,
            top: "50%",
            left: -arrowSize,
            transform: "translateY(-50%)",
        },
    };

    return (
        <motion.div
            ref={tooltipRef}
            key={selectedCardId + "tooltip"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="tooltip"
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
                background: tooltipColor,
                visibility: position.visibility,
            }}
        >
            {TooltipChild()}
            <div
                style={{
                    position: "absolute",
                    width: 0,
                    height: 0,
                    ...arrowStyles[position.placement],
                }}
            />
        </motion.div>
    );


};
