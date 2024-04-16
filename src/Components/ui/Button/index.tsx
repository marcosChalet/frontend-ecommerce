import ButtonInterface from "../../../interfaces/button.interface";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

import "./style.css";

export default function Button({
  text = "",
  className = "",
  hasPlusIcon = false,
  hasMinusIcon = false,
}: ButtonInterface) {
  return (
    <button className={className}>
      {hasMinusIcon ? <FaMinus /> : null}
      {hasPlusIcon ? <FaPlus /> : null}
      {text}
    </button>
  );
}
