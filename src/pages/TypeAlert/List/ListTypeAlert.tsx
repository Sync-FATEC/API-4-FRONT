import React from 'react';
import ModalAdmin from '../../../components/modalAdmin/ModalAdmin';

const ListTypeAlert: React.FC = () => {

    interface TypeAlert {
        id: number;
        name: string;
        value: number;
        mathComparator: string;
        parameter: string;
      }
    
      const data: TypeAlert[] = [
        { id: 1, name: "Alice", value: 10, mathComparator: ">", parameter: "Temperature" },
        { id: 2, name: "Bob", value: 20, mathComparator: "<", parameter: "Pressure" },
        { id: 3, name: "Charlie", value: 30, mathComparator: "=", parameter: "Humidity - B29" },
      ];
        
      const fields = [
        { key: "name" as keyof TypeAlert, label: "Nome" },
        { key: "value" as keyof TypeAlert, label: "Valor" },
        { key: "mathComparator" as keyof TypeAlert, label: "Comparador" },
        { key: "parameter" as keyof TypeAlert, label: "Parâmetro" },
      ];
    
    return (
      <ModalAdmin 
      createlink='/criar-tipo-alerta'
      listProps={{data, fields, onDelete: () => {}, onUpdate: () => {}, isEditable: true}}
      style={1}
      text='Usuários'
      />
    );
};

export default ListTypeAlert;