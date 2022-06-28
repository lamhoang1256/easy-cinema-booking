import Swal from "sweetalert2";

export const swalDelete = (type = "", callback = () => {}) => {
  Swal.fire({
    title: `Delete ${type}?`,
    text: `Are you sure you want to delete this ${type}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3d6ef7",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};
