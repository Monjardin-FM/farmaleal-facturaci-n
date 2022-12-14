import { AppSwal } from "../AppSwal";
import Swal from "sweetalert2";
export const AppToast = () =>
  AppSwal().mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 5000,
    customClass: {
      container: "sweet-alert-toast-height",
    },
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
