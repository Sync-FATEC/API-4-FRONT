import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './Select.css';

interface SelectProps {
    label?: string;
    options: { value: string; label: string }[];
    styleSelect?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
}

export default function Select({ label, options, styleSelect, value, onChange, disabled }: SelectProps) {
    const selectClass = `style-select-${styleSelect || 1}`;
    return (
        <div className="select-container">
            <div className={selectClass}>
                {label && <label htmlFor="custom-select">{label}</label>}
                <div className="select-wrapper">
                    <select 
                        id="custom-select" 
                        value={value} 
                        onChange={onChange} 
                        disabled={disabled}
                    >
                        {options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <div className="custom-arrow">
                        <FontAwesomeIcon icon={faCaretDown} className="custom-arrow-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}