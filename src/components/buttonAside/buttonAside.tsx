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
        <>
            <FontAwesomeIcon icon={props.icon} />
            {props.title && <span>{props.title}</span>}
        </>
    );

    if (props.onClick) {
        return (
            <Link 
                to={props.link || '#'}
                onClick={(e) => {
                    e.preventDefault();
                    props.onClick && props.onClick();
                }}
                className={`buttonAside ${props.isActive ? 'active' : ''}`}
                title={props.title}
            >
                {buttonContent}
            </Link>
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