import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaFilterAction } from "redux/actions/movieFilter.action";
import "./dropdown.scss";

export const DropdownCinema = ({ options }) => {
  const dispatch = useDispatch();
  const { dataCinema } = useSelector((state) => state.movieFilter);
  console.log(dataCinema && dataCinema.heThongRapChieu);
  const [visibility, setVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ tenCumRap: "" });
  // console.log(selectedOption);
  const getOpendayFilter = (cinema) => {
    // console.log(cinema);
    setSelectedOption(cinema);
    // dispatch(getCinemaFilterAction(cinema.maPhim));
  };

  return (
    <div className='dropdown-menu'>
      {dataCinema && (
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
                ? "Chọn rạp"
                : selectedOption.tenCumRap.length <= 20
                ? selectedOption.tenCumRap
                : `${selectedOption.tenCumRap.slice(0, 20)}...`}
            </span>
            <ion-icon name='caret-down-outline'></ion-icon>
          </div>
          {visibility && (
            <div className='options'>
              <ul>
                {dataCinema.heThongRapChieu.map((item, index) => (
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};
