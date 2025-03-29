import { ReadStationType } from "../../../types/station/ReadStationType";
import { Maps } from "../../Maps/Maps";
import ModalAdmin from '../../../components/modalAdmin/ModalAdmin';
import { StationProps } from "../../../pages/Station/ListStation/ListStation";
import '../shared/TabStyles.css';


interface DetailsStationTabProps {
    station: ReadStationType;
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
