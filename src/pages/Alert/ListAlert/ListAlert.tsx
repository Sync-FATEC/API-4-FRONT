import React from 'react';
import ModalAdmin from '../../../components/modalAdmin/ModalAdmin';

// filepath: c:\Users\erikc\OneDrive\Área de Trabalho\API.2025.1\API-4-FRONT\src\pages\Alert\ListAlert\ListAlert.tsx

export interface AlertProps {
    title: string;
    description: string;
    severity: string;
    status: string;
    lastUpdate: string;
    id: number;
}

const ListAlert: React.FC = () => {

    const data: AlertProps[] = [
        {
            title: 'Alert A',
            description: 'Description for Alert A',
            severity: 'High',
            status: 'Active',
            lastUpdate: '2023-01-01',
            id: 1,
        },
        {
            title: 'Alert B',
            description: 'Description for Alert B',
            severity: 'Medium',
            status: 'Inactive',
            lastUpdate: '2023-01-02',
            id: 2,
        },
        {
            title: 'Alert C',
            description: 'Description for Alert C',
            severity: 'Low',
            status: 'Active',
            lastUpdate: '2023-01-03',
            id: 3,
        },
    ];

    const fields = [
        { key: "title" as keyof AlertProps, label: "Título" },
        { key: "description" as keyof AlertProps, label: "Descrição" },
        { key: "severity" as keyof AlertProps, label: "Severidade" },
        { key: "status" as keyof AlertProps, label: "Status" },
        { key: "lastUpdate" as keyof AlertProps, label: "Última Atualização" },
    ];

    return (
        <ModalAdmin 
            createlink='/alerta/criar'
            text='alertas'
            listProps={{ data, fields, onDelete: () => {}, onUpdate: () => {}, isEditable: true , detailsLink: '/alertas/editar'}}
            style={1}
        />
    );
};

export default ListAlert;