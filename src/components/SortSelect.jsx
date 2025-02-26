import Select from 'react-select'

import { useNavigationData } from './NavigationContext'

import { SORTING_DATA } from '../utils/constants'

export default function SortSelect() {
    const { sortingOption, setSortingOption } = useNavigationData();

    const sortingOptions = Object.entries(SORTING_DATA).map(([key, value]) => ({
        value: key,
        label: value.label,
    }))
    const currentSortingOption = sortingOptions.find(option => option.value === sortingOption)

    return (
        <Select value={currentSortingOption} options={sortingOptions} onChange={(e) => setSortingOption(e.value)} isClearable={false} />
    )
}