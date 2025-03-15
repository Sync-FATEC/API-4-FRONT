import './Button.css';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    styleButton?: number;
}

export default function Button({ label, onClick, styleButton }: ButtonProps) {
    const buttonClass = `custom-button custom-button-type-${styleButton || 1}`;
    return (
        <div className='custom-button '>
            <button className={buttonClass} onClick={onClick}>
                {label}
            </button>
        </div>
    );
}