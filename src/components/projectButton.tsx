import './projectButton.css';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type ProjectButtonProps = {
    icon?: string;
    label: string;
    description?: string;
    onClick: () => void;
    className?: string;
    iconSize?: string | number;
};

export default function ProjectButton({ icon, label, description='', onClick, className = 'project-button', iconSize }: ProjectButtonProps) {
    const reduceMotion = useReducedMotion();
    return (
        <div className="project-button-div">
            <motion.button
                type="button"
                className={className}
                onClick={onClick}
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
                whileTap={reduceMotion ? undefined : { y: -1, scale: 0.99 }}
                transition={{ duration: 0.22 }}
            >
                <div className="project-card__top">
                    {icon && (
                        <div className="project-icon-wrap" aria-hidden="true">
                            <img
                                src={icon}
                                alt=""
                                className="project-icon"
                                style={iconSize ? { width: iconSize, height: iconSize } : undefined}
                            />
                        </div>
                    )}
                    <div className="project-card__title">
                        <h2>{label}</h2>
                        <span className="project-card__arrow" aria-hidden="true">
                            <ArrowUpRight size={18} />
                        </span>
                    </div>
                </div>

                <p className="project-card__desc">{description}</p>

                <div className="project-card__meta">
                    <span className="pill mono">View project</span>
                </div>
            </motion.button>
        </div>
    );
}