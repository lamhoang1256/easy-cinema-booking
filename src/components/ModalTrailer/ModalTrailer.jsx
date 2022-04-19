import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { closeModalTrailer } from "redux/actions/modalTrailer.action";
import "./modalTrailer.scss";

export const ModalTrailer = () => {
  const dispatch = useDispatch();
  const { isTrailerVisible, urlTrailer } = useSelector((state) => state.modalTrailer);
  // xử lí đóng modal trailer youtube
  const handleHiddenTrailer = () => {
    dispatch(closeModalTrailer());
  };

  return (
    <>
      {isTrailerVisible && (
        <div className='modal-trailer' onClick={handleHiddenTrailer}>
          <ReactPlayer
            url={urlTrailer}
            width='900px'
            height='505px'
            playing={true}
            controls={true}
          />
        </div>
      )}
    </>
  );
};
