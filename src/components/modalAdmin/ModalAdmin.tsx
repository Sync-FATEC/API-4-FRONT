import { fa0, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Aside } from "../aside/Aside";
import ButtonWithImg from "../buttonWithImg/buttonWithImg";
import "./ModalAdmin.css";
import DynamicList, { ListProps } from "../list/DynamicList";
import NoData from "../noData/NoData";

interface ModalAdminProps<T> {
  text: string;
  createlink: string;
  style: number;
  listProps: ListProps<T>;
}

export default function ModalAdmin({
  createlink,
  listProps,
  style,
  text,
}: ModalAdminProps<any>) {
  return (
    <main className="modal-admin">
      <Aside />
      <div className="modal-admin-bg1">
        <div className="modal-admin-bg2">
          <div>
            <p className="modal-admin-title">Listagem de {text} </p>
          </div>
          <ButtonWithImg
            style={2}
            text={`Adicionar ${text}`}
            icon={faPlus}
            link={createlink}
          />

          {(listProps.data.length === 0) ? (
            <NoData />
          ) : (
          <DynamicList
            data={listProps.data}
            fields={listProps.fields}
            onDelete={listProps.onDelete}
            onUpdate={listProps.onUpdate}
            isEditable={listProps.isEditable}
            detailsLink=""
            text={text}
          />
          )}
        </div>
      </div>
    </main>
  );
}
