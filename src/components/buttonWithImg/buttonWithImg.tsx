import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './butonWithImg.css'

interface ButtonWithImgProps {
    icon: any;
    text: string;
    link: string;
}

export default function ButtonWithImg(props: ButtonWithImgProps) {
  return (
    <a className="butonWithImg" href={props.link}>
      <FontAwesomeIcon icon={props.icon} /> {props.text}
    </a>
  );
}
