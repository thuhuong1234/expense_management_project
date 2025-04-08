// src/helpers/sweetalertHelper.js
import Swal from "sweetalert2";

const showAlert = (title, text, icon = "info", confirmButtonText = "OK") => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
  });
};

const showConfirmDialog = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });
};

const showToast = (title, icon = "success", text = "", timer = 3000) => {
  return Swal.fire({
    title,
    text,
    icon,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

export { showAlert, showConfirmDialog, showToast };
