import './Input.css';

interface InputProps {
    label?: string;
    placeholder?: string;
}

export default function Input({ label, placeholder }: InputProps) {
    return (
        <div className="input-container">
            {label && <label htmlFor="name">{label}</label>}
            <input type="text" id="name" placeholder={placeholder}/>
        </div>
    );
}
