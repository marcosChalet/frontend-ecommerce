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
}: ButtonInterface) {
  return (
    <button onClick={scrollTo} className={`btn ${className}`}>
      {hasMinusIcon ? <FaMinus /> : null}
      {hasPlusIcon ? <FaPlus /> : null}
      {children}
    </button>
  );
}
