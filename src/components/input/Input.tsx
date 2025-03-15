import './Input.css';

interface InputProps {
    label?: string;
    placeholder?: string;
    styleInput?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ label, placeholder, styleInput, value, onChange }: InputProps) {
    const inputClass = `style-input-${styleInput || 1}`;
    return (
        <div className="input-container">
            <div className={inputClass}>
                {label && <label htmlFor="name">{label}</label>}
                <input type="text" id="name" placeholder={placeholder} value={value} onChange={onChange} />
            </div>
        </div>
    );
}