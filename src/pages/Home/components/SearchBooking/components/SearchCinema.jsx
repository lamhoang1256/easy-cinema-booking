import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpendayListToSearch } from "redux/actions/movieSearch.action";
import "./dropdown.scss";

export const SearchCinema = () => {
  const dispatch = useDispatch();
  const { cinemaList } = useSelector((state) => state.movieSearch);
  // console.log(cinemaList && cinemaList.heThongRapChieu);
  const [visibility, setVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ tenCumRap: "" });

  const getOpendayFilter = (cinema) => {
    setSelectedOption(cinema);
    dispatch(fetchOpendayListToSearch(cinema.lichChieuPhim));
  };

  useEffect(() => {
    setSelectedOption({ tenCumRap: "" });
  }, [cinemaList]);

  return (
    <div className='dropdown-menu'>
      <div
        className='select'
        onClick={(e) => {
          setVisibility(!visibility);
          e.currentTarget.children[0].children[1].innerHTML = visibility
            ? "arrow_drop_down"
            : "arrow_drop_up";
        }}
      >
        <div className='selected-option'>
          <span
            title={selectedOption.tenCumRap === "" ? "Select a state" : selectedOption.tenCumRap}
          >
            {selectedOption.tenCumRap === ""
              ? "Chọn Rạp"
              : selectedOption.tenCumRap.length <= 20
              ? selectedOption.tenCumRap
              : `${selectedOption.tenCumRap.slice(0, 20)}...`}
          </span>
          <ion-icon name='caret-down-outline'></ion-icon>
        </div>
        {visibility && (
          <div className='options'>
            {cinemaList ? (
              <ul>
                {cinemaList.heThongRapChieu.map((item, index) => (
                  <Fragment key={index}>
                    {item.cumRapChieu.map((e, id) => (
                      <li
                        key={id}
                        // className={selectedOption === item ? "active-option" : null}
                        onClick={() => getOpendayFilter(e)}
                      >
                        {e.tenCumRap}
                      </li>
                    ))}
                  </Fragment>
                ))}
              </ul>
            ) : (
              <ul>
                <li>Vui lòng chọn phim</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
