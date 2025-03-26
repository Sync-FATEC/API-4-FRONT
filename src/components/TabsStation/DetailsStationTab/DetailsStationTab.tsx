import { ReadStationType } from "../../../types/station/ReadStationType";
import { Maps } from "../../Maps/Maps";
import '../shared/TabStyles.css';


interface DetailsStationTabProps {
    station: ReadStationType;
}

export default function DetailsStationTab({ station }: DetailsStationTabProps) {
    return (
        <div className="station-tab">
            <h2 className="station-tab__title">Detalhes da estação</h2>
            <div className="station-tab__info">
                <p className="station-tab__info-item">
                    <strong>Nome:</strong> {station.name}
                </p>
                <p className="station-tab__info-item">
                    <strong>UUID:</strong> {station.uuid}
                </p>
                <p className="station-tab__info-item">
                    <strong>Latitude:</strong> {station.latitude}
                </p>
                <p className="station-tab__info-item">
                    <strong>Longitude:</strong> {station.longitude}
                </p>
                <p className="station-tab__info-item">
                    <strong>Data de Criação:</strong>{" "}
                    {new Date(station.createdAt).toLocaleDateString()}
                </p>
            </div>
            <div className="station-tab__map">
                <Maps latitude={Number(station.latitude)} longitude={Number(station.longitude)} />
            </div>
        </div>
    );
}
