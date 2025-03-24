import React, { useEffect } from 'react';
import ModalAdmin from '../../../components/modalAdmin/ModalAdmin';
import userService from '../../../api/userService';
import { errorSwal } from '../../../components/swal/errorSwal';
import { useNavigate } from 'react-router-dom';
import { successSwal } from '../../../components/swal/sucessSwal';
import api from '../../../api/api';
import { formatDateAndHour } from '../../../utils/formatDateAndHour';
import formatTrueOrFalse from '../../../utils/formatTrueOrFalse';

export interface UserProps {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: string;
    createdAt: string;
    active: boolean;
}

const ListClient: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState<UserProps[]>([]);

    useEffect(() => {
        const handleReadUsers = async () => {
            try {
                const response = await userService.ListClients();
                const formattedData = response.data.model.map((user: UserProps) => ({
                    ...user,
                    active: formatTrueOrFalse(user.active)
                }));
                setData(formattedData);
            } catch (error) {
                if (!(error as any)?.response?.data?.error.includes("para listar")) {
                    errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
                }
            }
        };
        handleReadUsers();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await userService.deleteUser(id);
            setData(data.filter((user) => user.id !== id));
            successSwal("Usuário deletado com sucesso");
        } catch (error) {
            errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
        }
    }

    const handleUpdate = async (id: string) => {
        navigate(`/usuario/atualizar/${id}`);  
    }

    const fields = [
        { key: "name" as keyof UserProps, label: "Nome" },
        { key: "email" as keyof UserProps, label: "E-mail" },
        { key: "cpf" as keyof UserProps, label: "CPF" },
        { key: "role" as keyof UserProps, label: "Função" },
        { key: "active" as keyof UserProps, label: "Ativo" },
    ];

    return (
        <ModalAdmin 
            createlink='/usuario/criar'
            text='usuários'
            listProps={{ 
              data, 
              fields, 
              onDelete: handleDelete, 
              onUpdate: handleUpdate, 
              isEditable: true,
              idKey: 'id' as keyof UserProps 
            }}
            style={1}
        />
    );
};

export default ListClient;
