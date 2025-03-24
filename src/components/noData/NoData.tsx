import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NoData.css';
import { faSearch, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
export default function NoData() {
    return (
        <div className="noData-container">
                <FontAwesomeIcon icon={faTriangleExclamation} className="noData-icon" />
                <h1 className="noData-title">Nada para buscar</h1>
                <p className="noData-text">
                    Não há dados para serem exibidos.
                </p>
        </div>
    );
}