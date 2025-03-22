import React from 'react';
import ModalAdmin from '../../../components/modalAdmin/ModalAdmin';

export interface StationProps {
    name: string;
    address: string;
    model: string;
    status: string;
    lastUpdate: string;
    id: number;
}

const ListStation: React.FC = () => {

    const data: StationProps[] = [
        {
            name: 'Station A',
            address: '123 Main St',
            model: 'Model X',
            status: 'Active',
            lastUpdate: '2023-01-01',
            id: 1,
        },
        {
            name: 'Station B',
            address: '456 Elm St',
            model: 'Model Y',
            status: 'Inactive',
            lastUpdate: '2023-01-02',
            id: 2,
        },
        {
            name: 'Station C',
            address: '789 Oak St',
            model: 'Model Z',
            status: 'Active',
            lastUpdate: '2023-01-03',
            id: 3,
        },
    ];

    const fields = [
        { key: "name" as keyof StationProps, label: "Nome" },
        { key: "address" as keyof StationProps, label: "Endereço" },
        { key: "model" as keyof StationProps, label: "Modelo" },
        { key: "status" as keyof StationProps, label: "Status" },
        { key: "lastUpdate" as keyof StationProps, label: "Última Atualização" },
    ]

    return (
        <ModalAdmin 
            createlink='/station/create'
            text='estaçôes'
            listProps={{ data, fields, onDelete: () => {}, onUpdate: () => {}, isEditable: true }}
            style={1}
        />
    );
};

export default ListStation;