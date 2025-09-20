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
};

export default function Tooltip({ boundaryRef, offset = 8, isOpen = true }: TooltipProps) {

    const tooltipRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<Position>({
        top: 0,
        left: 0,
        visibility: "visible",
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

            let top = rect.top - tooltipRect.height - offset;
            let left = rect.left + rect.width / 2 - tooltipRect.width / 2;

            top = Math.max(boundary.top, Math.min(top, boundary.bottom - tooltipRect.height));
            left = Math.max(boundary.left, Math.min(left, boundary.right - tooltipRect.width));

            setPosition({
                top: top + window.scrollY,
                left: left + window.scrollX,
                visibility: "visible",
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

    console.log({ position, card, isOpen });
    if (!isOpen || !card) return null;

    return (
        <motion.div
            ref={tooltipRef}
            key={selectedCardId + "tooltip"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
                background: "#000000c0",
                color: "white",
                padding: "6px 10px",
                visibility: position.visibility,
                borderRadius: "4px",
                fontSize: "0.85rem",
                whiteSpace: "nowrap",
                zIndex: 1000,
            }}
        >
            {TooltipChild()}
        </motion.div>
    );
};
