import ButtonInterface from "../../interfaces/button.interface";
import Button from "../ui/Button";
import "./style.css";

export default function ActionButton({ text, className }: ButtonInterface) {
  return <Button className={`action-button ${className}`} text={text} />;
}
