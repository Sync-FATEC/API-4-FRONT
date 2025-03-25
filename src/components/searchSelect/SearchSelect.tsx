import React, { useEffect, useState } from "react";
import Input from "../input/Input";

interface SearchSelectProps {
  options: string[];
  placeholder?: string;
  onSelect: (selected: string) => void;
  showSearch?: boolean;
  initialValue: string;
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  options,
  placeholder,
  onSelect,
  showSearch = true,
  initialValue,
}) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value;
    if(filter === ""){
      setFilteredOptions(options);
      return;
    }
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  const handleSelect = (option: string) => {
    setValue(option);
    onSelect(option);
    setFilteredOptions(options);
  };

  return (
    <div className="input-container">
      {showSearch && (
        <Input
          disabled={false}
          key={"pipo"}
          label={"Pesquise " + placeholder}
          onChange={handleSearchChange}
          styleInput={2}
        />
      )}
      <select
        className="style-input-2 input-container"
        style={{ fontSize: "1.0rem" }}
        value={value}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option>Selecione um parâmetro</option>
        {options.map((txt) => (
          <option key={txt} value={txt}>
            {txt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchSelect;
