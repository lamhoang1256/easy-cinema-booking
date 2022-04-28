import Swal from "sweetalert2";

export const sweetAlert = (icon, title, text, colorButton) => {
  let confirmButtonColor;
  switch (icon) {
    case "success":
      confirmButtonColor = "#a5dc86";
      break;
    case "error":
      confirmButtonColor = "#d33";
      break;
    default:
      confirmButtonColor = colorButton;
  }

  Swal.fire({
    icon,
    title,
    text,
    confirmButtonColor,
  });
};
