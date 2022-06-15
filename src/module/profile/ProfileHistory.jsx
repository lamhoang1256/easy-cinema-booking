import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Description from "components/text/Description";
import Heading from "components/heading/Heading";

const StyledProfileHistory = styled.div`
  .history {
    --table-border-color: #edeef2;
    --table-bg-color: #fefefe;
    --table-head-bg-color: #e1e8f2;
    --hover-bg-color: #fb4f83;
    --hover-text-color: #ffffff;
    margin-top: 14px;
    overflow-y: auto;
    border-radius: 10px;
    border: 1px solid var(--table-border-color);
  }
  .history-table {
    border-radius: 10px;
    background-color: var(--table-bg-color);
    border-collapse: collapse;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.02);
    width: 100%;
  }
  .history-head .history-row {
    background-color: var(--table-head-bg-color);
    font-weight: 500;
  }
  .history-row {
    display: grid;
    border-bottom: 1px solid var(--table-border-color);
    padding: 0 1.5rem;
    grid-template-columns: 1.5fr 1fr 1fr 1.5fr 1.5fr 1fr;
    th,
    td {
      padding: 1rem;
      min-width: 150px;
    }
  }
  .history-poster {
    width: 80px;
    height: 80px;
    object-fit: cover;
    object-position: top;
    border-radius: 8px;
  }
  .history-body .history-row {
    transition: 0.1s linear;
    transition-property: color, background;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      color: var(--hover-text-color);
      background-color: var(--hover-bg-color);
    }
  }
  .history-seats {
    overflow-x: auto;
    span {
      padding: 0 5px;
    }
    &::-webkit-scrollbar {
      height: 10px;
      width: 100px;
    }
    &::-webkit-scrollbar-track {
      background-color: #edeef2;
      border-radius: 8px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: #66cec4;
    }
  }
`;

const ProfileHistory = ({ thongTinDatVe }) => {
  if (thongTinDatVe.length === 0) {
    return <Description>Lịch sử đặt vé hiện đang trống</Description>;
  }

  const sortSeatAscending = (cinema) => {
    const seats = cinema.map((seat) => seat.tenGhe);
    return seats.sort((a, b) => a - b);
  };
  return (
    <StyledProfileHistory>
      <Heading>Lịch sử đặt vé</Heading>
      <div className="history">
        <table className="history-table">
          {/* Table header */}
          <thead className="history-head">
            <tr className="history-row">
              <th>Tên phim</th>
              <th>Hình ảnh</th>
              <th>Ngày đặt</th>
              <th>Rạp</th>
              <th>Số ghế</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="history-body">
            {thongTinDatVe.map((row) => {
              const { tenPhim, hinhAnh, ngayDat, danhSachGhe, giaVe, maVe } = row;
              return (
                <tr className="history-row" key={maVe}>
                  <td>{tenPhim}</td>
                  <td>
                    <img className="history-poster" src={hinhAnh} alt="poster" />
                  </td>
                  <td>
                    {new Date(ngayDat).toLocaleDateString()}{" "}
                    {new Date(ngayDat).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{danhSachGhe[0].tenHeThongRap}</td>
                  <td>
                    <div className="history-seats">
                      {sortSeatAscending(danhSachGhe).map((seat) => (
                        <span key={uuidv4()}>{seat}</span>
                      ))}
                    </div>
                  </td>
                  <td>{(giaVe * danhSachGhe.length).toLocaleString("en-US")} VNĐ</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </StyledProfileHistory>
  );
};

export default ProfileHistory;
