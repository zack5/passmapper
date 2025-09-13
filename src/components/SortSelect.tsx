import Select, { StylesConfig } from 'react-select'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigationData } from './NavigationContext'

import { SORTING_DATA, SORTING_OPTION } from '../utils/constants'

import { LuArrowUpDown } from "react-icons/lu";

export default function SortSelect() {
    const { sortingOption, setSortingOption } = useNavigationData();

    type OptionType = {
        value: string;
        label: string;
    };

    const sortingOptions: OptionType[] = Object.entries(SORTING_DATA).map(([key, value]) => ({
        value: key,
        label: value.label,
    }))

    const currentSortingOption = sortingOptions.find(option => option.value === sortingOption)

    type IsMulti = false;
    const style: StylesConfig<OptionType, IsMulti> = {
        control: (base, state) => ({
          ...base,
          backgroundColor: "var(--color-background)",
          border: "none",
          boxShadow: state.isFocused ? "0 0 5px var(--color-accent)" : "none",
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
        <div className="sort-select-container">
            <Select<OptionType, IsMulti>
                value={currentSortingOption}
                options={sortingOptions}
                isClearable={false}
                className="map-control"
                onChange={(e) => setSortingOption(e?.value as SORTING_OPTION)}
                styles={style}
            />
        </div>
    )
}