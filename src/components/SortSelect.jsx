import Select from 'react-select'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigationData } from './NavigationContext'

import { SORTING_DATA } from '../utils/constants'

import { LuArrowUpDown } from "react-icons/lu";

export default function SortSelect() {
    const { sortingOption, setSortingOption } = useNavigationData();

    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const sortingOptions = Object.entries(SORTING_DATA).map(([key, value]) => ({
        value: key,
        label: value.label,
    }))
    const currentSortingOption = sortingOptions.find(option => option.value === sortingOption)

    useEffect(() => {
        if (isHovered) {
            setIsOpen(true);
        } else {
            const timeout = setTimeout(() => {
                if (!isHovered) {
                    setIsOpen(false);
                }
            }, 1000);
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [isHovered]);

    function onMouseEnter() {
        setIsHovered(true);
    }

    function onMouseLeave() {
        setIsHovered(false);
    }

    const style = {
        control: (base, state) => ({
          ...base,
          backgroundColor: "var(--color-background)",
          borderColor: state.isFocused ? "var(--color-accent)" : "#ccc",
          boxShadow: state.isFocused ? "0 0 5px var(--color-accent)" : "none",
          "&:hover": { borderColor: "var(--color-accent)" },
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "var(--color-background)",
        }),
        option: (base, { isFocused, isSelected }) => ({
          ...base,
          backgroundColor: isSelected
            ? "var(--color-accent)"
            : isFocused
                ? "var(--color-sort-select-hover)"
                : "var(--color-background)",
          color: isSelected ? "#fff" : "var(--color-text)",
          "&:hover": {
            backgroundColor: isSelected ? "var(--color-accent)" : "var(--color-sort-select-hover)",
          },
        }),
        singleValue: (base) => ({
          ...base,
          color: "var(--color-text)",
        }),
      };

    return (
        <motion.div className="sort-select-container" 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            { /* Sort button */}
            <motion.button 
                onBlur={() => {
                    setIsHovered(false);
                }}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: (isHovered || isOpen) ? 1 : 0.3 }}
            >
                <LuArrowUpDown size={20} color="var(--color-text)" />
            </motion.button>

            { /* Dropdown menu */}
            <AnimatePresence>
                {isOpen && <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Select
                        value={currentSortingOption}
                        options={sortingOptions}
                        isClearable={false}
                        onChange={(e) => setSortingOption(e.value)}
                        onBlur={() => {
                            setIsHovered(false);
                        }}
                        styles={style}
                    />
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    )
}