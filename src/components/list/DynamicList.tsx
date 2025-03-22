import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./DynamicList.css";
import { useEffect, useState } from "react";

export interface ListProps<T> {
  data: T[];
  fields: { key: keyof T; label: string }[];
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
  isEditable: boolean;
  detailsLink?: string;
  idKey?: keyof T;
  text?: string;
}

function  DynamicList<T>({
  data,
  fields,
  onDelete,
  onUpdate,
  detailsLink,
  isEditable = detailsLink ? true : false,
  idKey = 'id' as keyof T,
  text,
}: ListProps<T>) {
  const navigateToDetails = () => {
    // Create to navigate to details page
  };

  const [filteredData, setFilteredData] = useState(data);
  
  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  
  // Calcular o estilo do grid com base no número de campos
  const gridStyle = {
    gridTemplateColumns: isEditable 
      ? `repeat(${fields.length}, 1fr) 100px` 
      : `repeat(${fields.length}, 1fr)`
  };

  return (
    <div className="list-container">
      <div className="list-top-header">
        <div className="search-box-container">
          <FontAwesomeIcon icon={faSearch} />
          <input
            className="search-box"
          type="text"
          placeholder={`Pesquisar ${text}`}
          onChange={(e) => {
            data.filter((item) => {
                const filterValue = e.target.value.toLowerCase();
                const filtered = data.filter((item) =>
                fields.some((field) =>
                  String(item[field.key]).toLowerCase().includes(filterValue)
                )
                );
                setFilteredData(filtered);
            });
            }}
          />
        </div>
        <p> Total de {text}: {data.length}</p>
      </div>
      <div className="list-grid">
        <div className="list-header" style={gridStyle}>
          {fields.map((field) => (
            <div key={String(field.key)} className="list-header-item">
              {field.label}
            </div>
          ))}
          {isEditable && <div className="list-header-item">Ações</div>}
        </div>
        {filteredData.map((item, index) => (
          <div key={index} className="list-row" style={gridStyle}>
            {fields.map((field) => (
              <div
                key={String(field.key)}
                className="list-cell"
                onClick={navigateToDetails}
              >
                {String(item[field.key])}
              </div>
            ))}
            {isEditable && (
              <div className="actions-cell">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => onUpdate(String(item[idKey]))}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => onDelete(String(item[idKey]))}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DynamicList;
