import Select from 'react-select'

export default function SortSelect() {
    const options = [
        { value: 'color', label: 'Color' },
        { value: 'date', label: 'Date Acquired' },
        { value: 'region', label: 'Region' },
        { value: 'name', label: 'Name' },
    ]
    
    return (
        <Select options={options} />
    )
}