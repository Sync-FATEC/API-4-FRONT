import { ReadStationType } from "../../../types/station/ReadStationType";
import { Maps } from "../../Maps/Maps";
import ModalAdmin from '../../../components/modalAdmin/ModalAdmin';
import { StationProps } from "../../../pages/Station/ListStation/ListStation";
import '../shared/TabStyles.css';


interface DetailsStationTabProps {
    station: ReadStationType;
}

function formatUnixTimestamp(unixTime: number | string): string {
    const date = new Date(Number(unixTime) * 1000); 
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    if (hours === "00" && minutes === "00") {
        return `${day}/${month}/${year}`;
    }

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}


export default function DetailsStationTab({ station }: DetailsStationTabProps) {
    return (
        <div className="station-tab">
            <div className="station-tab__header">
                <h2 className="station-tab__title">Detalhes da estação</h2>

            </div>

            <div className="station-tab__content">
                <div className="station-tab__info">
                    <div className="station-tab__card">
                        <div className="station-tab__card-info">
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
                                <strong>Data da última conexão:</strong> {formatUnixTimestamp(station.DateLastMeasure)}
                            </p>
                            <p className="station-tab__info-item">
                                <strong>Data de Criação:</strong>{" "}
                                {new Date(station.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="station-tab__map">
                    <Maps latitude={Number(station.latitude)} longitude={Number(station.longitude)} />
                </div>
            </div>
        </div>
    );
}
