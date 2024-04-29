import ButtonInterface from "../../../interfaces/button.interface";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

import "./style.css";

function scrollTo() {
  window.scrollTo({ top: 0 });
}

export default function Button({
  className = "",
  hasPlusIcon = false,
  hasMinusIcon = false,
  children,
  notScrollTop = false,
  click,
}: ButtonInterface & { notScrollTop?: boolean }) {
  return (
    <button
      onClick={() => {
        !notScrollTop && scrollTo();
        click && click();
      }}
      className={`btn ${className}`}
    >
      {hasMinusIcon ? <FaMinus /> : null}
      {hasPlusIcon ? <FaPlus /> : null}
      {children}
    </button>
  );
}
