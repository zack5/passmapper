import starIcon from '/assets/star-icon.png'

export default function Stars({ rating }) {
    const elements = new Array(5).fill(null).map((_, index) => {
        const isFilled = index < rating;
        return <img src={starIcon} alt="Star" key={index} className={isFilled ? 'star-filled' : 'star-empty'} />
    })
    
    return (
        <div className="stars">
            {elements}
        </div>
    )
}