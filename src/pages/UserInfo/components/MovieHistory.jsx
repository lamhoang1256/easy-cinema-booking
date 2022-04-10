import React from "react";
import "./movieHistory.scss";

export const MovieHistory = ({ thongTinDatVe }) => {
  // tạo mảng danh sách stt ghế đã đặt và lọc theo stt nhỏ đến lớn
  const getIdChair = (allChair) => {
    const filterIdChair = allChair.map((row) => row.tenGhe);
    return filterIdChair.sort((a, b) => a - b);
  };

  return (
    <>
      {thongTinDatVe.length !== 0 ? (
        <div className='movie-history'>
          <table className='movie-history-table'>
            <thead className='movie-history-head'>
              <tr className='movie-history-row'>
                <th>Tên phim</th>
                <th>Hình ảnh</th>
                <th>Ngày đặt</th>
                <th>Rạp</th>
                <th>Số ghế</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>

            {/* table body */}
            <tbody className='movie-history-body'>
              {thongTinDatVe.map((item, index) => (
                <tr className='movie-history-row' key={index}>
                  <td>{item.tenPhim}</td>
                  <td>
                    <img className='movie-history-thumb' src={item.hinhAnh} />
                  </td>
                  <td>
                    {new Date(item.ngayDat).toLocaleDateString()}{" "}
                    {new Date(item.ngayDat).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{item.danhSachGhe[0].tenHeThongRap}</td>
                  <td>
                    <div className='movie-history-chairs'>
                      {getIdChair(item.danhSachGhe).map((seat, index) => (
                        <span key={index}>{seat}</span>
                      ))}
                    </div>
                  </td>
                  <td>{(item.giaVe * item.danhSachGhe.length).toLocaleString("en-US")} VNĐ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        "Trống"
      )}
    </>
  );
};
