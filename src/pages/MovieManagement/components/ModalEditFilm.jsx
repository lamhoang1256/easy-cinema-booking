import React from "react";
import { Modal } from "antd";
import "./modalEditFilm.scss";

const ModalEditFilm = ({ isShowModalEdit, setIsShowModalEdit }) => {
  const onCloseModal = () => {
    setIsShowModalEdit(false);
  };

  return (
    <Modal
      title={`Cập nhật thông tin phim`}
      visible={isShowModalEdit}
      onCancel={onCloseModal}
      // footer={null}
    >
      <h1>Modal Edit Film</h1>
    </Modal>
  );
};

export default ModalEditFilm;
