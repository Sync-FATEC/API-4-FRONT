import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./DynamicList.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";

export interface ListProps<T> {
  data: T[];
  fields: { key: keyof T; label: string }[];
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
  isEditable: boolean;
  isDelete: boolean;
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
  isDelete = detailsLink ? true : false,
  idKey = "id" as keyof T,
  text,
}: ListProps<T>) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const auth = useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
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
    setCurrentPage(1); // Resetar para a primeira página quando os dados mudam
  }, [data]);

  const gridStyle = {
    gridTemplateColumns: (isEditable && auth.user?.role !== undefined) || (isDelete && auth.user?.role === "ADMIN") || detailsLink
      ? `repeat(${fields.length}, 1fr) 100px`
      : `repeat(${fields.length}, 1fr)`,
  };

  // Calcular paginação
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderMobileCard = (item: T) => (
    <div key={String(item[idKey])} className="mobile-card">
      {fields.map((field) => (
        <div key={String(field.key)} className="mobile-card-field">
          <span className="mobile-card-label">{field.label}:</span>
          <span className="mobile-card-value">{String(item[field.key])}</span>
        </div>
      ))}
      {(isEditable && auth.user?.role !== undefined) || (isDelete && auth.user?.role === "ADMIN") || detailsLink ? (
        <div className="mobile-card-actions">
          {isEditable && auth.user?.role !== undefined && (
            <FontAwesomeIcon
              icon={faEdit}
              data-testid="edit-icon"
              onClick={() => onUpdate(String(item[idKey]))}
            />
          )}
          {isDelete && auth.user?.role === "ADMIN" && (
            <FontAwesomeIcon
              icon={faTrash}
              data-testid="delete-icon"
              onClick={() => onDelete(String(item[idKey]))}
            />
          )}
          {detailsLink && (
            <FontAwesomeIcon
              icon={faSearch}
              data-testid="details-icon"
              onClick={() => navigateToDetails(String(item[idKey]))}
            />
          )}
        </div>
      ) : null}
    </div>
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="pagination-container">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Anterior
        </button>
        
        <div className="pagination-info">
          Página {currentPage} de {totalPages}
        </div>
        
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Próximo
        </button>
      </div>
    );
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
              const filterValue = e.target.value.toLowerCase();
              const filtered = data.filter((item) =>
                fields.some((field) =>
                  String(item[field.key]).toLowerCase().includes(filterValue)
                )
              );
              setFilteredData(filtered);
              setCurrentPage(1); // Reset to first page on filter
            }}
          />
        </div>
        <p>
          Total de {text}: {filteredData.length}
        </p>
      </div>
      {isMobile ? (
        <div className="mobile-list">
          {currentItems.map((item) => renderMobileCard(item))}
        </div>
      ) : (
        <div className="list-grid">
          <div className="list-header" style={gridStyle}>
            {fields.map((field) => (
              <div key={String(field.key)} className="list-header-item">
                {field.label}
              </div>
            ))}
            {(isEditable && auth.user?.role !== undefined) || (isDelete && auth.user?.role === "ADMIN") || detailsLink ? (
              <div className="list-header-item">Ações</div>
            ) : null}
          </div>
          {currentItems.map((item) => (
            <div key={String(item[idKey])} className="list-row" style={gridStyle}>
              {fields.map((field) => (
                <div key={String(field.key)} className="list-cell">
                  {String(item[field.key])}
                </div>
              ))}
              {(isEditable && auth.user?.role !== undefined) || (isDelete && auth.user?.role === "ADMIN") || detailsLink ? (
                <div className="actions-cell">
                  {isEditable && auth.user?.role !== undefined && (
                    <FontAwesomeIcon
                      icon={faEdit}
                      data-testid="edit-icon"
                      onClick={() => onUpdate(String(item[idKey]))}
                    />
                  )}
                  {isDelete && auth.user?.role === "ADMIN" && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      data-testid="delete-icon"
                      onClick={() => onDelete(String(item[idKey]))}
                    />
                  )}
                  {detailsLink && (
                    <FontAwesomeIcon
                      icon={faSearch}
                      data-testid="details-icon"
                      onClick={() => navigateToDetails(String(item[idKey]))}
                    />
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
      {renderPagination()}
    </div>
  );
}

export default DynamicList;
