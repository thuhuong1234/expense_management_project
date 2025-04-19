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

const showConfirmDialog = async (title, text) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });
  return result.isConfirmed;
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
const result = (name) => {
  return Swal.fire({
    title: `Xác nhận xóa ${name}`,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Đã xóa",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
};

export { showAlert, showConfirmDialog, showToast, result };
