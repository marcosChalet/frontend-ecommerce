import ButtonInterface from "../../../interfaces/button.interface";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

import "./style.css";

export default function Button({
  className = "",
  hasPlusIcon = false,
  hasMinusIcon = false,
  children,
}: ButtonInterface) {
  return (
    <button className={`btn ${className}`}>
      {hasMinusIcon ? <FaMinus /> : null}
      {hasPlusIcon ? <FaPlus /> : null}
      {children}
    </button>
  );
}
