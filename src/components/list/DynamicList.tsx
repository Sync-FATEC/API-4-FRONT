import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./DynamicList.css";
import { useState } from "react";

export interface ListProps<T> {
  data: T[];
  fields: { key: keyof T; label: string }[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
  isEditable: boolean;
  detailsLink?: string;
}

function  DynamicList<T>({
  data,
  fields,
  onDelete,
  onUpdate,
  detailsLink,
  isEditable = detailsLink ? true : false,
}: ListProps<T>) {
  const navigateToDetails = () => {
    // Create to navigate to details page
  };

  const [filteredData, setFilteredData] = useState(data);

  return (
    <div className="list-container">
      <div className="list-top-header">
        <input
          className="search-box"
          type="text"
          placeholder="Pesquisar"
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
        <p> Total: {data.length}</p>
      </div>
      <div className="list-grid">
        <div className="list-header">
          {fields.map((field) => (
            <div key={String(field.key)} className="list-header-item">
              {field.label}
            </div>
          ))}
          <div className="list-header-item">Ações</div>
        </div>
        {filteredData.map((item, index) => (
          <div key={index} className="list-row">
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
                  onClick={() => onUpdate(index)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => onDelete(index)}
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
