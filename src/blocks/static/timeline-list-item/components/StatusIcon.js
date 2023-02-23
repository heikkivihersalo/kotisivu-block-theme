import BuildingIcon from "../icons/buildingIcon";
import CheckIcon from "../icons/checkIcon";
import CircleIcon from "../icons/circleIcon";

const StatusIcon = ({timelineStatus}) => {
    /**
     * Define the default case.
     * @returns {JSX.Element}
     */
    const DefaultIcon = () => {
        return (
            <svg className="timeline-list-item__icon timeline-list-item__icon--default" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="10px" fill="var(--wp--preset--color--background)"/>
            </svg>
        );
    }

    /** 
     * If wrapperName is not defined, return the default case.
     */
    if (!timelineStatus) {
        return <DefaultIcon />;
    }

    /**
     * Return the correct HTML wrapper for element 
     * @returns {JSX.Element}
     */
    switch (timelineStatus) {
        case 'ready':
            return <CheckIcon />
        case 'in-progress':
            return <BuildingIcon />
        case 'coming':
            return <CircleIcon />
        default:
            return <DefaultIcon />
    }
}

export default StatusIcon
