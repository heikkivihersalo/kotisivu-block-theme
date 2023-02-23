const DotsIcon = () => {
    return (
        <svg className="timeline-list-item__dots" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="90" r="5px" fill="var(--_color)" />
            <circle cx="50" cy="65" r="5px" fill="var(--_color)" />
            <circle cx="50" cy="40" r="5px" fill="var(--_color)" />
            <circle cx="50" cy="15" r="5px" fill="var(--_color)" />
        </svg>
    )
}

export default DotsIcon;