import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

import { Container } from "./styles";

function Dropdown({ items, value, onChange, disabled }) {
  const [showList, setShowList] = useState(false);

  return (
    <Container disabled={disabled}>
      <button
        className="dropdown"
        onClick={() => {
          if (!disabled) {
            showList ? setShowList(false) : setShowList(true);
          }
        }}
      >
        <span>{value.label}</span>
        {!disabled && <>{showList ? <MdExpandLess /> : <MdExpandMore />}</>}
      </button>

      {showList && items && (
        <>
          <ul>
            {items.map(item => (
              <li
                key={item.label}
                onClick={() => {
                  onChange(item);
                  setShowList(false);
                }}
              >
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <div className="backdrop" onClick={() => setShowList(false)}></div>
        </>
      )}
    </Container>
  );
}

export default Dropdown;
