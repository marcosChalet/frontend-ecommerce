import { Link } from "react-router-dom";
import ButtonInterface from "../../interfaces/button.interface";
import Button from "../ui/Button";
import "./style.css";

export default function ActionButton({ className, children }: ButtonInterface) {
  return <Button className={`action-button ${className}`}>{children}</Button>;
}
