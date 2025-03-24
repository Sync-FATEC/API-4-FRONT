import './buttonAside.css'
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

interface ButtonAsideProps {
    icon: any;
    link: string;
    onClick?: () => void;
    isActive?: boolean;
    title?: string;
}

export default function ButtonAside(props: ButtonAsideProps) {
    const buttonContent = (
        <FontAwesomeIcon icon={props.icon} />
    );

    if (props.onClick) {
        return (
            <button 
                onClick={props.onClick} 
                className={`buttonAside ${props.isActive ? 'active' : ''}`}
                title={props.title}
            >
                {buttonContent}
            </button>
        );
    }

    return (
        <Link 
            to={props.link} 
            className={`buttonAside ${props.isActive ? 'active' : ''}`}
            title={props.title}
        >
            {buttonContent}
        </Link>
    );
}