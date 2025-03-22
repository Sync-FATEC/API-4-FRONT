import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './butonWithImg.css'

interface ButtonWithImgProps {
    icon: any;
    text: string;
    link: string;
    style: number;
}

export default function ButtonWithImg(props: ButtonWithImgProps) {

  if (props.style === 1) {
    return (
      <a className="butonWithImg indigo" href={props.link}>
        <FontAwesomeIcon icon={props.icon} /> {props.text}
      </a>
    );
  }

  if (props.style === 2) {
    return (
      <a className="butonWithImg lavender" href={props.link}>
        <FontAwesomeIcon icon={props.icon} /> {props.text}
      </a>
    );
  }
}
