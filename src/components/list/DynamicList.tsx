import React, { useState } from "react";

interface ListProps<T> {
  data: T[];
  fields: { key: keyof T; label: string }[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
  isEditable: boolean;
}

function DynamicList<T>({
  data,
  fields,
  onDelete,
  onUpdate,
  isEditable = true,
}: ListProps<T>) {

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar"
        onChange={(e) => {
          data.filter((item) => {
            const filterValue = e.target.value.toLowerCase();
            return fields.some((field) =>
              String(item[field.key]).toLowerCase().includes(filterValue)
            );
          });
        }}
      />
      <table>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={String(field.key)}>{field.label}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {fields.map((field) => (
                <td key={String(field.key)}>{String(item[field.key])}</td>
              ))}
              {isEditable && (
                <td>
                  <button
                    onClick={() => onUpdate(index)}
                    disabled={!isEditable}
                  >
                    <span role="img" aria-label="update">
                      ✏️
                    </span>
                  </button>
                  <button onClick={() => onDelete(index)}>
                    <span role="img" aria-label="delete">
                      🗑️
                    </span>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicList;
