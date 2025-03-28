import React, { useEffect, useState } from 'react';
import ModalAdmin from '../../../components/modalAdmin/ModalAdmin';
import stationService from '../../../api/stationService';
import { errorSwal } from '../../../components/swal/errorSwal';
import { UpdateStationType } from '../../../types/station/UpdateStationType';
import { useNavigate } from 'react-router-dom';
import { successSwal } from '../../../components/swal/sucessSwal';
import { set } from 'date-fns';
import Loading from '../../../components/loading/loading';
export interface StationProps {
    id: string;
    uuid: string;
    name: string;
    latitude: string;
    longitude: string;
}

const ListStation: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState<StationProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleReadStations = async () => {
            try {
                const response = await stationService.listStations();
                setData(response.data.model);
            } catch (error) {
                if (!(error as any)?.response?.data?.error.includes("para listar")) {
                    errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
                }
            } finally {
                setIsLoading(false);
            }
        };
        handleReadStations();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const handleDelete = async (id: string) => {
        try {
            await stationService.deleteStation(id);
            setData(data.filter((station) => station.id !== id));
            successSwal("Estação deletada com sucesso");
        } catch (error) {
            errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
        }
    }

    const handleUpdate = async (id: string) => {
        navigate(`/estacao/atualizar/${id}`);  
    }

    const fields = [
        { key: "uuid" as keyof StationProps, label: "UUID" },
        { key: "name" as keyof StationProps, label: "Nome" },
        { key: "latitude" as keyof StationProps, label: "Latitude" },
        { key: "longitude" as keyof StationProps, label: "Longitude" },
    ];

    return (
        <ModalAdmin 
            createlink='/estacao/criar'
            text='estações'
            haveButton={true}
            listProps={{ 
              data, 
              fields, 
              onDelete: handleDelete, 
              onUpdate: handleUpdate, 
              isEditable: true,
              isDelete: true,
              idKey: 'id' as keyof StationProps, 
              detailsLink: '/estacao/',
            }}
            style={1}
        />
    );
};

export default ListStation;