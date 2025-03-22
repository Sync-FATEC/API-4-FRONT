import React from 'react';
import DynamicList from '../../../components/list/DynamicList';

const ListTypeAlert: React.FC = () => {

    interface User {
        id: number;
        name: string;
        email: string;
      }
    
      const users: User[] = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
        { id: 3, name: "Charlie", email: "charlie@example.com" },
      ];
    
      const userFields = [
        { key: "id" as keyof User, label: "ID" },
        { key: "name" as keyof User, label: "Nome" },
        { key: "email" as keyof User, label: "E-mail" },
      ];
    
    return (
        <div>
            <h1>List of Type Alerts</h1>
            <p>This is a simple page to display a list of type alerts.</p>
            <DynamicList 
            data={users}
            fields={userFields}
            onDelete={(index) => console.log("delete", index)}
            onUpdate={(index) => console.log("update", index)}
            isEditable={true}
            />
        </div>
    );
};

export default ListTypeAlert;