import ButtonInterface from "../../interfaces/button.interface";
import Button from "../ui/Button";
import "./style.css";

export default function ProductButton({
  className,
  hasPlusIcon = false,
  hasMinusIcon = false,
  children,
}: ButtonInterface) {
  return (
    <Button
      className={`product-button ${className}`}
      hasPlusIcon={hasPlusIcon}
      hasMinusIcon={hasMinusIcon}
    >
      {children}
    </Button>
  );
}
