import React, { useEffect } from 'react';
import ModalAdmin from '../../../components/modalAdmin/ModalAdmin';
import { typeParameterService } from '../../../api/typeParameterService';
import { errorSwal } from '../../../components/swal/errorSwal';
import { useNavigate } from 'react-router-dom';
import { successSwal } from '../../../components/swal/sucessSwal';

export interface TypeParameterProps {
    id: string;
    typeJson: string;
    name: string;
    unit: string;
    numberOfDecimalsCases: number;
    factor: number;
    offset: number;
}

const ListTypeParameter: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState<TypeParameterProps[]>([]);

    useEffect(() => {
        const handleReadTypeParameters = async () => {
            try {
                const response = await typeParameterService.listTypeParameters();
                setData(response.data.model);
            } catch (error) {
                if (!(error as any)?.response?.data?.error.includes("para listar")) {
                    errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
                }   
            }
        };
        handleReadTypeParameters();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await typeParameterService.deleteTypeParameter(id);
            setData(data.filter((typeParameter) => typeParameter.id !== id));
            successSwal("Tipo de parâmetro deletado com sucesso");
        } catch (error) {
            errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
        }
    }

    const handleUpdate = async (id: string) => {
        navigate(`/tipo-parametro/atualizar/${id}`);  
    }

    const fields = [
        { key: "typeJson" as keyof TypeParameterProps, label: "Tipo JSON" },
        { key: "name" as keyof TypeParameterProps, label: "Nome" },
        { key: "unit" as keyof TypeParameterProps, label: "Unidade" },
        { key: "numberOfDecimalsCases" as keyof TypeParameterProps, label: "Nº Casas Decimais" },
        { key: "factor" as keyof TypeParameterProps, label: "Fator" },
        { key: "offset" as keyof TypeParameterProps, label: "Offset" },
    ];

    return (
        <ModalAdmin 
            createlink='/tipo-parametro/criar'
            text='tipos de parâmetros'
            listProps={{ 
              data, 
              fields, 
              onDelete: handleDelete, 
              onUpdate: handleUpdate, 
              isEditable: true,
              idKey: 'id' as keyof TypeParameterProps 
            }}
            style={1}
        />
    );
};

export default ListTypeParameter;
