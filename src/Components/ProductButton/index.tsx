import ButtonInterface from "../../interfaces/button.interface";
import Button from "../ui/Button";
import "./style.css";

export default function ProductButton({
  text,
  className,
  hasPlusIcon = false,
  hasMinusIcon = false,
}: ButtonInterface) {
  return (
    <Button
      className={`product-button ${className}`}
      text={text}
      hasPlusIcon={hasPlusIcon}
      hasMinusIcon={hasMinusIcon}
    />
  );
}
