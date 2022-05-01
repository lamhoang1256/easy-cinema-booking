import React, { useState } from "react";
import "./filter.scss";

export const Filter = ({ selectedItem, selectedTitle, labelNotSelectItem, children }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div className='filter-menu'>
      <div
        className='filter-select'
        onClick={(e) => {
          setVisibility(!visibility);
          e.currentTarget.children[0].children[1].innerHTML = visibility
            ? "arrow_drop_down"
            : "arrow_drop_up";
        }}
      >
        <div className='filter-selected-option'>
          <span>{selectedItem === "" ? labelNotSelectItem : selectedTitle || selectedItem}</span>
          <ion-icon name='caret-down-outline'></ion-icon>
        </div>
        {visibility && <div className='filter-options'>{children}</div>}
      </div>
    </div>
  );
};
