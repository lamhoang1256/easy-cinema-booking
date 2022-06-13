import { useState } from "react";
import styled from "styled-components";
import { TextClamp } from "assets/styles/_mixin";

const StyledFilter = styled.div`
  .filter-select {
    padding: 16px;
    border-radius: 4px;
    border: 1px solid #dbdbdb;
    box-shadow: 0 2px 8px 0 rgb(20 16 11 / 7%);
    position: relative;
    cursor: pointer;
  }
  .filter-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .filter-option span {
    ${TextClamp.multilines(1)}
    font-size: 14px;
  }
  .filter-results {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    max-height: 249px;
    overflow-y: auto;
    box-shadow: 0 2px 8px 0 rgb(20 16 11 / 7%);
    z-index: 100;
    background: var(--dark-color);
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-track {
      background-color: #fafafa;
    }
    &::-webkit-scrollbar-thumb {
      background-image: linear-gradient(-45deg, #6a5af9, #d66efd);
      background-image: linear-gradient(135deg, #fca0ed 0%, #fd1f8b 100%);
      border-radius: 50px;
    }
    li {
      height: 32px;
      line-height: 36px;
      padding: 0 10px;
      margin: 5px 0;
      cursor: pointer;
      ${TextClamp.onelines}
      transition: all 0.25s linear;
      p {
        ${TextClamp.onelines}
        flex: 1;
      }
      &:hover {
        background: rgba(10, 39, 206, 0.082);
      }
      &.active-option {
        background: rgba(10, 39, 206, 0.082);
      }
    }
  }
`;

const Filter = ({ title, label, labelNotSelect, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <StyledFilter>
      <div className="filter-select" onClick={() => setIsVisible(!isVisible)}>
        <div className="filter-option">
          <span>{title === "" ? labelNotSelect : label || title}</span>
          <ion-icon name="caret-down-outline"></ion-icon>
        </div>
        {isVisible && <ul className="filter-results">{children}</ul>}
      </div>
    </StyledFilter>
  );
};

export default Filter;
