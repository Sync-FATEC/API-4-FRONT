import Swal, { SweetAlertOptions } from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './swal.css';

export const successSwal = (
    message: string,
    useTimer: boolean = true,
    timer: number = 1000
) => {
    const options: SweetAlertOptions = {
        title: "Sucesso!",
        text: message,
        icon: 'success',
        confirmButtonText: 'OK',
        backdrop: 'rgba(0,0,0,0.7)',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
            popup: 'my-popup-class',
            title: 'my-title-class',
            confirmButton: 'my-confirm-button-class',
            timerProgressBar: 'my-progress-bar-class'
        }
    };

    if (useTimer) {
        options.timer = timer;
        options.timerProgressBar = true;
    }

    Swal.fire(options);
};