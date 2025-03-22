import React from 'react';
import ModalAdmin from '../../../components/modalAdmin/ModalAdmin';

export interface ClientProps {
    name: string;
    email: string;
    cpf: string;
    status: string;
    lastUpdate: string;
    id: number;
}

const ListClient: React.FC = () => {

    const data: ClientProps[] = [
        {
            name: 'Client A',
            email: 'clienta@example.com',
            cpf: '123.456.789-00',
            status: 'Active',
            lastUpdate: '2023-01-01',
            id: 1,
        },
        {
            name: 'Client B',
            email: 'clientb@example.com',
            cpf: '987.654.321-00',
            status: 'Inactive',
            lastUpdate: '2023-01-02',
            id: 2,
        },
        {
            name: 'Client C',
            email: 'clientc@example.com',
            cpf: '456.789.123-00',
            status: 'Active',
            lastUpdate: '2023-01-03',
            id: 3,
        },
    ];

    const fields = [
        { key: "name" as keyof ClientProps, label: "Nome" },
        { key: "email" as keyof ClientProps, label: "E-mail" },
        { key: "cpf" as keyof ClientProps, label: "CPF" },
        { key: "status" as keyof ClientProps, label: "Status" },
        { key: "lastUpdate" as keyof ClientProps, label: "Última Atualização" },
    ];

    return (
        <ModalAdmin 
            createlink='/cliente/criar'
            text='clientes'
            listProps={{ data, fields, onDelete: () => {}, onUpdate: () => {}, isEditable: true , detailsLink: '/clientes/editar'}}
            style={1}
        />
    );
};

export default ListClient;