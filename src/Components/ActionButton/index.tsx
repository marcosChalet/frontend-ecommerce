import ButtonInterface from "../../interfaces/button.interface";
import Button from "../ui/Button";
import "./style.css";

export default function ActionButton({
  className,
  children,
  notScrollTop = false,
  click,
}: ButtonInterface) {
  return (
    <Button
      click={click}
      notScrollTop={notScrollTop}
      className={`action-button ${className}`}
    >
      {children}
    </Button>
  );
}
