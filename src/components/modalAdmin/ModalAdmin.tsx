import { fa0, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Aside } from "../aside/Aside";
import ButtonWithImg from "../buttonWithImg/buttonWithImg";
import "./ModalAdmin.css"

interface ModalAdminProps {
    text: string;
    link: string;
    style: number;
}

export default function ModalAdmin() {
    return (
        <main className="modal-admin">
            <Aside />
            <div className="modal-admin-bg1">
                <div className="modal-admin-bg2">
                    <div>
                        <p className="modal-admin-title">Listagem de </p>
                    </div>
                    <ButtonWithImg style={2} text={`Adicionar`} icon={faPlus} link=""/>
                </div>
            </div>
        </main>
    )
}