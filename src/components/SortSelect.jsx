import Select from 'react-select'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigationData } from './NavigationContext'

import { SORTING_DATA } from '../utils/constants'

import sortIcon from '/assets/sort-icon.png'

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

    return (
        <motion.div className="sort-select-container" 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            { /* Sort button */}
            <motion.button 
                onClick={() => setIsOpen((prev) => !prev)}
                onBlur={() => {
                    setIsOpen(false);
                    setIsHovered(false);
                }}
                animate={{ opacity: (isHovered || isOpen) ? 1 : 0.3 }}
            >
                <img src={sortIcon} alt="sort" />
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
                    />
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    )
}