import Swal from "sweetalert2";

export const sweetAlert = (icon, title, text, confirmButtonColor) => {
  Swal.fire({
    icon,
    title,
    text,
    confirmButtonColor,
  });
};
