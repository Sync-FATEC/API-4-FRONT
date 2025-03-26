import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./DynamicList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

function DynamicList<T>({
  data,
  fields,
  onDelete,
  onUpdate,
  detailsLink,
  isEditable = detailsLink ? true : false,
  idKey = "id" as keyof T,
  text,
}: ListProps<T>) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigateToDetails = (id: string) => {
    if (detailsLink) {
      navigate(detailsLink + id);
    }
  };

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const gridStyle = {
    gridTemplateColumns: isEditable
      ? `repeat(${fields.length}, 1fr) 100px`
      : `repeat(${fields.length}, 1fr)`,
  };

  const renderMobileCard = (item: T) => (
    <div key={String(item[idKey])} className="mobile-card">
      {fields.map((field) => (
        <div key={String(field.key)} className="mobile-card-field">
          <span className="mobile-card-label">{field.label}:</span>
          <span className="mobile-card-value">{String(item[field.key])}</span>
        </div>
      ))}
      {isEditable && (
        <div className="mobile-card-actions">
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => onUpdate(String(item[idKey]))}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => onDelete(String(item[idKey]))}
          />
          {detailsLink && (
            <FontAwesomeIcon
              icon={faSearch}
              onClick={() => navigateToDetails(String(item[idKey]))}
            />
          )}
        </div>
      )}
    </div>
  );

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
              const filterValue = e.target.value.toLowerCase();
              const filtered = data.filter((item) =>
                fields.some((field) =>
                  String(item[field.key]).toLowerCase().includes(filterValue)
                )
              );
              setFilteredData(filtered);
            }}
          />
        </div>
        <p>
          Total de {text}: {data.length}
        </p>
      </div>
      {isMobile ? (
        <div className="mobile-list">
          {filteredData.map((item) => renderMobileCard(item))}
        </div>
      ) : (
        <div className="list-grid">
          <div className="list-header" style={gridStyle}>
            {fields.map((field) => (
              <div key={String(field.key)} className="list-header-item">
                {field.label}
              </div>
            ))}
            {isEditable && <div className="list-header-item">Ações</div>}
          </div>
          {filteredData.map((item) => (
            <div key={String(item[idKey])} className="list-row" style={gridStyle}>
              {fields.map((field) => (
                <div key={String(field.key)} className="list-cell">
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
                  {detailsLink && (
                    <FontAwesomeIcon
                      icon={faSearch}
                      onClick={() => navigateToDetails(String(item[idKey]))}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DynamicList;
