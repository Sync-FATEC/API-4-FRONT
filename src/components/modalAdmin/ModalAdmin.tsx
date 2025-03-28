import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Aside } from "../aside/Aside";
import ButtonWithImg from "../buttonWithImg/buttonWithImg";
import "./ModalAdmin.css";
import DynamicList, { ListProps } from "../list/DynamicList";
import NoData from "../noData/NoData";

interface ModalAdminProps<T> {
  text: string;
  createlink: string;
  style: number;
  haveButton?: boolean;
  listProps: ListProps<T>;
}

export default function ModalAdmin({
  createlink,
  listProps,
  haveButton,
  style,
  text,
}: ModalAdminProps<any>) {
  return (
    <main className="modal-admin">
      <Aside />
      <div className="modal-admin-content">
        <div className="modal-admin-bg2">
          <div className="modal-admin-header">
            <p className="modal-admin-title">Listagem de {text}</p>
            {haveButton && (
              <>
                <ButtonWithImg
                  style={2}
                  text={`Adicionar ${text}`}
                  icon={faPlus}
                  link={createlink}
                />
              </>
            )}
          </div>

          {listProps.data.length === 0 ? (
            <NoData />
          ) : (
            <DynamicList
              data={listProps.data}
              fields={listProps.fields}
              onDelete={listProps.onDelete}
              onUpdate={listProps.onUpdate}
              isEditable={listProps.isEditable}
              isDelete={listProps.isDelete}
              detailsLink={listProps.detailsLink}
              text={text}
            />
          )}
        </div>
      </div>
    </main>
  );
}