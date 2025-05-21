import './Button.css';

interface ButtonProps {
    label?: string;
    onClick?: () => void;
    styleButton?: number;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    children?: React.ReactNode;
}

export default function Button({ 
    label, 
    onClick, 
    styleButton,
    type = 'button',
    disabled = false,
    children 
}: ButtonProps) {
    const buttonClass = `custom-button custom-button-type-${styleButton || 1}`;
    return (
        <div className='custom-button'>
            <button 
                className={buttonClass} 
                onClick={onClick}
                type={type}
                disabled={disabled}
            >
                {children || label}
            </button>
        </div>
    );
}