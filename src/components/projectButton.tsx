import './projectButton.css';

type ProjectButtonProps = {
    icon?: string;
    label: string;
    description?: string;
    onClick: () => void;
    className?: string;
};

export default function ProjectButton({ icon, label, description='', onClick, className = 'project-button' }: ProjectButtonProps) {
    return (
        <div className="project-button-div">
            <button className={className} onClick={onClick}>
                {icon && <img src={icon} alt={`${label} icon`} className="project-icon" />}
                <h2>{label}</h2>
                <p>{description}</p>
            </button>
        </div>
    );
}