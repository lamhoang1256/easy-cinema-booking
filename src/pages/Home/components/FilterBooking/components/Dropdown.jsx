import React, { useState } from "react";
import "./dropdown.scss";

export const Dropdown = ({ options }) => {
  const [visibility, setVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className='App'>
      <div
        className='select'
        onClick={(e) => {
          setVisibility(!visibility);
          setSearch("");
          e.currentTarget.children[0].children[1].innerHTML = visibility
            ? "arrow_drop_down"
            : "arrow_drop_up";
        }}
      >
        <div className='selected-option'>
          <span title={selectedOption === "" ? "Select a state" : selectedOption}>
            {selectedOption === ""
              ? "Select a state"
              : selectedOption.length <= 20
              ? selectedOption
              : `${selectedOption.slice(0, 20)}...`}
          </span>
          <ion-icon name='caret-down-outline'></ion-icon>
        </div>
        {visibility && (
          <div className='options'>
            <ul>
              <li data-value='default' onClick={() => setSelectedOption("")}>
                Select a state
              </li>
              {options
                .filter((option) => option.toLowerCase().includes(search.toLowerCase()))
                .map((option, index) => (
                  <li
                    key={index}
                    className={selectedOption === option ? "active-option" : null}
                    onClick={() => setSelectedOption(option)}
                  >
                    {option}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
