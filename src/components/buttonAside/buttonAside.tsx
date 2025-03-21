import './buttonAside.css'
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface ButtonAsideProps {
    icon: any;
    link: string;
    onClick?: () => void;
}

export default function ButtonAside(props: ButtonAsideProps) {
    return (
        <button onClick={props.onClick} className='buttonAside'><FontAwesomeIcon icon={props.icon}/></button>
    )
}