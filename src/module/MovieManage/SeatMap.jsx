import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesApi } from "apis/moviesApi";
import SeatingPlan from "module/TicketRoom/SeatingPlan";

const SeatMap = () => {
  const { idTicketRoom } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [seats, setSeats] = useState([]);
  const [infoMovie, setInfoMovie] = useState(null);

  const fetchTicketRoom = async () => {
    setIsLoading(true);
    try {
      const { data } = await moviesApi.getTicketRoomApi(idTicketRoom);
      setInfoMovie(data.content.thongTinPhim);
      setSeats(data.content.danhSachGhe);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketRoom();
  }, []);

  return (
    <div className='seat-map'>
      {isLoading && "Loading"}
      {!isLoading && (
        <>
          <div className='seat-map-seats'>
            <h3>
              Danh sách ghế: {infoMovie.tenCumRap} - {infoMovie.tenRap}
            </h3>
            <SeatingPlan danhSachGhe={seats} selectingSeatList={[]} />
          </div>
          <div className='seat-map-movie'>
            <h3>Thông tin phim</h3>
            <div className='movie-booking-thumb'>
              <img src={infoMovie.hinhAnh} alt='movie-thumb' />
            </div>
            <SeatMapInfoField label='Tên phim'>{infoMovie.tenPhim}</SeatMapInfoField>
            <SeatMapInfoField label='Tên Rạp'>{infoMovie.tenCumRap}</SeatMapInfoField>
            <SeatMapInfoField label='Mã Rạp'>{infoMovie.tenRap}</SeatMapInfoField>
            <SeatMapInfoField label='Địa chỉ'>{infoMovie.diaChi}</SeatMapInfoField>
            <SeatMapInfoField label='Suất chiếu'>{`${infoMovie.gioChieu} ${infoMovie.ngayChieu}`}</SeatMapInfoField>
          </div>
        </>
      )}
    </div>
  );
};

export default SeatMap;

const SeatMapInfoField = ({ label, children }) => (
  <div>
    <span className='label'>{label}:</span>
    {children}
  </div>
);
